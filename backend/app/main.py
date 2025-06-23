from fastapi import FastAPI
from .routes import user, auth, company, jobs, applications, admin
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(title="Job Board API", version="1.0.0")

# Get allowed origins from environment
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user.router)
app.include_router(auth.router)
app.include_router(company.router)
app.include_router(jobs.router)
app.include_router(applications.router)
app.include_router(admin.router)

@app.get("/")
async def root():
    return {"message": "Job Board API is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

