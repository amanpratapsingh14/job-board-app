from . import database, schemas, utils
from datetime import datetime
from bson import ObjectId
from fastapi.encoders import jsonable_encoder

# Admin CRUD
async def create_admin(email: str, password: str):
    existing = await database.admin_collection.find_one({"email": email})
    if existing:
        raise Exception("Admin already exists")
    hashed_pw = utils.get_password_hash(password)
    admin_dict = {"email": email, "password": hashed_pw}
    result = await database.admin_collection.insert_one(admin_dict)
    return {"email": email}

async def authenticate_admin(email: str, password: str):
    admin = await database.admin_collection.find_one({"email": email})
    if admin and utils.verify_password(password, admin["password"]):
        return admin
    return None

# User CRUD
async def create_user(user: schemas.UserCreate):
    existing = await database.user_collection.find_one({"email": user.email})
    if existing:
        raise Exception("User already exists")
    hashed_pw = utils.get_password_hash(user.password)
    user_dict = user.dict()
    user_dict["password"] = hashed_pw
    user_dict = jsonable_encoder(user_dict)
    result = await database.user_collection.insert_one(user_dict)
    created = await database.user_collection.find_one({"_id": result.inserted_id})
    created["_id"] = str(created["_id"])
    return schemas.UserCreate(**created)

async def authenticate_user(email: str, password: str):
    user = await database.user_collection.find_one({"email": email})
    if user and utils.verify_password(password, user["password"]):
        return user
    return None

# Company CRUD
async def create_company(company: schemas.CompanyProfile):
    company_dict = jsonable_encoder(company)
    result = await database.company_collection.insert_one(company_dict)
    created = await database.company_collection.find_one({"_id": result.inserted_id})
    created["_id"] = str(created["_id"])
    return schemas.CompanyOut(**created)

async def get_company():
    companies = []
    async for company in database.company_collection.find():
        company["_id"] = str(company["_id"])
        companies.append(schemas.CompanyOut(**company))
    return companies

async def get_company_by_id(company_id: str):
    try:
        # Convert string ID to ObjectId
        object_id = ObjectId(company_id)
        company = await database.company_collection.find_one({"_id": object_id})
        if company:
            company["_id"] = str(company["_id"])
            return schemas.CompanyOut(**company)
        return None
    except Exception:
        return None

# Jobs CRUD
async def create_job(job: schemas.JobCreate):
    job_dict = jsonable_encoder(job)
    result = await database.job_collection.insert_one(job_dict)
    created = await database.job_collection.find_one({"_id": result.inserted_id})
    created["_id"] = str(created["_id"])
    return schemas.JobOut(**created)

async def list_jobs():
    jobs = []
    async for job in database.job_collection.find({"status": "open"}):
        job["_id"] = str(job["_id"])
        jobs.append(schemas.JobOut(**job))
    return jobs

async def get_job_by_id(job_id: str):
    try:
        # Convert string ID to ObjectId
        object_id = ObjectId(job_id)
        job = await database.job_collection.find_one({"_id": object_id})
        if job:
            job["_id"] = str(job["_id"])
            return schemas.JobOut(**job)
        return None
    except Exception:
        return None

# Applications CRUD
async def create_application(application: schemas.ApplicationCreate, resume_path: str):
    app_dict = application.dict()
    app_dict["resume_path"] = resume_path
    app_dict["appliedOn"] = datetime.now().isoformat()
    app_dict = jsonable_encoder(app_dict)
    result = await database.application_collection.insert_one(app_dict)
    created = await database.application_collection.find_one({"_id": result.inserted_id})
    created["_id"] = str(created["_id"])
    return schemas.ApplicationOut(**created)

async def list_applications():
    applications = []
    async for app in database.application_collection.find():
        app["_id"] = str(app["_id"])
        applications.append(schemas.ApplicationOut(**app))
    return applications

async def get_user_applications(email: str):
    applications = []
    async for app in database.application_collection.find({"email": email}):
        app["_id"] = str(app["_id"])
        applications.append(schemas.ApplicationOut(**app))
    return applications