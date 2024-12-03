from pydantic import BaseModel, EmailStr

class ResumeData(BaseModel):
    name: str
    email: EmailStr  # Ensures email format is valid
    skills: str
    experience: str
