from fastapi import APIRouter, HTTPException
from typing import List
from .. import schemas, crud

router = APIRouter(prefix="/api/jobs", tags=["Jobs"])

@router.post("", response_model=schemas.JobOut)
async def create_job(job: schemas.JobCreate):
    """Create a new job posting"""
    return await crud.create_job(job)

@router.get("", response_model=List[schemas.JobOut])
async def get_jobs():
    """Get all open job postings"""
    return await crud.list_jobs()

@router.get("/{job_id}", response_model=schemas.JobOut)
async def get_job(job_id: str):
    """Get a specific job by ID"""
    job = await crud.get_job_by_id(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job

