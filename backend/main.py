from fastapi import FastAPI, Form
from fastapi.responses import FileResponse
from fastapi.templating import Jinja2Templates
from weasyprint import HTML
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

# Папка для HTML-шаблонов
templates = Jinja2Templates(directory="templates")

# Папка для сохранения PDF
output_dir = "output"
os.makedirs(output_dir, exist_ok=True)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/generate-resume/")
async def generate_resume(
    name: str = Form(...),
    email: str = Form(...),
    skills: str = Form(...),
    experience: str = Form(...),
):
    # Данные для шаблона
    data = {"name": name, "email": email, "skills": skills, "experience": experience}

    # Рендерим HTML с данными
    html_content = templates.TemplateResponse("template1.html", {"request": None, "data": data}).body.decode()

    # Генерация PDF
    pdf_path = os.path.join(output_dir, f"{name}_resume.pdf")
    HTML(string=html_content).write_pdf(pdf_path)

    return FileResponse(pdf_path, media_type="application/pdf", filename=f"{name}_resume.pdf")
