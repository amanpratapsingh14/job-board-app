from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
import jwt
from . import utils, database

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/admin/login")

async def get_current_admin(token: str = Depends(oauth2_scheme)):
    try:
        payload = utils.decode_access_token(token)
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        admin = await database.admin_collection.find_one({"email": email})
        if admin is None:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        return admin
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid credentials")

async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = utils.decode_access_token(token)
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        user = await database.user_collection.find_one({"email": email})
        if user is None:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        return user
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid credentials")
