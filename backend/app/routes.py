from fastapi import APIRouter, HTTPException
from app.models import ResumeData
from app.services import generate_pdf

router = APIRouter()

@router.post("/generate-resume/")
async def generate_resume(data: ResumeData):
    try:
        return generate_pdf(data)  # Calls the service function to generate a PDF
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating resume: {str(e)}")
