# Job Board API Documentation

## Overview
The Job Board API is a RESTful service built with FastAPI that provides endpoints for job posting, applications, user management, and company profiles. The API supports both user and admin roles with JWT-based authentication.

## Base URL
```
http://localhost
```

## Authentication
The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## API Endpoints

### 1. Health Check

#### GET /health
Check if the API is running.

**Response:**
```json
{
  "status": "healthy"
}
```

---

### 2. Admin Endpoints

#### POST /admin/register
Register a new admin user.

**Request Body:**
```json
{
  "email": "admin@jobboard.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "message": "Admin registered successfully"
}
```

#### POST /admin/login
Admin login to get JWT token.

**Request Body:**
```json
{
  "email": "admin@jobboard.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "token_type": "bearer"
}
```

#### POST /admin/jobs
Create a new job posting (Admin only).

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "title": "Senior Python Developer",
  "companyName": "TechCorp Solutions",
  "description": "We are looking for an experienced Python developer...",
  "location": "San Francisco, CA",
  "salary": 120000,
  "status": "open"
}
```

**Response:**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "title": "Senior Python Developer",
  "companyName": "TechCorp Solutions",
  "description": "We are looking for an experienced Python developer...",
  "location": "San Francisco, CA",
  "salary": 120000,
  "status": "open"
}
```

#### GET /admin/applications
Get all job applications (Admin only).

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response:**
```json
[
  {
    "id": "507f1f77bcf86cd799439012",
    "jobId": "507f1f77bcf86cd799439011",
    "jobTitle": "Senior Python Developer",
    "companyName": "TechCorp Solutions",
    "name": "Aman Pratap Singh",
    "email": "aman@example.com",
    "experience": "3 years",
    "currentCTC": "80000",
    "expectedCTC": "120000",
    "noticePeriod": "30 days",
    "portfolioURL": "https://github.com/amanpratap",
    "status": "Pending",
    "appliedOn": "2025-06-23T00:45:30.123456",
    "resume_path": "uploads/AmanPratapSingh_PythonDeveloper_3Years.pdf"
  }
]
```

---

### 3. Authentication Endpoints

#### POST /api/auth/register
Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User registered successfully"
}
```

#### POST /api/auth/login
User login to get JWT token.

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "token_type": "bearer"
}
```

---

### 4. Job Endpoints

#### GET /api/jobs
Get all open job postings.

**Response:**
```json
[
  {
    "id": "507f1f77bcf86cd799439011",
    "title": "Senior Python Developer",
    "companyName": "TechCorp Solutions",
    "description": "We are looking for an experienced Python developer...",
    "location": "San Francisco, CA",
    "salary": 120000,
    "status": "open"
  }
]
```

#### GET /api/jobs/{job_id}
Get a specific job by ID.

**Response:**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "title": "Senior Python Developer",
  "companyName": "TechCorp Solutions",
  "description": "We are looking for an experienced Python developer...",
  "location": "San Francisco, CA",
  "salary": 120000,
  "status": "open"
}
```

---

### 5. Application Endpoints

#### POST /api/applications
Submit a job application with resume file.

**Request Body (multipart/form-data):**
```
jobId: 507f1f77bcf86cd799439011
jobTitle: Senior Python Developer
companyName: TechCorp Solutions
name: Aman Pratap Singh
email: aman@example.com
experience: 3 years
currentCTC: 80000
expectedCTC: 120000
noticePeriod: 30 days
portfolioURL: https://github.com/amanpratap
file: [PDF file]
```

**Response:**
```json
{
  "id": "507f1f77bcf86cd799439012",
  "jobId": "507f1f77bcf86cd799439011",
  "jobTitle": "Senior Python Developer",
  "companyName": "TechCorp Solutions",
  "name": "Aman Pratap Singh",
  "email": "aman@example.com",
  "experience": "3 years",
  "currentCTC": "80000",
  "expectedCTC": "120000",
  "noticePeriod": "30 days",
  "portfolioURL": "https://github.com/amanpratap",
  "status": "Pending",
  "appliedOn": "2025-06-23T00:45:30.123456",
  "resume_path": "uploads/AmanPratapSingh_PythonDeveloper_3Years.pdf"
}
```

#### GET /api/applications/user/{email}
Get applications by user email.

**Response:**
```json
[
  {
    "id": "507f1f77bcf86cd799439012",
    "jobId": "507f1f77bcf86cd799439011",
    "jobTitle": "Senior Python Developer",
    "companyName": "TechCorp Solutions",
    "name": "Aman Pratap Singh",
    "email": "aman@example.com",
    "experience": "3 years",
    "currentCTC": "80000",
    "expectedCTC": "120000",
    "noticePeriod": "30 days",
    "portfolioURL": "https://github.com/amanpratap",
    "status": "Pending",
    "appliedOn": "2025-06-23T00:45:30.123456",
    "resume_path": "uploads/AmanPratapSingh_PythonDeveloper_3Years.pdf"
  }
]
```

---

### 6. Company Endpoints

#### POST /api/company/profile
Create a new company profile.

**Request Body:**
```json
{
  "companyName": "TechCorp Solutions",
  "description": "Leading technology solutions provider",
  "website": "https://techcorp.com",
  "location": "San Francisco, CA",
  "industry": "Technology",
  "size": "500-1000 employees",
  "logoUrl": "https://techcorp.com/logo.png"
}
```

**Response:**
```json
{
  "id": "507f1f77bcf86cd799439013",
  "companyName": "TechCorp Solutions",
  "description": "Leading technology solutions provider",
  "website": "https://techcorp.com",
  "location": "San Francisco, CA",
  "industry": "Technology",
  "size": "500-1000 employees",
  "logoUrl": "https://techcorp.com/logo.png"
}
```

#### GET /api/company/profile
Get all company profiles.

**Response:**
```json
[
  {
    "id": "507f1f77bcf86cd799439013",
    "companyName": "TechCorp Solutions",
    "description": "Leading technology solutions provider",
    "website": "https://techcorp.com",
    "location": "San Francisco, CA",
    "industry": "Technology",
    "size": "500-1000 employees",
    "logoUrl": "https://techcorp.com/logo.png"
  }
]
```

#### GET /api/company/profile/{company_id}
Get a specific company profile by ID.

**Response:**
```json
{
  "id": "507f1f77bcf86cd799439013",
  "companyName": "TechCorp Solutions",
  "description": "Leading technology solutions provider",
  "website": "https://techcorp.com",
  "location": "San Francisco, CA",
  "industry": "Technology",
  "size": "500-1000 employees",
  "logoUrl": "https://techcorp.com/logo.png"
}
```

---

### 7. User Endpoints

#### POST /api/users
Register a new user (alternative endpoint).

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User created successfully"
}
```

