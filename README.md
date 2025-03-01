# 🧩 Globetrotter - The Ultimate Travel Guessing Game

A full-stack web application where users get cryptic clues about famous places around the world and must guess which destination they refer to.

## 🔹 Features

- 🎮 Interactive quiz with cryptic clues about world destinations
- 🎉 Immediate feedback with fun facts after each answer
- 📊 Score tracking system
- 👥 Challenge friends feature with shareable links
- 👤 User profile and leaderboard

## 🔹 Tech Stack

- 🖥️ **Frontend**: React
- 🛠️ **Backend**: Node.js with Express
- 💾 **Database**: PostgreSQL
- 🎨 **Styling**: CSS with modern UI design

## 🔹 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14+)
- npm or yarn
- PostgreSQL

## 🔹 Setup Instructions

### 1. Install Node.js and npm
Download and install Node.js from [nodejs.org](https://nodejs.org/)

### 2. Install PostgreSQL
Download and install PostgreSQL from [postgresql.org](https://www.postgresql.org/download/)

### 3. Configure PostgreSQL
- Create a database named `globetrotter`
- Update the database connection details in `backend/.env` if needed

### 4. Run the setup script
- Run `setup.bat` to install dependencies and set up the database
- Alternatively, follow the manual setup instructions below

### 5. Manual Setup

#### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Set up database
cd ../scripts
npm install pg dotenv
node setup-db.js
node seed.js
```

#### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
```

## 🔹 Running the Application

### Start the Backend Server
```bash
cd backend
npm start
```

### Start the Frontend Server
```bash
cd frontend
npm start
```

Access the application at [http://localhost:3000](http://localhost:3000)

## 🔹 Project Structure

- `/backend` - Node.js/Express server
  - `/routes` - API endpoints
  - `/db` - Database connection and migrations
- `/frontend` - React application
  - `/src/components` - Reusable UI components
  - `/src/pages` - Application pages
  - `/src/context` - React context for state management
  - `/src/services` - API service functions
  - `/src/styles` - CSS stylesheets
- `/scripts` - Helper scripts for database setup and seeding
