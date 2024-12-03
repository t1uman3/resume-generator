from weasyprint import HTML
from fastapi.responses import FileResponse
import os

output_dir = "output"
os.makedirs(output_dir, exist_ok=True)  # Ensure the output directory exists

def generate_pdf(data):
    # HTML template for the resume
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; padding: 20px; }}
            h1 {{ color: #333; }}
            .section {{ margin-bottom: 20px; }}
            .section-title {{ font-weight: bold; font-size: 18px; margin-bottom: 10px; }}
        </style>
    </head>
    <body>
        <h1>Resume: {data.name}</h1>
        <div class="section">
            <div class="section-title">Email:</div>
            <div>{data.email}</div>
        </div>
        <div class="section">
            <div class="section-title">Skills:</div>
            <div>{data.skills}</div>
        </div>
        <div class="section">
            <div class="section-title">Experience:</div>
            <div>{data.experience}</div>
        </div>
    </body>
    </html>
    """

    # Save PDF to output directory
    pdf_path = os.path.join(output_dir, f"{data.name.replace(' ', '_')}_resume.pdf")
    HTML(string=html_content).write_pdf(pdf_path)

    # Return the PDF file as a response
    return FileResponse(pdf_path, media_type="application/pdf", filename=f"{data.name}_resume.pdf")
