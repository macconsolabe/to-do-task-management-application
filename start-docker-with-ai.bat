@echo off
setlocal enabledelayedexpansion

echo 🐳 Starting Todo Task Management Application (Docker Mode + AI)
echo ==============================================================

REM Check if Docker is installed
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker is not installed. Please install Docker Desktop first.
    echo    Download from: https://www.docker.com/products/docker-desktop/
    pause
    exit /b 1
)

REM Check if Docker Compose is available
docker compose version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker Compose is not available. Please install Docker Desktop.
    pause
    exit /b 1
)

echo ✅ Docker prerequisites check passed

REM Create data directory for SQLite
if not exist data mkdir data

echo.
echo 🚀 Starting services with Docker Compose + AI...
echo This will build and start:
echo    🔧 Backend API (containerized)
echo    🎨 Frontend (containerized with Nginx)
echo    🗃️ Database Admin UI (Adminer)
echo    🤖 Ollama AI Service (with Llama 3.2 model)
echo.
echo ⏳ First startup may take 5-10 minutes to download AI model (2GB)...
echo.

REM Start services with AI enabled
set ENABLE_AI=true
docker compose -f docker-compose.yml -f docker-compose.ai.yml up --build -d

REM Wait a moment for containers to start
timeout /t 3 /nobreak >nul

echo.
echo 🌟 Docker services started with AI!
echo ==================================
echo    📱 Frontend:        http://localhost:3000 (includes Ezra AI)
echo    🔧 Backend API:     http://localhost:5001
echo    🗃️ Database Admin:  http://localhost:8080
echo    🤖 Ollama AI:       http://localhost:11434
echo.

REM Show container status
echo 📊 Container Status:
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo.
echo 📋 To view logs: docker logs ^<container-name^>
echo 🛑 To stop: docker compose -f docker-compose.yml -f docker-compose.ai.yml down
echo.
echo Press Ctrl+C to stop all containers
echo.

REM Keep script running
:loop
timeout /t 1 /nobreak >nul
goto loop
