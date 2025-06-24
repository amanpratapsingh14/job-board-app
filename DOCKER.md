# 🐳 Docker Setup for Job Board Application

This document explains how to run the Job Board Application using Docker and Docker Compose.

## 📋 Prerequisites

- Docker Engine 20.10+
- Docker Compose 2.0+
- At least 2GB of available RAM
- At least 5GB of available disk space

## 🚀 Quick Start

### Production Deployment

1. **Clone the repository and navigate to the project directory**
   ```bash
   git clone <repository-url>
   cd job-board-app
   ```

2. **Start all services**
   ```bash
   docker-compose up -d
   ```

3. **Check service status**
   ```bash
   docker-compose ps
   ```

4. **View logs**
   ```bash
   docker-compose logs -f backend
   ```

5. **Access the application**
   - API: http://localhost:8000
   - Swagger UI: http://localhost:8000/docs
   - ReDoc: http://localhost:8000/redoc

### Development Environment

1. **Start development services**
   ```bash
   docker-compose -f docker-compose.dev.yml up -d
   ```

2. **Access the application**
   - API: http://localhost:8000
   - Swagger UI: http://localhost:8000/docs

## 🏗 Architecture

The Docker setup includes the following services:

### Services

| Service | Image | Port | Description |
|---------|-------|------|-------------|
| `backend` | Custom FastAPI | 8000 | Main API application |
| `postgres` | PostgreSQL 15 | 5432 | Primary database |
| `redis` | Redis 7 | 6379 | Caching and sessions |

### Volumes

| Volume | Purpose |
|--------|---------|
| `postgres_data` | Persistent PostgreSQL data |
| `uploads_data` | Persistent file uploads |
| `redis_data` | Persistent Redis data |

### Networks

- `job_board_network`: Internal network for service communication

## 🔧 Configuration

### Environment Variables

The application uses the following environment variables:

```env
# Database
DATABASE_URL=postgresql://job_user:job_password@postgres:5432/job_board

# Security
SECRET_KEY=your-secret-key-here-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# File Uploads
UPLOAD_DIR=uploads
```

### Database Configuration

- **Database**: PostgreSQL 15
- **Database Name**: `job_board` (production) / `job_board_dev` (development)
- **Username**: `job_user`
- **Password**: `job_password`
- **Port**: `5432`

## 📊 Monitoring

### Health Checks

All services include health checks:

```bash
# Check service health
docker-compose ps

# View health check logs
docker-compose logs backend | grep health
```

### Logs

```bash
# View all logs
docker-compose logs

# View specific service logs
docker-compose logs backend
docker-compose logs postgres

# Follow logs in real-time
docker-compose logs -f backend
```

## 🛠 Management Commands

### Starting Services

```bash
# Start all services
docker-compose up -d

# Start specific service
docker-compose up -d backend

# Start with rebuild
docker-compose up -d --build
```

### Stopping Services

```bash
# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Stop specific service
docker-compose stop backend
```

### Development Commands

```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up -d

# Rebuild development environment
docker-compose -f docker-compose.dev.yml up -d --build

# View development logs
docker-compose -f docker-compose.dev.yml logs -f backend
```

### Database Management

```bash
# Access PostgreSQL shell
docker-compose exec postgres psql -U job_user -d job_board

# Backup database
docker-compose exec postgres pg_dump -U job_user job_board > backup.sql

# Restore database
docker-compose exec -T postgres psql -U job_user -d job_board < backup.sql
```

## 🔍 Troubleshooting

### Common Issues

1. **Port conflicts**
   ```bash
   # Check if ports are in use
   netstat -tulpn | grep :8000
   netstat -tulpn | grep :5432
   
   # Change ports in docker-compose.yml if needed
   ```

2. **Database connection issues**
   ```bash
   # Check database logs
   docker-compose logs postgres
   
   # Restart database
   docker-compose restart postgres
   ```

3. **Application startup issues**
   ```bash
   # Check application logs
   docker-compose logs backend
   
   # Rebuild application
   docker-compose up -d --build backend
   ```

4. **Permission issues**
   ```bash
   # Fix upload directory permissions
   docker-compose exec backend chown -R appuser:appuser /app/uploads
   ```

### Debugging

```bash
# Access container shell
docker-compose exec backend bash

# Check environment variables
docker-compose exec backend env

# Test database connection
docker-compose exec backend python -c "
from database import engine
from sqlalchemy import text
with engine.connect() as conn:
    result = conn.execute(text('SELECT 1'))
    print('Database connection successful')
"
```

## 🔒 Security Considerations

### Production Deployment

1. **Change default passwords**
   ```env
   POSTGRES_PASSWORD=your-secure-password
   SECRET_KEY=your-secure-secret-key
   ```

2. **Use secrets management**
   ```bash
   # Create secrets
   echo "your-secure-password" | docker secret create postgres_password -
   echo "your-secure-secret-key" | docker secret create app_secret_key -
   ```

3. **Enable HTTPS**
   - Use a reverse proxy (nginx) with SSL certificates
   - Configure CORS properly

4. **Network security**
   - Use Docker networks for service isolation
   - Don't expose database ports publicly

### Environment-Specific Configurations

#### Development
- Hot reloading enabled
- Debug mode enabled
- Local volume mounts for code changes

#### Production
- Optimized for performance
- Health checks enabled
- Proper logging configuration
- Resource limits configured

## 📈 Scaling

### Horizontal Scaling

```bash
# Scale backend service
docker-compose up -d --scale backend=3

# Use load balancer
docker-compose up -d nginx
```

### Resource Limits

Add to docker-compose.yml:
```yaml
services:
  backend:
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M
```

## 🧹 Cleanup

```bash
# Remove all containers and networks
docker-compose down

# Remove all containers, networks, and volumes
docker-compose down -v

# Remove all images
docker-compose down --rmi all

# Clean up unused resources
docker system prune -a
```

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [PostgreSQL Docker Image](https://hub.docker.com/_/postgres)
- [Redis Docker Image](https://hub.docker.com/_/redis)

---

**Happy containerizing! 🐳** 