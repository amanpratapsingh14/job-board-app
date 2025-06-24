# Job Board API

A comprehensive job board application with admin and user interfaces built with FastAPI.

## Features

### Admin Panel
- JWT-based authentication
- Add/Edit/Delete jobs (title, description, location, salary, status)
- View list of applicants with resume URLs
- Update application statuses

### User Interface
- View available jobs with search and filtering
- Apply for jobs (submit name, email, upload resume)
- View submitted applications

### Bonus Features
- Search/filter jobs by location and salary
- Limit applications per user per job (one application per job per user)
- Automatic API documentation with Swagger UI

## Setup

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Initialize the database:**
   ```bash
   python init_db.py
   ```

3. **Run the application:**
   ```bash
   uvicorn main:app --reload
   ```

The API will be available at `http://localhost:8000`

## API Documentation

- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

## Default Admin Credentials

- **Email:** admin@jobboard.com
- **Password:** admin123

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/token` - Login and get JWT token

### Jobs (Public)
- `GET /jobs/` - Get all jobs with optional filtering
- `GET /jobs/{job_id}` - Get a specific job

### Jobs (Admin Only)
- `POST /jobs/` - Create a new job
- `PUT /jobs/{job_id}` - Update a job
- `DELETE /jobs/{job_id}` - Delete a job

### Applications
- `GET /applications/` - Get user's applications (or all for admin)
- `GET /applications/{application_id}` - Get specific application
- `POST /applications/` - Apply for a job (with resume upload)
- `PUT /applications/{application_id}` - Update application status (admin only)
- `GET /applications/job/{job_id}` - Get all applications for a job (admin only)

## Query Parameters for Job Search

- `location` - Filter by location (partial match)
- `min_salary` - Minimum salary filter
- `max_salary` - Maximum salary filter
- `status` - Filter by job status (active, inactive, filled)
- `skip` - Number of records to skip (pagination)
- `limit` - Number of records to return (pagination)

## File Upload

Resume files can be uploaded in the following formats:
- PDF (.pdf)
- Microsoft Word (.doc, .docx)

Files are stored in the `uploads/` directory and served statically.

## Database Schema

### Users
- id (Primary Key)
- email (Unique)
- username (Unique)
- hashed_password
- is_admin (Boolean)
- created_at

### Jobs
- id (Primary Key)
- title
- description
- location
- salary
- status (active, inactive, filled)
- created_at
- updated_at

### Applications
- id (Primary Key)
- user_id (Foreign Key)
- job_id (Foreign Key)
- name
- email
- resume_url
- cover_letter
- status (pending, reviewed, accepted, rejected)
- created_at

## Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Role-based access control (admin vs regular users)
- File type validation for uploads
- One application per user per job limit

## Environment Variables

Create a `.env` file with the following variables:
```
SECRET_KEY=your-secret-key-here-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
DATABASE_URL=sqlite:///./job_board.db
UPLOAD_DIR=uploads
``` 