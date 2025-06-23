from pydantic import BaseModel, EmailStr, Field, HttpUrl
from typing import Optional, List
from enum import Enum
from bson import ObjectId
from pydantic import GetCoreSchemaHandler, GetJsonSchemaHandler
from pydantic_core import core_schema

class PyObjectId(ObjectId):
    @classmethod
    def __get_pydantic_core_schema__(cls, source, handler: GetCoreSchemaHandler) -> core_schema.CoreSchema:
        return core_schema.no_info_after_validator_function(
            cls.validate, core_schema.str_schema()
        )

    @classmethod
    def validate(cls, v):
        if isinstance(v, ObjectId):
            return v
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(cls, schema, handler: GetJsonSchemaHandler):
        return {'type': 'string'}

class JobStatus(str, Enum):
    open = "open"
    closed = "closed"

# Admin schemas
class AdminRegister(BaseModel):
    email: EmailStr
    password: str

class AdminLogin(BaseModel):
    email: EmailStr
    password: str

class JobBase(BaseModel):
    title: str = Field(..., max_length=100)
    companyName: str = Field(..., max_length=100)
    description: str = Field(..., max_length=2000)
    location: str
    salary: int
    status: JobStatus

class JobCreate(JobBase):
    pass

class JobOut(JobBase):
    id: str = Field(..., alias="_id")

    class Config:
        allow_population_by_field_name = True
        json_encoders = {ObjectId: str}

class ApplicationBase(BaseModel):
    jobId: str
    jobTitle: str
    companyName: str
    name: str
    email: EmailStr
    experience: Optional[str] = None
    currentCTC: Optional[str] = None
    expectedCTC: Optional[str] = None
    noticePeriod: Optional[str] = None
    portfolioURL: Optional[HttpUrl] = None
    status: Optional[str] = "Pending"
    appliedOn: Optional[str] = None

class ApplicationCreate(ApplicationBase):
    pass

class ApplicationOut(ApplicationBase):
    id: str = Field(..., alias="_id")
    resume_path: str

    class Config:
        allow_population_by_field_name = True
        json_encoders = {ObjectId: str}

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class CompanyProfile(BaseModel):
    companyName: str
    description: str
    website: HttpUrl
    location: str
    industry: str
    size: str
    logoUrl: Optional[str] = None

class CompanyOut(CompanyProfile):
    id: str = Field(..., alias="_id")

    class Config:
        allow_population_by_field_name = True
        json_encoders = {ObjectId: str}

class Token(BaseModel):
    access_token: str
    token_type: str