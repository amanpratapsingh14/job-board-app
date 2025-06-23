from fastapi import APIRouter, HTTPException, Depends
from typing import List
from .. import schemas, crud, utils, auth

router = APIRouter(prefix="/api/users", tags=["Users"])

@router.post("", status_code=201)
async def signup(user: schemas.UserCreate):
    """Register a new user"""
    try:
        await crud.create_user(user)
        return {"message": "User created successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/applications", response_model=List[schemas.ApplicationOut])
async def get_user_applications(current_user=Depends(auth.get_current_user)):
    """Get applications for the current user"""
    return await crud.get_user_applications(current_user["email"])

