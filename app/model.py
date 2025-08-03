import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel('models/gemini-1.5-flash')
chat = model.start_chat(history=[])

def chat_with_sql_bot(user_message: str) -> str:
    response = chat.send_message(user_message)
    return response.text.strip()
