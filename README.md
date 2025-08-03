# SQLGPT - Natural Language to SQL Query Generator

SQLGPT is a tool that leverages the power of natural language processing to generate SQL queries.  It allows users to input questions or requests in plain English, and it translates them into executable SQL code. This project uses FastAPI for the backend, Google's Gemini model for natural language processing, and a JavaScript frontend for user interaction.

## Features

*   **Natural Language to SQL:** Converts natural language questions into SQL queries.
*   **User-Friendly Interface:**  A clean and intuitive interface for easy interaction.
*   **Multiple Chat Tabs:** Supports multiple concurrent chat sessions.
*   **Code Highlighting:**  Highlights SQL code for better readability.
*   **Copy and Download:**  Allows users to copy the generated SQL query or download it as a `.sql` file.
*   **Light/Dark Theme:**  Offers a toggleable light/dark theme for user preference.

## Technologies Used

*   **Backend:** FastAPI (Python)
*   **Language Model:** Google Gemini
*   **Frontend:** JavaScript, HTML, CSS
*   **Code Highlighting:** Prism.js

## Setup Guide

### Prerequisites

*   Python 3.6+
*   pip
*   A Google Cloud project with the Gemini API enabled and an API key.
    *   Enable the Gemini API in your Google Cloud project.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```

2.  **Create a virtual environment (recommended):**

    ```bash
    python -m venv venv
    source venv/bin/activate  # On Linux/macOS
    venv\Scripts\activate  # On Windows
    ```

3.  **Install dependencies:**

    ```bash
    pip install -r requirements.txt
    ```
    ```

4.  **Configuration:**
    *   It's crucial to keep your API key secure.  Never commit your `.env` file to version control.
    *   Create a `.env` file in the project's root directory.
    *   Add your Gemini API key to the `.env` file:

        GEMINI_API_KEY=YOUR_GEMINI_API_KEY
        ```

    *   **Important:** Replace `YOUR_GEMINI_API_KEY` with your actual Gemini API key.  If you don't have one, you'll need to create a Google Cloud project, enable the Gemini API, and generate an API key.



### Running the Application

1.  **Start the FastAPI backend:**
    *   The `--reload` flag enables automatic reloading of the server when you make changes to the code.  This is useful for development.
    *   By default, the server will run on `http://localhost:8000`.

2.  **Open the `index.html` file in your browser:**

    *   You have a couple of options here:
    *   Navigate to the `index.html` file in your frontend directory in your web browser.  For example, if you are running a local server, you might open `http://localhost/frontend/index.html` (the exact URL will depend on your local setup).
    *   If you just open the file directly (e.g., `file:///path/to/index.html`), some browser security restrictions might prevent the frontend from properly connecting to the backend API. Running a simple local HTTP server is generally recommended.
    *   Simplest way to serve the frontend files is using python's simple http server. Navigate to the frontend directory and run command `python -m http.server` this will serve the content of the folder at http://localhost:8000/ .

### Usage

1.  **Type your SQL query request in the input box.**
2.  **Press Enter or click the send button.**


    *   The application sends your request to the FastAPI backend.
    *   The backend uses the Gemini model to generate a SQL query.
    *   The generated query and explanation are sent back to the frontend.

3.  **The generated SQL query and explanation will appear in the chat window.**
4.  **Use the copy button to copy the SQL query to your clipboard.**
5.  **Use the download button to download the SQL query as a `.sql` file.**

### Troubleshooting

*   **"ModuleNotFoundError: No module named 'fastapi'" or similar:**
    *   Make sure you have activated your virtual environment and installed the dependencies using `pip install -r requirements.txt`.
*   **"Connection refused" or similar when the frontend tries to connect to the backend:**
    *   Make sure the FastAPI backend is running.
    *   Double-check the URL in your JavaScript code (`frontend/script.js`) to ensure it matches the address where your backend is running (usually `http://localhost:8000`).
    *   Ensure that CORS is configured correctly in your FastAPI application (`app/main.py`). The `allow_origins` should include the origin of your frontend, or be set to `["*"]` for development.
*   **Gemini API errors (e.g., "API key not found"):**
    *   Make sure you have set the `GEMINI_API_KEY` environment variable correctly in your `.env` file.
    *   Verify that your API key is valid and that the Gemini API is enabled for your Google Cloud project.
*   **Frontend not displaying correctly:**
    *   Check your browser's developer console for any JavaScript errors.
    *   Make sure all the frontend files (`index.html`, `style.css`, `script.js`) are in the correct directory.
