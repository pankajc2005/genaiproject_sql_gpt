# **SQLGPT**

### *Natural Language → SQL Query Generator*

SQLGPT is a web app that converts plain English into SQL queries using **Google Gemini API**, with a FastAPI backend and a lightweight HTML/CSS/JS frontend.

---

## 📁 Folder Structure

```
SQLGPT/
├── app/
│   ├── main.py          # FastAPI backend
│   └── model.py         # Gemini integration logic
├── frontend/
│   ├── index.html       # UI layout
│   ├── script.js        # Frontend logic
│   └── style.css        # Styling
├── .env                 # API key config
├── README.md            # Project docs
├── requirements.txt     # Python dependencies
```

---

## ✨ Features

* ✅ Convert natural language to SQL
* ✅ Syntax-highlighted output (via Prism.js)
* ✅ Multi-tab chat interface
* ✅ Copy and download SQL results
* ✅ Light/dark mode support
* ✅ Handles irrelevant or off-topic questions gracefully

---

## 🛠 Tech Stack

| Layer         | Technology            |
| ------------- | --------------------- |
| **Backend**   | Python, FastAPI       |
| **Frontend**  | HTML, CSS, JavaScript |
| **LLM**       | Google Gemini API     |
| **Highlight** | Prism.js              |

---

## 🚀 Getting Started

### 🔧 Prerequisites

* Python 3.9 or higher
* `pip` installed
* Gemini API key from Google Cloud Console

---

### 📦 Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-user/sqlgpt.git
cd sqlgpt

# 2. Create virtual environment
python -m venv venv

# 3. Activate environment
# macOS/Linux
source venv/bin/activate
# Windows
venv\Scripts\activate

# 4. Install dependencies
pip install -r requirements.txt
```

---


## 🔐 Set Up Gemini API Key (Step-by-Step)

To use Google’s Gemini API, you need to get an API key from your Google Cloud Console.

### ✅ Step 1: Create a Google Cloud Project

1. Go to: [https://console.cloud.google.com](https://console.cloud.google.com)
2. Click on the project dropdown → “**New Project**”
3. Name it (e.g., `SQLGPT`) and click **Create**

---

### ✅ Step 2: Enable the Gemini API

1. Inside your new project, go to **APIs & Services** → **Library**
2. Search for **“Gemini API”**
3. Click on it, then click **Enable**

---

### ✅ Step 3: Create an API Key

1. Go to **APIs & Services** → **Credentials**
2. Click **“+ Create Credentials”** → choose **API Key**
3. Copy the generated key

---

### ✅ Step 4: Create the `.env` File

In your project root (`SQLGPT/`), create a new file named `.env`:

```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

> 🔒 **Important:** Never commit this file to GitHub or share your key publicly.

---

## ▶️ Run the App (Step-by-Step Guide)

Here's how to run the backend and frontend of SQLGPT locally:

---

### ✅ 1. Clone the Repository

```bash
git clone https://github.com/your-user/sqlgpt.git
cd sqlgpt
```

---

### ✅ 2. Set Up Python Virtual Environment

```bash
python -m venv venv
```

#### ➤ Activate the Environment

* **macOS/Linux**:

  ```bash
  source venv/bin/activate
  ```
* **Windows**:

  ```bash
  venv\Scripts\activate
  ```

---

### ✅ 3. Install Python Dependencies

```bash
pip install -r requirements.txt
```

This installs FastAPI, the Gemini API client, and other required packages.

---

### ✅ 4. Add Your `.env` File

Make sure your `.env` file (created earlier) is in the **project root** like this:

```
SQLGPT/
├── app/
│   ├── main.py
│   └── model.py
├── frontend/
│   └── ...
├── .env   👈 HERE
```

The file should contain:

```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

---

### ✅ 5. Start the FastAPI Backend

From the root directory, run:

```bash
uvicorn app.main:app --reload
```

You should see output like:

```
Uvicorn running on http://127.0.0.1:8000
```

Your backend is now live at:
👉 **[http://localhost:8000](http://localhost:8000)**

---

### ✅ 6. Start the Frontend

In a **new terminal window** (or tab):

```bash
cd frontend
python -m http.server 5500
```

This serves the frontend at:
👉 **[http://localhost:5500](http://localhost:5500)**

> ✅ Open it in your browser and start typing questions like:
> “Get employees in HR with salary above 50000”

---

### 📌 Development Tips

* Keep both backend and frontend terminals open while developing.
* If `.env` changes, **restart the backend** to reload your API key.
* Any change to `main.py` or `model.py` will auto-reload the FastAPI server in development mode (`--reload`).

---


## 🧪 Example Prompts

Try asking:

* `List employees in the HR department with salary over 50000`
* `Get average sales per region`
* `Create a table for student enrollments`
* `Insert 5 rows into orders table`
* `Update salary of employee with ID 102 to 80000`

---

## 🆘 Troubleshooting

### 🔸 Missing modules?

```bash
pip install -r requirements.txt
```

### 🔸 Frontend not loading?

* Make sure you start it via:

  ```bash
  cd frontend
  python -m http.server 5500
  ```

### 🔸 “Server Error” in browser?

* Check that the FastAPI backend is running:

  ```bash
  uvicorn app.main:app --reload
  ```

### 🔸 Gemini API issues?

* Confirm `.env` is correctly set
* Restart backend after editing `.env`

---

## 🔐 Security Tips

* Use `.env` for local dev — never expose API keys
* Use environment variables in production
* Add rate limiting, CORS restrictions, and error handling in production environments

---

## 📄 License

This project is intended for educational and personal use. Feel free to fork and modify it to suit your needs.
