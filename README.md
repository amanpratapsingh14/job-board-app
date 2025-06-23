# Job Board Application

This is a full-stack job board application built with a React frontend and a FastAPI backend. The entire application is containerized using Docker and managed with Docker Compose for easy setup and deployment.

## Key Features

- **Clean, Modern Frontend**: A responsive and user-friendly interface built with React.
- **Robust Backend API**: A powerful and fast backend powered by FastAPI.
- **Database**: MongoDB for flexible and scalable data storage.
- **Containerized**: Fully containerized with Docker for consistent development and production environments.
- **Authentication**: Secure JWT-based authentication for both regular users and administrators.
- **Complete Job Cycle**: Functionality for creating companies, posting jobs (admin), browsing jobs, and applying for jobs (user).
- **Comprehensive Testing**: Includes an end-to-end API testing script to ensure reliability.

## Project Structure

The project is organized into a clean and maintainable structure:

```
/
├── backend/            # Contains the FastAPI backend source code
├── frontend/           # Contains the React frontend source code
├── .dockerignore       # Specifies files to ignore in Docker builds
├── .env.example        # Example environment variables (create a .env from this)
├── API_DOCUMENTATION.md # Detailed documentation of all API endpoints
├── docker-compose.yml  # Defines and configures the multi-container application
├── Dockerfile          # Multi-stage Dockerfile for building the application
├── nginx.conf          # Nginx configuration for serving the app and proxying the API
├── README.md           # This file
├── req.txt             # Python dependencies for the backend
└── start.sh            # Script to start Nginx and the backend server
```

## Application Workflow

The application provides two main user roles: **Admin** and **User (Job Seeker)**.

1.  **Admin Role**:
    - An admin can log in to a dedicated dashboard.
    - From the dashboard, the admin can **post new job openings** and **view all applications** submitted by users for any job.

2.  **User Role (Job Seeker)**:
    - A user can register and log in to the main application.
    - Users can browse the list of available jobs.
    - Users can view detailed information for a specific job.
    - Users can **submit an application** for a job, which includes uploading a resume.
    - Users can view a list of all the applications they have submitted.

## Getting Started

Follow these instructions to get the application up and running on your local machine.

### Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/) (usually included with Docker Desktop)

### Installation & Running the Application

1.  **Clone the Repository:**
    ```bash
    git clone <your-repository-url>
    cd job_board_app
    ```

2.  **Create an Environment File:**
    This project uses environment variables for configuration. The necessary variables are already set within the `docker-compose.yml` file for development. For production, you would create a `.env` file in the `backend` directory.

3.  **Build and Run with Docker Compose:**
    From the root of the project, run the following command. This will build the Docker image and start the application and database containers.
    ```bash
    sudo docker-compose up --build -d
    ```
    *Note: `sudo` may be required depending on your Docker installation.*

