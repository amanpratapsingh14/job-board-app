from typing import List
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import aiofiles
import os
from database import get_db
from auth import get_current_user, get_current_admin_user
from crud import (
    get_applications, get_application, create_application, 
    update_application, get_applications_by_job
)
from schemas import Application, ApplicationCreate, ApplicationUpdate, ApplicationWithJob
from models import User
from config import settings

router = APIRouter()

# Ensure upload directory exists
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)

@router.get("/", response_model=List[ApplicationWithJob])
def read_applications(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get applications for the current user"""
    if current_user.is_admin:
        # Admin can see all applications
        applications = get_applications(db, skip=skip, limit=limit)
    else:
        # Regular users can only see their own applications
        applications = get_applications(db, skip=skip, limit=limit, user_id=current_user.id)
    return applications

@router.get("/job/{job_id}", response_model=List[Application])
def read_applications_by_job(
    job_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Get all applications for a specific job (Admin only)"""
    applications = get_applications_by_job(db, job_id=job_id)
    return applications

@router.get("/{application_id}", response_model=ApplicationWithJob)
def read_application(
    application_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get a specific application"""
    application = get_application(db, application_id=application_id)
    if application is None:
        raise HTTPException(status_code=404, detail="Application not found")
    
    # Check if user has permission to view this application
    if not current_user.is_admin and application.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    return application

@router.get("/{application_id}/resume/download")
def download_resume(
    application_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Download resume file for an application"""
    application = get_application(db, application_id=application_id)
    if application is None:
        raise HTTPException(status_code=404, detail="Application not found")
    # Check if user has permission to download this resume
    if not current_user.is_admin and application.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    if not application.resume_url:
        raise HTTPException(status_code=404, detail="Resume not found")
    # Extract filename from resume_url
    filename = application.resume_url.split('/')[-1]
    file_path = os.path.join(settings.UPLOAD_DIR, filename)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Resume file not found")
    # Get original filename for download
    original_filename = f"resume_{application.name}_{application.job.title}.pdf"
    return FileResponse(
        path=file_path,
        filename=original_filename,
        media_type='application/octet-stream',
        headers={
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "*",
        }
    )

@router.get("/{application_id}/resume/view")
def view_resume(
    application_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """View resume file for an application (opens in browser)"""
    application = get_application(db, application_id=application_id)
    if application is None:
        raise HTTPException(status_code=404, detail="Application not found")
    # Check if user has permission to view this resume
    if not current_user.is_admin and application.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    if not application.resume_url:
        raise HTTPException(status_code=404, detail="Resume not found")
    # Extract filename from resume_url
    filename = application.resume_url.split('/')[-1]
    file_path = os.path.join(settings.UPLOAD_DIR, filename)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Resume file not found")
    # Determine content type based on file extension
    file_extension = os.path.splitext(filename)[1].lower()
    content_type_map = {
        '.pdf': 'application/pdf',
        '.doc': 'application/msword',
        '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    }
    content_type = content_type_map.get(file_extension, 'application/octet-stream')
    return FileResponse(
        path=file_path,
        media_type=content_type,
        headers={
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "*",
        }
    )

@router.post("/", response_model=Application)
async def create_job_application(
    job_id: int = Form(...),
    name: str = Form(...),
    email: str = Form(...),
    cover_letter: str = Form(None),
    resume: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Apply for a job with resume upload"""
    
    # Validate file type
    if not resume.filename.lower().endswith(('.pdf', '.doc', '.docx')):
        raise HTTPException(
            status_code=400, 
            detail="Only PDF, DOC, and DOCX files are allowed"
        )
    
    # Save resume file
    file_extension = os.path.splitext(resume.filename)[1]
    filename = f"resume_{current_user.id}_{job_id}_{os.urandom(8).hex()}{file_extension}"
    file_path = os.path.join(settings.UPLOAD_DIR, filename)
    
    async with aiofiles.open(file_path, 'wb') as out_file:
        content = await resume.read()
        await out_file.write(content)
    
    resume_url = f"/uploads/{filename}"
    
    # Create application
    application_data = ApplicationCreate(
        job_id=job_id,
        name=name,
        email=email,
        cover_letter=cover_letter
    )
    
    try:
        application = create_application(
            db=db, 
            application=application_data, 
            user_id=current_user.id, 
            resume_url=resume_url
        )
        return application
    except ValueError as e:
        # Clean up uploaded file if application creation fails
        if os.path.exists(file_path):
            os.remove(file_path)
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/{application_id}", response_model=Application)
def update_application_status(
    application_id: int,
    application: ApplicationUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Update application status (Admin only)"""
    updated_application = update_application(db=db, application_id=application_id, application=application)
    if updated_application is None:
        raise HTTPException(status_code=404, detail="Application not found")
    return updated_application 