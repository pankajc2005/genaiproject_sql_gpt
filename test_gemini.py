import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel('models/gemini-1.5-flash')

response = model.generate_content("Hello Gemini, can you generate a SELECT statement?")
print(response.text)