4.  **Access the Application:**
    Once the containers are running, you can access the application in your web browser:
    - **Frontend:** [http://localhost:8080](http://localhost:8080)
    - **Backend API Docs:** [http://localhost:8080/docs](http://localhost:8080/docs)

5.  **Stopping the Application:**
    To stop the application and remove the containers, run:
    ```bash
    sudo docker-compose down
    ```

## Testing the API

The project includes a comprehensive test script that verifies all API endpoints. To run the tests:

1.  **Ensure the application is running** (using `docker-compose up`).
2.  **Run the test script** from the project root:
    ```bash
    cd backend && python3 test_api.py
    ```

## Troubleshooting

If you encounter issues while running the application, try the following steps.

### Port Conflicts
If you see an error like `port is already allocated`, it means another service is using port `8080` or `27018`. You can either stop the other service or change the port mappings in the `docker-compose.yml` file. For example, change `8080:80` to `8081:80`.

### Corrupted Docker State (`KeyError: 'ContainerConfig'`)
Sometimes, Docker's state can become corrupted, leading to strange errors. To perform a full cleanup, run the following command. **Warning**: This will delete all Docker containers, volumes (including your database data), and networks associated with the project.

```bash
sudo docker-compose down --volumes --remove-orphans
```

After running this command, you can try building and starting the application again with `sudo docker-compose up --build -d`.

### Viewing Logs
To inspect the logs for a running service and diagnose issues:
```bash
sudo docker-compose logs app
sudo docker-compose logs mongo
```

## How It Works: Docker Configuration

-   **Multi-Stage `Dockerfile`**: The project uses a single, efficient multi-stage `Dockerfile`.
    1.  The `builder` stage builds the production-ready React frontend.
    2.  The final stage uses a lightweight Nginx image, copies the built frontend, installs the Python backend, and sets up the environment.
-   **`docker-compose.yml`**:
    -   Defines two services: `app` (our application) and `mongo` (the database).
    -   Manages networking between the services.
    -   Sets environment variables for the application.
-   **`nginx.conf`**:
    -   Serves the static React application files.
    -   Acts as a reverse proxy, forwarding all requests to `/api` to the FastAPI backend running on port 8000.
-   **`start.sh`**: A simple shell script that starts both the Nginx server and the Uvicorn server for the FastAPI backend within the final container.

This setup creates a single, unified container for the entire application, making it easy to manage and deploy.

## Features

- **Frontend**: React application with Material-UI
- **Backend**: FastAPI with MongoDB
- **Authentication**: JWT-based authentication for users and admins
- **Job Management**: Create, view, and apply for jobs
- **Application Tracking**: Track job applications
- **Admin Panel**: Manage jobs and applications

## Quick Start with Docker

### Prerequisites

- Docker
- Docker Compose

### Running the Application

1. **Clone the repository and navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Build and start the application:**
   ```bash
   docker-compose up --build
   ```

3. **Access the application:**
   - Frontend: http://localhost
   - Backend API: http://localhost/api
   - API Documentation: http://localhost/docs

### Environment Variables

The application uses the following environment variables (configured in docker-compose.yml):

- `MONGO_URL`: MongoDB connection string
- `SECRET_KEY`: JWT secret key
- `ALGORITHM`: JWT algorithm (default: HS256)
- `ACCESS_TOKEN_EXPIRE_MINUTES`: Token expiration time
- `DEBUG`: Debug mode
- `ALLOWED_ORIGINS`: CORS allowed origins

## Development

### Running Locally

1. **Backend:**
   ```bash
   cd backend
   source venv/bin/activate
   pip install -r req.txt
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

2. **Frontend:**
   ```bash
   cd frontend
   npm install
   npm start
   ```

### API Endpoints

- `GET /` - Health check
- `GET /health` - Health check
- `POST /admin/register` - Admin registration
- `POST /admin/login` - Admin login
- `POST /admin/jobs` - Create job (admin only)
- `GET /jobs` - Get all jobs
- `POST /jobs/{job_id}/apply` - Apply for job
- `GET /admin/applications` - Get applications (admin only)
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /user/profile` - Get user profile
- `PUT /user/profile` - Update user profile

## Docker Architecture

The application uses a multi-stage Docker build:

1. **Frontend Builder**: Builds the React application
2. **Backend Builder**: Installs Python dependencies
3. **Final Stage**: Combines frontend build and backend, served by nginx

### Services

- **app**: Main application (frontend + backend)
- **mongo**: MongoDB database

## Troubleshooting

### Common Issues

1. **Port conflicts**: Make sure ports 80 and 27017 are available
2. **Build failures**: Check that all files are in the correct locations
3. **Database connection**: Ensure MongoDB is running and accessible

### Logs

View logs for specific services:
```bash
docker-compose logs app
docker-compose logs mongo
```

### Reset Database

To reset the database:
```bash
docker-compose down -v
docker-compose up --build
```

## Production Deployment

For production deployment:

1. Update environment variables in docker-compose.yml
2. Use a proper MongoDB instance
3. Configure SSL/TLS
4. Set up proper logging and monitoring
5. Use a reverse proxy (nginx is already included)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request 