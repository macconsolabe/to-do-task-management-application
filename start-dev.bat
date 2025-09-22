@echo off
setlocal enabledelayedexpansion
REM Development startup script for Todo Task Management Application (Windows)
REM Works on Windows 7, 8, 10, 11 and Windows Server

echo Starting Todo Task Management Application (Development Mode)
echo ==================================================================

REM Check prerequisites
echo Checking prerequisites...

REM Check if .NET is installed
where dotnet >nul 2>&1
if %errorlevel% neq 0 (
    REM Check common Windows installation paths
    if exist "%ProgramFiles%\dotnet\dotnet.exe" (
        set "PATH=%PATH%;%ProgramFiles%\dotnet"
    ) else if exist "%LocalAppData%\Microsoft\dotnet\dotnet.exe" (
        set "PATH=%PATH%;%LocalAppData%\Microsoft\dotnet"
    ) else (
        echo ERROR: .NET SDK is not installed or not found.
        echo.
        echo Please install .NET 8 SDK first:
        echo    Download from: https://dotnet.microsoft.com/download/dotnet/8.0
        echo.
        echo If already installed, add it to your PATH or restart your terminal.
        pause
        exit /b 1
    )
)

REM Verify .NET SDK is installed (not just runtime)
dotnet --list-sdks >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: .NET SDK is not installed (only runtime found).
    echo    Download .NET 8 SDK from: https://dotnet.microsoft.com/download/dotnet/8.0
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed. Please install Node.js first.
    echo    Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo Prerequisites check passed

REM Check if Ollama is available (optional for AI features)
echo.
echo 🤖 Checking AI Assistant availability...
ollama --version >nul 2>&1
if %errorlevel% equ 0 (
    ollama list | findstr "llama3.2:latest" >nul 2>&1
    if !errorlevel! equ 0 (
        echo ✅ Ollama + llama3.2 model found - AI Assistant will be enabled
        set EnableAI=true
    ) else (
        echo ⚠️  Ollama found but llama3.2 model missing
        echo    Run 'ollama run llama3.2' to enable AI features
        echo    Continuing without AI...
        set EnableAI=false
    )
) else (
    echo ℹ️  Ollama not found - AI Assistant disabled
    echo    Install from https://ollama.com/ and run 'ollama run llama3.2' to enable AI
    set EnableAI=false
)

REM Create data directory for SQLite
if not exist data mkdir data

REM Start backend
echo.
echo Starting .NET Core backend...
cd backend
start /B cmd /c "set EnableAI=%EnableAI%&& dotnet run --urls=http://localhost:5001"

REM Wait for backend to start
echo Waiting for backend to start...
timeout /t 5 /nobreak >nul

REM Start frontend
echo.
echo Starting React frontend...
cd ..\frontend
call npm install --silent
start /B npm run dev

echo.
echo Application is running!
echo ================================
echo    Frontend:          http://localhost:5173
echo    Backend API:       http://localhost:5001
echo    API Documentation: http://localhost:5001/swagger
echo    Health Check:      http://localhost:5001/api/health
echo.
echo Tips:
echo    - The frontend will hot-reload when you make changes
echo    - The backend API includes Swagger documentation
echo    - SQLite database is stored in ./data/ezratask.db
echo.
echo Press Ctrl+C in each window to stop services
pause
