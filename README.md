# 🚀 Job Board Application

A comprehensive job board application with admin and user interfaces, built with **FastAPI** backend and featuring JWT authentication, role-based access control, and file upload capabilities.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [Docker Deployment](#-docker-deployment)
- [API Documentation](#-api-documentation)
- [Authentication](#-authentication)
- [Role-Based Access Control](#-role-based-access-control)
- [API Endpoints](#-api-endpoints)
- [Database Schema](#-database-schema)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

## ✨ Features

### 🔐 Admin Panel
- **JWT-based authentication** with secure token management
- **Complete job management**: Create, edit, delete jobs
- **Application oversight**: View all applicants with resume URLs
- **Status management**: Update application statuses (pending → reviewed → accepted/rejected)
- **Dashboard analytics**: Monitor job postings and applications

### 👥 User Interface
- **Job browsing**: View available jobs with advanced search and filtering
- **Application system**: Submit job applications with resume upload
- **Application tracking**: View submitted applications and their status
- **User registration**: Easy sign-up process

### 🎯 Bonus Features
- **Advanced search**: Filter jobs by location, salary range, and status
- **Application limits**: One application per user per job (prevents spam)
- **File validation**: Secure resume upload with type checking
- **API documentation**: Auto-generated Swagger UI and ReDoc
- **Postman collection**: Ready-to-use API testing collection
- **Docker support**: Complete containerization with PostgreSQL and Redis

## 🛠 Tech Stack

### Backend
- **FastAPI** - Modern, fast web framework for building APIs
- **SQLAlchemy** - SQL toolkit and ORM
- **PostgreSQL** - Production database (SQLite for development)
- **Pydantic** - Data validation using Python type annotations
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing and verification
- **aiofiles** - Asynchronous file operations
- **Redis** - Caching and session management

### Security
- **JWT Authentication** - Secure token-based authentication
- **Role-Based Access Control** - Admin vs User permissions
- **Password Hashing** - bcrypt for secure password storage
- **File Type Validation** - Secure file upload handling
- **CORS Support** - Cross-origin resource sharing

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **PostgreSQL** - Production database
- **Redis** - Caching layer

## 📁 Project Structure

```
job-board-app/
├── backend/
│   ├── main.py                          # FastAPI application entry point
│   ├── config.py                        # Configuration settings
│   ├── database.py                      # Database connection and session management
│   ├── models.py                        # SQLAlchemy database models
│   ├── schemas.py                       # Pydantic request/response models
│   ├── auth.py                          # JWT authentication utilities
│   ├── crud.py                          # Database CRUD operations
│   ├── init_db.py                       # Database initialization script
│   ├── init_docker_db.py                # Docker database initialization
│   ├── requirements.txt                 # Python dependencies
│   ├── Dockerfile                       # Backend container definition
│   ├── .dockerignore                    # Docker ignore file
│   ├── README.md                        # Backend-specific documentation
│   ├── Job_Board_API.postman_collection.json  # Postman collection
│   └── routers/
│       ├── __init__.py
│       ├── auth.py                      # Authentication endpoints
│       ├── jobs.py                      # Job management endpoints
│       └── applications.py              # Application endpoints
├── docker-compose.yml                   # Production Docker Compose
├── docker-compose.dev.yml               # Development Docker Compose
├── docker-setup.sh                      # Docker setup script
├── DOCKER.md                            # Docker documentation
└── README.md                            # This file
```

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- pip (Python package installer)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd job-board-app
   ```

2. **Navigate to backend directory**
   ```bash
   cd backend
   ```

3. **Create and activate virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Initialize the database**
   ```bash
   python init_db.py
   ```

6. **Start the server**
   ```bash
   uvicorn main:app --reload
   ```

The API will be available at `http://localhost:8000`

## 🐳 Docker Deployment

### Prerequisites
- Docker Engine 20.10+
- Docker Compose 2.0+

### Quick Docker Setup

1. **Start production environment**
   ```bash
   ./docker-setup.sh start
   ```

2. **Start development environment**
   ```bash
   ./docker-setup.sh dev
   ```

3. **View logs**
   ```bash
   ./docker-setup.sh logs
   ```

4. **Stop services**
   ```bash
   ./docker-setup.sh stop
   ```

### Manual Docker Commands

**Production:**
```bash
docker-compose up -d
```

**Development:**
```bash
docker-compose -f docker-compose.dev.yml up -d
```

**View logs:**
```bash
docker-compose logs -f backend
```

### Docker Services

| Service | Port | Description |
|---------|------|-------------|
| Backend API | 8000 | FastAPI application |
| PostgreSQL | 5432 | Database |
| Redis | 6379 | Caching |

### Access Points
- **API**: http://localhost:8000
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

For detailed Docker documentation, see [DOCKER.md](DOCKER.md)

## 📚 API Documentation

### Interactive Documentation
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Postman Collection
Import the provided `Job_Board_API.postman_collection.json` file into Postman for easy API testing.

## 🔐 Authentication

### Default Admin Credentials
- **Email**: `admin@jobboard.com`
- **Password**: `admin123`

### Authentication Flow
1. **Register** a new user account
2. **Login** to get JWT access token
3. **Include token** in Authorization header for protected endpoints

### Example Authentication
```bash
# Login
curl -X POST "http://localhost:8000/auth/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=admin@jobboard.com&password=admin123"

# Use token in requests
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8000/jobs/
```

## 👥 Role-Based Access Control

### Admin Users
- ✅ Full access to all features
- ✅ Create, edit, delete jobs
- ✅ View all applications
- ✅ Update application statuses
- ✅ Manage user data

### Regular Users
- ✅ View and search jobs
- ✅ Apply for jobs with resume upload
- ✅ View own applications
- ❌ Cannot manage jobs or other users' data

## 🔗 API Endpoints

### Authentication
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/auth/register` | Register new user | Public |
| POST | `/auth/token` | Login and get JWT token | Public |

### Jobs
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/jobs/` | Get all jobs with filtering | Public |
| GET | `/jobs/{job_id}` | Get specific job | Public |
| POST | `/jobs/` | Create new job | Admin only |
| PUT | `/jobs/{job_id}` | Update job | Admin only |
| DELETE | `/jobs/{job_id}` | Delete job | Admin only |

### Applications
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/applications/` | Get user's applications | User/Admin |
| GET | `/applications/{id}` | Get specific application | Owner/Admin |
| POST | `/applications/` | Apply for job | Authenticated users |
| PUT | `/applications/{id}` | Update status | Admin only |
| GET | `/applications/job/{job_id}` | Get all applications for job | Admin only |

### Query Parameters for Job Search
- `location` - Filter by location (partial match)
- `min_salary` - Minimum salary filter
- `max_salary` - Maximum salary filter
- `status` - Filter by job status (active, inactive, filled)
- `skip` - Pagination offset
- `limit` - Number of records to return

## 🗄 Database Schema

### Users Table
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    email VARCHAR UNIQUE NOT NULL,
    username VARCHAR UNIQUE NOT NULL,
    hashed_password VARCHAR NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Jobs Table
```sql
CREATE TABLE jobs (
    id INTEGER PRIMARY KEY,
    title VARCHAR NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR NOT NULL,
    salary FLOAT NOT NULL,
    status VARCHAR DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME
);
```

### Applications Table
```sql
CREATE TABLE applications (
    id INTEGER PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    job_id INTEGER REFERENCES jobs(id),
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    resume_url VARCHAR NOT NULL,
    cover_letter TEXT,
    status VARCHAR DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🧪 Testing

### Manual Testing
1. **Health Check**
   ```bash
   curl http://localhost:8000/health
   ```

2. **Create Admin User**
   ```bash
   curl -X POST "http://localhost:8000/auth/token" \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "username=admin@jobboard.com&password=admin123"
   ```

3. **Create Job (Admin)**
   ```bash
   curl -X POST "http://localhost:8000/jobs/" \
     -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"title": "Test Job", "description": "Test", "location": "Test", "salary": 50000}'
   ```

4. **Get Jobs**
   ```bash
   curl http://localhost:8000/jobs/
   ```

### Automated Testing
The API includes comprehensive error handling and validation. Test edge cases:
- Invalid authentication tokens
- Missing required fields
- Duplicate applications
- File upload validation

## 🚀 Deployment

### Environment Variables
Create a `.env` file in the backend directory:
```env
SECRET_KEY=your-secret-key-here-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
DATABASE_URL=sqlite:///./job_board.db
UPLOAD_DIR=uploads
```

### Production Considerations
1. **Database**: Switch to PostgreSQL or MySQL for production
2. **File Storage**: Use cloud storage (AWS S3, Google Cloud Storage) for resumes
3. **Security**: Change default admin credentials
4. **HTTPS**: Enable SSL/TLS encryption
5. **Rate Limiting**: Implement API rate limiting
6. **Monitoring**: Add logging and monitoring

### Docker Deployment
```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow PEP 8 style guidelines
- Add type hints to all functions
- Include docstrings for all endpoints
- Write tests for new features
- Update documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [API Documentation](http://localhost:8000/docs)
2. Review the [Postman Collection](backend/Job_Board_API.postman_collection.json)
3. Check the [Docker Documentation](DOCKER.md)
4. Open an issue in the repository

## 🎯 Roadmap

- [ ] Frontend React/Vue.js application
- [ ] Email notifications for applications
- [ ] Advanced job search with full-text search
- [ ] Resume parsing and analysis
- [ ] Interview scheduling system
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] Mobile app

---

**Built with ❤️ using FastAPI and modern Python practices** 