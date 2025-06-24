from sqlalchemy.orm import Session
from sqlalchemy import and_
from models import User, Job, Application
from schemas import UserCreate, JobCreate, JobUpdate, ApplicationCreate, ApplicationUpdate
from auth import get_password_hash, verify_password
from typing import List, Optional

# User CRUD operations
def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def create_user(db: Session, user: UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = User(
        email=user.email,
        username=user.username,
        hashed_password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user

# Job CRUD operations
def get_jobs(db: Session, skip: int = 0, limit: int = 100, 
             location: Optional[str] = None, 
             min_salary: Optional[float] = None,
             max_salary: Optional[float] = None,
             status: Optional[str] = None):
    query = db.query(Job)
    
    if location:
        query = query.filter(Job.location.ilike(f"%{location}%"))
    if min_salary is not None:
        query = query.filter(Job.salary >= min_salary)
    if max_salary is not None:
        query = query.filter(Job.salary <= max_salary)
    if status:
        query = query.filter(Job.status == status)
    
    return query.offset(skip).limit(limit).all()

def get_job(db: Session, job_id: int):
    return db.query(Job).filter(Job.id == job_id).first()

def create_job(db: Session, job: JobCreate):
    db_job = Job(**job.dict())
    db.add(db_job)
    db.commit()
    db.refresh(db_job)
    return db_job

def update_job(db: Session, job_id: int, job: JobUpdate):
    db_job = get_job(db, job_id)
    if not db_job:
        return None
    
    update_data = job.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_job, field, value)
    
    db.commit()
    db.refresh(db_job)
    return db_job

def delete_job(db: Session, job_id: int):
    db_job = get_job(db, job_id)
    if not db_job:
        return False
    
    db.delete(db_job)
    db.commit()
    return True

# Application CRUD operations
def get_applications(db: Session, skip: int = 0, limit: int = 100, user_id: Optional[int] = None):
    query = db.query(Application)
    if user_id:
        query = query.filter(Application.user_id == user_id)
    return query.offset(skip).limit(limit).all()

def get_application(db: Session, application_id: int):
    return db.query(Application).filter(Application.id == application_id).first()

def create_application(db: Session, application: ApplicationCreate, user_id: int, resume_url: str):
    # Check if user already applied for this job
    existing_application = db.query(Application).filter(
        and_(Application.user_id == user_id, Application.job_id == application.job_id)
    ).first()
    
    if existing_application:
        raise ValueError("User has already applied for this job")
    
    db_application = Application(
        **application.dict(),
        user_id=user_id,
        resume_url=resume_url
    )
    db.add(db_application)
    db.commit()
    db.refresh(db_application)
    return db_application

def update_application(db: Session, application_id: int, application: ApplicationUpdate):
    db_application = get_application(db, application_id)
    if not db_application:
        return None
    
    update_data = application.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_application, field, value)
    
    db.commit()
    db.refresh(db_application)
    return db_application

def get_applications_by_job(db: Session, job_id: int):
    return db.query(Application).filter(Application.job_id == job_id).all() 