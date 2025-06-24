from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

# User schemas
class UserBase(BaseModel):
    email: EmailStr
    username: str

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(UserBase):
    id: int
    is_admin: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

# Job schemas
class JobBase(BaseModel):
    title: str
    description: str
    location: str
    salary: float
    status: str = "active"

class JobCreate(JobBase):
    pass

class JobUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    location: Optional[str] = None
    salary: Optional[float] = None
    status: Optional[str] = None

class Job(JobBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

# Application schemas
class ApplicationBase(BaseModel):
    name: str
    email: EmailStr
    cover_letter: Optional[str] = None

class ApplicationCreate(ApplicationBase):
    job_id: int

class ApplicationUpdate(BaseModel):
    status: str

class Application(ApplicationBase):
    id: int
    user_id: int
    job_id: int
    resume_url: str
    status: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class ApplicationWithJob(Application):
    job: Job
    
    class Config:
        from_attributes = True

# Search and filter schemas
class JobSearch(BaseModel):
    location: Optional[str] = None
    min_salary: Optional[float] = None
    max_salary: Optional[float] = None
    status: Optional[str] = None 