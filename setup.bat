@echo off
echo Setting up Globetrotter project...

echo Installing backend dependencies...
cd backend
npm install

echo Setting up database...
cd ../scripts
npm install pg dotenv
node setup-db.js
node seed.js

echo Installing frontend dependencies...
cd ../frontend
npm install

echo Setup complete!
echo.
echo To run the backend server:
echo cd backend
echo npm start
echo.
echo To run the frontend server:
echo cd frontend
echo npm start
echo.
echo Access the application at http://localhost:3000
pause
