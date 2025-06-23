from fastapi import APIRouter, HTTPException
from .. import schemas, crud
from typing import Optional, List

router = APIRouter(prefix="/api/company", tags=["Company"])

@router.post("/profile", response_model=schemas.CompanyOut)
async def create_company_profile(company: schemas.CompanyProfile):
    """Create a new company profile"""
    result = await crud.create_company(company)
    return result

@router.get("/profile", response_model=List[schemas.CompanyOut])
async def get_companies():
    """Get all company profiles"""
    return await crud.get_company()

@router.get("/profile/{company_id}", response_model=schemas.CompanyOut)
async def get_company_by_id(company_id: str):
    """Get a specific company profile by ID"""
    company = await crud.get_company_by_id(company_id)
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")
    return company
