from fastapi import APIRouter, HTTPException, Depends
from typing import List
from .. import schemas, crud, utils, auth

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.post("/register")
async def register_admin(register_data: schemas.AdminRegister):
    """Register a new admin user"""
    try:
        await crud.create_admin(register_data.email, register_data.password)
        return {"message": "Admin registered successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/login", response_model=schemas.Token)
async def login(login_data: schemas.AdminLogin):
    """Admin login - returns JWT token"""
    admin = await crud.authenticate_admin(login_data.email, login_data.password)
    if not admin:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    access_token = utils.create_access_token(data={"sub": admin["email"]})
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/jobs", response_model=schemas.JobOut)
async def create_job(job: schemas.JobCreate, current_admin=Depends(auth.get_current_admin)):
    """Create a new job posting (admin only)"""
    job_created = await crud.create_job(job)
    return job_created

@router.get("/applications", response_model=List[schemas.ApplicationOut])
async def get_applications(current_admin=Depends(auth.get_current_admin)):
    """Get all applications (admin only)"""
    return await crud.list_applications()
