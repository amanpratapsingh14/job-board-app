from fastapi import APIRouter, HTTPException
from .. import schemas, crud, utils

router = APIRouter(prefix="/api/auth", tags=["Auth"])

@router.post("/register")
async def register(user_data: schemas.UserCreate):
    """Register a new user"""
    try:
        await crud.create_user(user_data)
        return {"message": "User registered successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/login", response_model=schemas.Token)
async def login(login_data: schemas.UserLogin):
    """User login - returns JWT token"""
    user = await crud.authenticate_user(login_data.email, login_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    access_token = utils.create_access_token(data={"sub": user["email"]})
    return {"access_token": access_token, "token_type": "bearer"}
