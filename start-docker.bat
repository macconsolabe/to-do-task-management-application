@echo off
setlocal enabledelayedexpansion
REM Docker startup script for Todo Task Management Application (Windows)
REM Works on Windows 7, 8, 10, 11 and Windows Server

echo Starting Todo Task Management Application (Docker Mode)
echo ==========================================================
echo ℹ️  Note: AI Assistant is disabled by default for faster startup
echo    To enable AI: run start-docker-with-ai.bat instead
echo.

REM Check if Docker is installed
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Docker is not installed. Please install Docker Desktop first.
    echo    Download from: https://docker.com/get-started
    pause
    exit /b 1
)

REM Check if Docker is running
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Docker is not running. Please start Docker Desktop.
    pause
    exit /b 1
)

echo Docker prerequisites check passed

REM Create data directory for SQLite
if not exist data mkdir data

REM Start services with Docker Compose
echo.
echo Starting services with Docker Compose...
echo This will build and start:
echo    Backend API (containerized)
echo    Frontend (containerized with Nginx)
echo    Database Admin UI (Adminer)
echo.

docker compose up --build -d

REM Wait for containers to start
timeout /t 3 /nobreak >nul

echo.
echo Docker services started!
echo ================================
echo    Frontend:        http://localhost:3000
echo    Backend API:     http://localhost:5001
echo    Database Admin:  http://localhost:8080
echo.

REM Show container status
echo Container Status:
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo.
echo To view logs: docker logs [container-name]
echo To stop: docker compose down
echo.
echo Press any key to stop all containers...
pause >nul

docker compose down
echo Services stopped. Goodbye!