#### GET /api/users/applications
Get applications for the current user (requires authentication).

**Headers:**
```
Authorization: Bearer <user_token>
```

**Response:**
```json
[
  {
    "id": "507f1f77bcf86cd799439012",
    "jobId": "507f1f77bcf86cd799439011",
    "jobTitle": "Senior Python Developer",
    "companyName": "TechCorp Solutions",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "experience": "2 years",
    "currentCTC": "70000",
    "expectedCTC": "100000",
    "noticePeriod": "15 days",
    "portfolioURL": "https://github.com/johndoe",
    "status": "Pending",
    "appliedOn": "2025-06-23T00:45:30.123456",
    "resume_path": "uploads/john_doe_resume.pdf"
  }
]
```

---

## Data Models

### Job Model
```json
{
  "id": "string",
  "title": "string (max 100 chars)",
  "companyName": "string (max 100 chars)",
  "description": "string (max 2000 chars)",
  "location": "string",
  "salary": "integer",
  "status": "open | closed"
}
```

### Application Model
```json
{
  "id": "string",
  "jobId": "string",
  "jobTitle": "string",
  "companyName": "string",
  "name": "string",
  "email": "email",
  "experience": "string (optional)",
  "currentCTC": "string (optional)",
  "expectedCTC": "string (optional)",
  "noticePeriod": "string (optional)",
  "portfolioURL": "url (optional)",
  "status": "string (default: Pending)",
  "appliedOn": "string (ISO datetime)",
  "resume_path": "string"
}
```

### Company Model
```json
{
  "id": "string",
  "companyName": "string",
  "description": "string",
  "website": "url",
  "location": "string",
  "industry": "string",
  "size": "string",
  "logoUrl": "string (optional)"
}
```

### User Model
```json
{
  "name": "string",
  "email": "email",
  "password": "string"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "detail": "Error message"
}
```

### 401 Unauthorized
```json
{
  "detail": "Invalid credentials"
}
```

### 404 Not Found
```json
{
  "detail": "Resource not found"
}
```

### 422 Validation Error
```json
{
  "detail": [
    {
      "loc": ["body", "email"],
      "msg": "field required",
      "type": "value_error.missing"
    }
  ]
}
```

---

## Testing

### Running the API Test Suite
```bash
cd backend
python test_api.py
```

The test suite will:
1. Test all endpoints
2. Create sample data
3. Use the PDF file from `frontend/public/`
4. Verify all functionality

### Manual Testing with curl

#### Health Check
```bash
curl http://localhost/health
```

#### Admin Registration
```bash
curl -X POST http://localhost/admin/register \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@jobboard.com", "password": "admin123"}'
```

#### Admin Login
```bash
curl -X POST http://localhost/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@jobboard.com", "password": "admin123"}'
```

#### Create Job (with admin token)
```bash
curl -X POST http://localhost/admin/jobs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <admin_token>" \
  -d '{
    "title": "Senior Python Developer",
    "companyName": "TechCorp Solutions",
    "description": "We are looking for an experienced Python developer...",
    "location": "San Francisco, CA",
    "salary": 120000,
    "status": "open"
  }'
```

#### Submit Application with PDF
```bash
curl -X POST http://localhost/api/applications \
  -F "jobId=507f1f77bcf86cd799439011" \
  -F "jobTitle=Senior Python Developer" \
  -F "companyName=TechCorp Solutions" \
  -F "name=Aman Pratap Singh" \
  -F "email=aman@example.com" \
  -F "experience=3 years" \
  -F "currentCTC=80000" \
  -F "expectedCTC=120000" \
  -F "noticePeriod=30 days" \
  -F "portfolioURL=https://github.com/amanpratap" \
  -F "file=@../frontend/public/AmanPratapSingh_PythonDeveloper_3Years.pdf"
```

---

## API Documentation UI

Access the interactive API documentation at:
- **Swagger UI:** http://localhost/docs
- **ReDoc:** http://localhost/redoc

These provide interactive documentation where you can:
- View all endpoints
- Test API calls directly
- See request/response schemas
- Authenticate with JWT tokens

---

## Notes

1. **File Uploads:** The application endpoint accepts PDF files for resumes
2. **Authentication:** Admin and user tokens are separate and cannot be used interchangeably
3. **Data Persistence:** All data is stored in MongoDB
4. **CORS:** The API supports CORS for frontend integration
5. **Validation:** All inputs are validated using Pydantic models
6. **Error Handling:** Comprehensive error handling with appropriate HTTP status codes 