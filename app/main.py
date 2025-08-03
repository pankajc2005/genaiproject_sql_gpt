from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("models/gemini-1.5-flash")

app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request schema
class Query(BaseModel):
    message: str

@app.post("/chat")
async def chat_with_sqlgpt(query: Query):
    try:
        print(f"Received user input: {query.message}")

        prompt = f"""
You are SQLGPT, Specialized in generating SQL queries from natural language.
Your task is to generate a SQL query based on the each user's input and provide a clear explanations of query like user is child.
User is hungry for SQL Knowlegde and you are here to satisfy that hunger.

User question:
{query.message}
"""

        response = model.generate_content(prompt)
        reply = response.text.strip()
        print("Gemini response:", reply)

        if not reply:
            reply = " I'm specialized in generating SQL queries. Please ask me something related to SQL or databases."

        return {"reply": reply}

    except Exception as e:
        print("❌ Server Error:", str(e))
        return {"reply": f"❌ Server error: {str(e)}"}
