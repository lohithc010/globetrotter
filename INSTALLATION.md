# 🧩 Globetrotter - Installation Guide

This guide provides step-by-step instructions for setting up and running the Globetrotter application.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14+) - [Download from nodejs.org](https://nodejs.org/)
- npm (comes with Node.js)
- PostgreSQL (v12+) - [Download from postgresql.org](https://www.postgresql.org/download/)

## Step 1: Clone or Download the Repository

If you received this as a zip file, extract it to a folder of your choice.

## Step 2: Set Up the Database

1. Open PostgreSQL command line tool (psql) or a GUI tool like pgAdmin
2. Create a new database named `globetrotter`:
   ```sql
   CREATE DATABASE globetrotter;
   ```
3. Run the SQL script in `scripts/create-db.sql` to create the necessary tables

Alternatively, you can run the following command if you have psql in your PATH:
```bash
psql -U postgres -f scripts/create-db.sql
```

## Step 3: Configure Environment Variables

1. Navigate to the `backend` folder
2. Open the `.env` file
3. Update the database connection details if necessary:
   ```
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_HOST=localhost
   DB_PORT=5432
   DB_DATABASE=globetrotter
   ```

## Step 4: Install Dependencies

### Backend Dependencies
```bash
cd backend
npm install
```

### Frontend Dependencies
```bash
cd frontend
npm install
```

## Step 5: Seed the Database

```bash
cd scripts
npm install pg dotenv
node seed.js
```

## Step 6: Start the Application

### Option 1: Using the start script
Run the `start.bat` file to start both servers simultaneously.

### Option 2: Starting servers manually

#### Start the Backend Server
```bash
cd backend
npm start
```

#### Start the Frontend Server
```bash
cd frontend
npm start
```

## Step 7: Access the Application

Open your browser and navigate to:
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:5000/health](http://localhost:5000/health) (health check endpoint)

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Verify the database connection details in the `.env` file
- Make sure the `globetrotter` database exists

### Port Conflicts
If you have other applications using ports 3000 or 5000:
- For the backend, change the PORT in the `.env` file
- For the frontend, you can start it with a different port:
  ```bash
  cd frontend
  npm start -- --port 3001
  ```

### Node.js or npm Issues
- Ensure you have the correct version of Node.js installed
- Try clearing the npm cache:
  ```bash
  npm cache clean --force
  ```
- Delete the `node_modules` folder and run `npm install` again
