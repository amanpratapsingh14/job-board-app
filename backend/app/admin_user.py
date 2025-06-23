import motor.motor_asyncio
from passlib.context import CryptContext
import asyncio

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

async def create_admin():
    client = motor.motor_asyncio.AsyncIOMotorClient("mongodb://mongo:27017")
    db = client.jobboard
    admin_collection = db.admin_users

    email = "admin@example.com"
    password = "admin123"
    hashed_password = pwd_context.hash(password)

    admin = {"email": email, "hashed_password": hashed_password}
    await admin_collection.insert_one(admin)
    print("Admin created successfully")

asyncio.run(create_admin())

