import motor.motor_asyncio
import os

MONGO_DETAILS = os.getenv("MONGO_URL", "mongodb://mongo:27017")
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)
database = client.jobboard

admin_collection = database.get_collection("admin_users")
user_collection = database.get_collection("users")
company_collection = database.get_collection("companies")
job_collection = database.get_collection("jobs")
application_collection = database.get_collection("applications")
