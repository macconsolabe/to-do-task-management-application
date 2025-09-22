#!/bin/bash

# Development startup script for Todo Task Management Application

echo "🚀 Starting Todo Task Management Application (Development Mode)"
echo "=================================================================="

# Check prerequisites
echo "📋 Checking prerequisites..."

# Check if .NET is installed
# First check if dotnet is in PATH
if command -v dotnet &> /dev/null; then
    DOTNET_CMD="dotnet"
# Check common macOS installation locations
elif [ -f "$HOME/.dotnet/dotnet" ]; then
    DOTNET_CMD="$HOME/.dotnet/dotnet"
    export PATH="$PATH:$HOME/.dotnet"
elif [ -f "/usr/local/share/dotnet/dotnet" ]; then
    DOTNET_CMD="/usr/local/share/dotnet/dotnet"
    export PATH="$PATH:/usr/local/share/dotnet"
else
    echo "❌ .NET SDK is not installed or not found in common locations."
    echo "   Download from: https://dotnet.microsoft.com/download"
    echo ""
    echo "   If you have .NET installed in a custom location, you can:"
    echo "   1. Add it to your PATH: export PATH=\"\$PATH:/path/to/dotnet\""
    echo "   2. Or create a symlink: ln -s /path/to/dotnet /usr/local/bin/dotnet"
    exit 1
fi

# Verify .NET SDK is installed (not just runtime)
if ! $DOTNET_CMD --list-sdks &> /dev/null; then
    echo "❌ .NET SDK is not installed (only runtime found)."
    echo "   Download .NET 8 SDK from: https://dotnet.microsoft.com/download"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

echo "✅ Prerequisites check passed"

# Check if Ollama is available (optional for AI features)
echo ""
echo "🤖 Checking AI Assistant availability..."
if command -v ollama &> /dev/null; then
    if ollama list | grep -q "llama3.2:latest"; then
        echo "✅ Ollama + llama3.2 model found - AI Assistant will be enabled"
        export EnableAI=true
    else
        echo "⚠️  Ollama found but llama3.2 model missing"
        echo "   Run 'ollama run llama3.2' to enable AI features"
        echo "   Continuing without AI..."
        export EnableAI=false
    fi
else
    echo "ℹ️  Ollama not found - AI Assistant disabled"
    echo "   Install from https://ollama.com/ and run 'ollama run llama3.2' to enable AI"
    export EnableAI=false
fi

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
$DOTNET_CMD restore --quiet
EnableAI=$EnableAI $DOTNET_CMD run --urls="http://localhost:5001" --verbosity quiet &
BACKEND_PID=$!

# Wait for backend to start
echo "⏳ Waiting for backend to start..."
for i in {1..10}; do
    if curl -s http://localhost:5001/api/health > /dev/null 2>&1; then
        break
    fi
    sleep 1
done

# Check if backend is running
if ! curl -s http://localhost:5001/api/health > /dev/null 2>&1; then
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
echo "   🔧 Backend API:       http://localhost:5001"
echo "   📚 API Documentation: http://localhost:5001/swagger"
echo "   ❤️  Health Check:     http://localhost:5001/api/health"
echo ""
echo "💡 Tips:"
echo "   • The frontend will hot-reload when you make changes"
echo "   • The backend API includes Swagger documentation"
echo "   • SQLite database is stored in ./data/ezratask.db"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for processes
wait
