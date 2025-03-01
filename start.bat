@echo off
echo Starting Globetrotter application...

echo Starting backend server...
start cmd /k "cd backend && npm start"

echo Starting frontend server...
start cmd /k "cd frontend && npm start"

echo Servers started!
echo Backend running at http://localhost:5000
echo Frontend running at http://localhost:3000
echo.
echo Press any key to stop all servers...
pause
taskkill /F /FI "WINDOWTITLE eq *npm*"
