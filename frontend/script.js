let currentTab = 0;
const tabs = [];
const messages = [[]];
const chatWindow = document.getElementById("chat-window");
const input = document.getElementById("user-input");

function renderTabs() {
  const tabContainer = document.getElementById("tabs");
  tabContainer.innerHTML = "";
  tabs.forEach((title, i) => {
    const tab = document.createElement("div");
    tab.className = "tab" + (i === currentTab ? " active" : "");
    tab.textContent = title;
    tab.onclick = () => switchTab(i);
    tabContainer.appendChild(tab);
  });
}

function newChat() {
  tabs.push("Chat " + (tabs.length + 1));
  messages.push([]);
  currentTab = tabs.length - 1;
  renderTabs();
  renderMessages();
}

function switchTab(index) {
  currentTab = index;
  renderTabs();
  renderMessages();
}

function renderMessages() {
  chatWindow.innerHTML = "";
  messages[currentTab].forEach(({ text, sender }) => addMessage(text, sender));
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);

  const codeMatch = text.match(/```sql\s*([\s\S]*?)```/);
  if (codeMatch) {
    const code = codeMatch[1];
    const explanation = text.replace(codeMatch[0], "").trim();
    msg.innerHTML = `
      <div class="code-block">
        <button class="copy-btn" onclick="copyToClipboard(this)">Copy</button>
        <button class="download-btn" onclick="downloadSQL(this)">⬇</button>
        <pre><code class="language-sql">${code}</code></pre>
      </div>
      <div class="explanation">${explanation}</div>
    `;
  } else {
    msg.textContent = text;
  }

  chatWindow.appendChild(msg);
  Prism.highlightAll();
}

function sendMessage() {
  const question = input.value.trim();
  if (!question) return;
  messages[currentTab].push({ text: question, sender: "user" });
  addMessage(question, "user");
  input.value = "";

  fetch("http://localhost:8000/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: question }),
  })
    .then(res => res.json())
    .then(data => {
      messages[currentTab].push({ text: data.reply, sender: "bot" });
      addMessage(data.reply, "bot");
    })
    .catch(() => {
      addMessage("❌ Server error", "bot");
    });
}

function copyToClipboard(btn) {
  const code = btn.parentElement.querySelector("code").innerText;
  navigator.clipboard.writeText(code).then(() => {
    btn.textContent = "Copied!";
    setTimeout(() => (btn.textContent = "Copy"), 1500);
  });
}

function downloadSQL(btn) {
  const code = btn.parentElement.querySelector("code").innerText;
  const blob = new Blob([code], { type: "text/sql" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "query.sql";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function toggleTheme() {
  document.body.classList.toggle("light");
}

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

newChat();

function addMessage(text, sender) {
  const message = document.createElement("div");
  message.classList.add("message", sender);

  // Handle code blocks with language (e.g., ```sql)
  if (/```(\w*)\n([\s\S]*?)```/.test(text)) {
    const match = text.match(/```(\w*)\n([\s\S]*?)```/);
    const language = match[1] || 'plaintext';
    const code = match[2];

    message.innerHTML = `
      <div class="code-block">
        <button class="copy-btn" onclick="copyToClipboard(this)">Copy</button>
        <button class="download-btn" onclick="downloadSQL(this)">⬇</button>
        <pre><code class="language-${language}">${escapeHTML(code)}</code></pre>
      </div>
    `;
  } else {
    // Parse markdown formatting manually
    let formatted = escapeHTML(text)
      // Headings
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")
      // Blockquotes
      .replace(/^> (.*$)/gim, "<blockquote>$1</blockquote>")
      // Bold
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      // Italic
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      // Inline code
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      // Ordered list
      .replace(/^\d+\. (.*$)/gim, "<li>$1</li>")
      // Unordered list
      .replace(/^- (.*$)/gim, "<li>$1</li>")
      // Line breaks
      .replace(/\n/g, "<br>");

    // Wrap list items
    if (formatted.includes("<li>")) {
      formatted = formatted.replace(/(<li>.*<\/li>)/gims, "<ul>$1</ul>");
    }

    message.innerHTML = formatted;
  }

  chatWindow.appendChild(message);
  Prism.highlightAll();
}

// Helper to avoid HTML injection
function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
