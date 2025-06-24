from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from database import get_db
from auth import get_current_user, get_current_admin_user
from crud import get_jobs, get_job, create_job, update_job, delete_job
from schemas import Job, JobCreate, JobUpdate, JobSearch
from models import User

router = APIRouter()

@router.get("/", response_model=List[Job])
def read_jobs(
    skip: int = 0,
    limit: int = 100,
    location: Optional[str] = Query(None, description="Filter by location"),
    min_salary: Optional[float] = Query(None, description="Minimum salary"),
    max_salary: Optional[float] = Query(None, description="Maximum salary"),
    status: Optional[str] = Query(None, description="Filter by status"),
    db: Session = Depends(get_db)
):
    """Get all jobs with optional filtering"""
    jobs = get_jobs(
        db, 
        skip=skip, 
        limit=limit, 
        location=location,
        min_salary=min_salary,
        max_salary=max_salary,
        status=status
    )
    return jobs

@router.get("/{job_id}", response_model=Job)
def read_job(job_id: int, db: Session = Depends(get_db)):
    """Get a specific job by ID"""
    job = get_job(db, job_id=job_id)
    if job is None:
        raise HTTPException(status_code=404, detail="Job not found")
    return job

@router.post("/", response_model=Job)
def create_new_job(
    job: JobCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Create a new job (Admin only)"""
    return create_job(db=db, job=job)

@router.put("/{job_id}", response_model=Job)
def update_job_by_id(
    job_id: int,
    job: JobUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Update a job (Admin only)"""
    updated_job = update_job(db=db, job_id=job_id, job=job)
    if updated_job is None:
        raise HTTPException(status_code=404, detail="Job not found")
    return updated_job

@router.delete("/{job_id}")
def delete_job_by_id(
    job_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Delete a job (Admin only)"""
    success = delete_job(db=db, job_id=job_id)
    if not success:
        raise HTTPException(status_code=404, detail="Job not found")
    return {"message": "Job deleted successfully"} 