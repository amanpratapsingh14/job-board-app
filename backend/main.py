from typing import Union
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import os
from database import engine
from models import Base
from routers import auth, jobs, applications

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Job Board API",
    description="A comprehensive job board application with admin and user interfaces",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files for resume uploads
if os.path.exists("uploads"):
    app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Include routers
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(jobs.router, prefix="/jobs", tags=["Jobs"])
app.include_router(applications.router, prefix="/applications", tags=["Applications"])

@app.get("/")
def read_root():
    return {
        "message": "Job Board API",
        "version": "1.0.0",
        "docs": "/docs",
        "redoc": "/redoc"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.get("/job/{job_id}")
def read_job_id(job_id: int, q: Union[str, None] = None):
    return {"job_id": job_id, "q": q}

