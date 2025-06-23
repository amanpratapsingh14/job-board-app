from fastapi import APIRouter, UploadFile, File, HTTPException, Depends, Form
from .. import schemas, crud, auth
import os
from typing import List

router = APIRouter(prefix="/api/applications", tags=["Applications"])

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("", response_model=schemas.ApplicationOut)
async def create_application(
    jobId: str = Form(...),
    jobTitle: str = Form(...),
    companyName: str = Form(...),
    name: str = Form(...),
    email: str = Form(...),
    experience: str = Form(""),
    currentCTC: str = Form(""),
    expectedCTC: str = Form(""),
    noticePeriod: str = Form(""),
    portfolioURL: str = Form(""),
    file: UploadFile = File(...)
):
    filepath = os.path.join(UPLOAD_DIR, file.filename)
    with open(filepath, "wb") as f:
        f.write(file.file.read())

    application = schemas.ApplicationCreate(
        jobId=jobId, jobTitle=jobTitle, companyName=companyName,
        name=name, email=email, experience=experience,
        currentCTC=currentCTC, expectedCTC=expectedCTC,
        noticePeriod=noticePeriod, portfolioURL=portfolioURL
    )
    return await crud.create_application(application, filepath)

@router.get("", response_model=List[schemas.ApplicationOut])
async def list_applications(current_admin=Depends(auth.get_current_admin)):
    """Get all applications (admin only)"""
    return await crud.list_applications()

@router.get("/user/{email}", response_model=List[schemas.ApplicationOut])
async def get_user_applications(email: str):
    """Get applications by user email"""
    return await crud.get_user_applications(email)
