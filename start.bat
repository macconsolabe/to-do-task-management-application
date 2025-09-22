@echo off
REM Ultra-simple eTask launcher for Windows
echo Starting eTask...

REM Create data directory
if not exist data mkdir data

REM Start services in new windows
cd backend
start "eTask API" dotnet run --urls=http://localhost:5001
cd ..\frontend
start "eTask Frontend" npm run dev
cd ..

echo.
echo eTask is starting in 2 new windows!
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:5001
echo.
echo Close the windows to stop the services.
pause
