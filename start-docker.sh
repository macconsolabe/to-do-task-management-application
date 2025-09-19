#!/bin/bash

# Docker startup script for Todo Task Management Application

echo "🐳 Starting Todo Task Management Application (Docker Mode)"
echo "=========================================================="

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    echo "   Download from: https://docker.com/get-started"
    exit 1
fi

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "❌ Docker Compose is not available. Please install Docker Compose."
    exit 1
fi

echo "✅ Docker prerequisites check passed"

# Create data directory for SQLite
mkdir -p data

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Shutting down Docker services..."
    if command -v docker-compose &> /dev/null; then
        docker-compose down
    else
        docker compose down
    fi
    echo "👋 Services stopped. Goodbye!"
    exit
}

# Set up trap for cleanup
trap cleanup SIGINT SIGTERM

# Start services with Docker Compose
echo ""
echo "🚀 Starting services with Docker Compose..."
echo "This will build and start:"
echo "   🔧 Backend API (containerized)"
echo "   🎨 Frontend (containerized with Nginx)"
echo "   🗃️ Database Admin UI (Adminer)"
echo ""

if command -v docker-compose &> /dev/null; then
    docker-compose up --build -d
else
    docker compose up --build -d
fi

# Wait a moment for containers to start
sleep 3

echo ""
echo "🌟 Docker services started!"
echo "================================"
echo "   📱 Frontend:        http://localhost:3000"
echo "   🔧 Backend API:     http://localhost:5001"
echo "   🗃️ Database Admin:  http://localhost:8080"
echo ""

# Show container status
echo "📊 Container Status:"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo ""
echo "📋 To view logs: docker logs <container-name>"
echo "🛑 To stop: docker compose down"
echo ""

# Keep script running to maintain containers
echo "Press Ctrl+C to stop all containers"
if command -v docker-compose &> /dev/null; then
    trap "docker-compose down" EXIT
else
    trap "docker compose down" EXIT
fi

# Wait for user interrupt
while true; do
    sleep 1
done
