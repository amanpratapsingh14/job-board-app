#!/bin/bash

# Job Board Application Docker Setup Script

echo "🐳 Job Board Application Docker Setup"
echo "====================================="

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    echo "Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    echo "Visit: https://docs.docker.com/compose/install/"
    exit 1
fi

# Check if Docker daemon is running
if ! docker info &> /dev/null; then
    echo "❌ Docker daemon is not running. Please start Docker first."
    exit 1
fi

echo "✅ Docker and Docker Compose are available"

# Function to start services
start_services() {
    echo "🚀 Starting Job Board Application services..."
    
    # Check if we're in the right directory
    if [ ! -f "docker-compose.yml" ]; then
        echo "❌ docker-compose.yml not found. Please run this script from the project root."
        exit 1
    fi
    
    # Start services
    docker-compose up -d
    
    if [ $? -eq 0 ]; then
        echo "✅ Services started successfully!"
        echo ""
        echo "📊 Service Status:"
        docker-compose ps
        echo ""
        echo "🌐 Access your application:"
        echo "   API: http://localhost:8000"
        echo "   Swagger UI: http://localhost:8000/docs"
        echo "   ReDoc: http://localhost:8000/redoc"
        echo ""
        echo "📝 Default Admin Credentials:"
        echo "   Email: admin@jobboard.com"
        echo "   Password: admin123"
        echo ""
        echo "📋 Useful commands:"
        echo "   View logs: docker-compose logs -f"
        echo "   Stop services: docker-compose down"
        echo "   Restart services: docker-compose restart"
    else
        echo "❌ Failed to start services. Check the logs above."
        exit 1
    fi
}

# Function to start development environment
start_dev() {
    echo "🔧 Starting development environment..."
    
    if [ ! -f "docker-compose.dev.yml" ]; then
        echo "❌ docker-compose.dev.yml not found. Please run this script from the project root."
        exit 1
    fi
    
    docker-compose -f docker-compose.dev.yml down --volumes --remove-orphans
    
    docker-compose -f docker-compose.dev.yml up -d
    
    if [ $? -eq 0 ]; then
        echo "✅ Development environment started successfully!"
        echo ""
        echo "🌐 Access your application:"
        echo "   Web UI: http://localhost:3000"
        echo "   API: http://localhost:8000"
        echo "   Swagger UI: http://localhost:8000/docs"
        echo ""
        echo "📝 Default Admin Credentials:"
        echo "   Email: admin@jobboard.com"
        echo "   Password: admin123"
        echo ""
        echo "📋 Useful commands:"
        echo "   View logs: docker-compose -f docker-compose.dev.yml logs -f"
        echo "   Stop services: docker-compose -f docker-compose.dev.yml down"
    else
        echo "❌ Failed to start development environment. Check the logs above."
        exit 1
    fi
}

# Function to stop services
stop_services() {
    echo "🛑 Stopping services..."
    docker-compose down
    echo "✅ Services stopped"
}

# Function to show logs
show_logs() {
    echo "📋 Showing logs..."
    docker-compose logs -f
}

# Function to rebuild services
rebuild_services() {
    echo "🔨 Rebuilding services..."
    docker-compose down
    docker-compose up -d --build
    echo "✅ Services rebuilt and started"
}

# Function to clean up
cleanup() {
    echo "🧹 Cleaning up Docker resources..."
    docker-compose down -v
    docker system prune -f
    echo "✅ Cleanup completed"
}

# Main menu
case "${1:-}" in
    "start")
        start_services
        ;;
    "dev")
        start_dev
        ;;
    "stop")
        stop_services
        ;;
    "logs")
        show_logs
        ;;
    "rebuild")
        rebuild_services
        ;;
    "cleanup")
        cleanup
        ;;
    *)
        echo "Usage: $0 {start|dev|stop|logs|rebuild|cleanup}"
        echo ""
        echo "Commands:"
        echo "  start   - Start production services"
        echo "  dev     - Start development environment"
        echo "  stop    - Stop all services"
        echo "  logs    - Show service logs"
        echo "  rebuild - Rebuild and restart services"
        echo "  cleanup - Stop services and clean up resources"
        echo ""
        echo "Examples:"
        echo "  $0 start    # Start production environment"
        echo "  $0 dev      # Start development environment"
        echo "  $0 logs     # View logs"
        ;;
esac 