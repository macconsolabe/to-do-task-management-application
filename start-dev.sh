#!/bin/bash

# Development startup script for Todo Task Management Application

echo "🚀 Starting Todo Task Management Application (Development Mode)"
echo "=================================================================="

# Check prerequisites
echo "📋 Checking prerequisites..."

# Check if .NET is installed
if ! command -v dotnet &> /dev/null; then
    echo "❌ .NET SDK is not installed. Please install .NET 8 SDK first."
    echo "   Download from: https://dotnet.microsoft.com/download"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

echo "✅ Prerequisites check passed"

# Create data directory for SQLite
mkdir -p data

# Function to kill processes on script exit
cleanup() {
    echo ""
    echo "🛑 Shutting down services..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    echo "👋 Services stopped. Goodbye!"
    exit
}

# Set up trap for cleanup
trap cleanup SIGINT SIGTERM

# Start backend
echo ""
echo "🔧 Starting .NET Core backend..."
cd backend
dotnet restore --quiet
export PATH="$PATH:$HOME/.dotnet"
dotnet run --urls="http://localhost:5000" --verbosity quiet &
BACKEND_PID=$!

# Wait for backend to start
echo "⏳ Waiting for backend to start..."
for i in {1..10}; do
    if curl -s http://localhost:5000/api/health > /dev/null 2>&1; then
        break
    fi
    sleep 1
done

# Check if backend is running
if ! curl -s http://localhost:5000/api/health > /dev/null 2>&1; then
    echo "❌ Backend failed to start"
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

echo "✅ Backend started successfully"

# Start frontend
echo ""
echo "🎨 Starting React frontend..."
cd ../frontend
npm install --silent
npm run dev &
FRONTEND_PID=$!

echo ""
echo "🌟 Application is running!"
echo "================================"
echo "   📱 Frontend:          http://localhost:5173"
echo "   🔧 Backend API:       http://localhost:5000"
echo "   📚 API Documentation: http://localhost:5000/swagger"
echo "   ❤️  Health Check:     http://localhost:5000/api/health"
echo ""
echo "💡 Tips:"
echo "   • The frontend will hot-reload when you make changes"
echo "   • The backend API includes Swagger documentation"
echo "   • SQLite database is stored in ./data/todos.db"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for processes
wait
