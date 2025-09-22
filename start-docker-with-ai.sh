#!/bin/bash

# Docker startup script with AI for Todo Task Management Application

echo "🐳 Starting Todo Task Management Application (Docker Mode + AI)"
echo "=============================================================="

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
        docker-compose -f docker-compose.yml -f docker-compose.ai.yml down
    else
        docker compose -f docker-compose.yml -f docker-compose.ai.yml down
    fi
    echo "👋 Services stopped. Goodbye!"
    exit
}

# Set up trap for cleanup
trap cleanup SIGINT SIGTERM

# Start services with Docker Compose
echo ""
echo "🚀 Starting services with Docker Compose + AI..."
echo "This will build and start:"
echo "   🔧 Backend API (containerized)"
echo "   🎨 Frontend (containerized with Nginx)"
echo "   🗃️ Database Admin UI (Adminer)"
echo "   🤖 Ollama AI Service (with Llama 3.2 model)"
echo ""
echo "⏳ First startup may take 5-10 minutes to download AI model (2GB)..."
echo ""

if command -v docker-compose &> /dev/null; then
    ENABLE_AI=true docker-compose -f docker-compose.yml -f docker-compose.ai.yml up --build -d
else
    ENABLE_AI=true docker compose -f docker-compose.yml -f docker-compose.ai.yml up --build -d
fi

# Wait a moment for containers to start
sleep 3

echo ""
echo "🌟 Docker services started with AI!"
echo "=================================="
echo "   📱 Frontend:        http://localhost:3000 (includes Ezra AI)"
echo "   🔧 Backend API:     http://localhost:5001"
echo "   🗃️ Database Admin:  http://localhost:8080"
echo "   🤖 Ollama AI:       http://localhost:11434"
echo ""

# Show container status
echo "📊 Container Status:"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo ""
echo "📋 To view logs: docker logs <container-name>"
echo "🛑 To stop: docker compose -f docker-compose.yml -f docker-compose.ai.yml down"
echo ""

# Keep script running to maintain containers
echo "Press Ctrl+C to stop all containers"
if command -v docker-compose &> /dev/null; then
    trap "docker-compose -f docker-compose.yml -f docker-compose.ai.yml down" EXIT
else
    trap "docker compose -f docker-compose.yml -f docker-compose.ai.yml down" EXIT
fi

# Wait for user interrupt
while true; do
    sleep 1
done
