# Globetrotter Backend - Vercel Deployment Guide

This guide explains how to deploy the Globetrotter backend to Vercel.

## Prerequisites

- A [Vercel](https://vercel.com/) account
- [Vercel CLI](https://vercel.com/docs/cli) installed (optional, for local testing)
- A PostgreSQL database (you can use [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres), [Neon](https://neon.tech/), [Supabase](https://supabase.com/), or any other PostgreSQL provider)

## Configuration Files

The repository includes the following configuration files for Vercel deployment:

- `vercel.json`: Configures the build settings and routing for the Vercel deployment
- `env.example`: Example environment variables needed for the application
- `scripts/migrate.js`: Script to create database tables
- `scripts/seed.js`: Script to populate the database with initial data
- `scripts/deploy.js`: Script that runs both migration and seeding during deployment

## Environment Variables

You'll need to set the following environment variables in your Vercel project:

- `PORT`: The port your application will run on (Vercel will override this)
- `DB_USER`: PostgreSQL database username
- `DB_PASSWORD`: PostgreSQL database password
- `DB_HOST`: PostgreSQL database host
- `DB_PORT`: PostgreSQL database port (usually 5432)
- `DB_DATABASE`: PostgreSQL database name
- `DB_SSL`: Set to "true" if your database requires SSL connection (most cloud databases do)
- `NODE_ENV`: Set to "production" for deployment

## Deployment Steps

### Using Vercel Dashboard

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Log in to your Vercel account
3. Click "New Project"
4. Import your repository
5. Configure the project:
   - Set the root directory to the backend folder
   - The build command will automatically be set to `npm run vercel-build` (which runs the database migration and seeding)
   - Set the output directory to `.`
6. Add the environment variables listed above
7. Click "Deploy"

### Using Vercel CLI

1. Install Vercel CLI:
   ```
   npm install -g vercel
   ```

2. Login to Vercel:
   ```
   vercel login
   ```

3. Navigate to the backend directory:
   ```
   cd backend
   ```

4. Deploy to Vercel:
   ```
   vercel
   ```

5. Follow the prompts to configure your project

## Database Migration and Seeding

The deployment process automatically handles database migration and seeding:

1. During the build phase, Vercel will run `npm run vercel-build`
2. This command executes `scripts/deploy.js`
3. The deploy script runs:
   - `scripts/migrate.js` to create the database tables if they don't exist
   - `scripts/seed.js` to populate the database with initial data (only if the database is empty)

If you need to run these scripts manually:

```bash
# Run migrations
npm run migrate

# Run seed
npm run seed

# Run both (deploy)
npm run deploy
```

## Connecting Frontend to Deployed Backend

Update your frontend configuration to point to your Vercel-deployed backend:

```javascript
// In frontend/src/config.js
const config = {
  production: {
    apiUrl: 'https://your-vercel-app-name.vercel.app/api',
  },
};
```

## Troubleshooting

- **CORS Issues**: If you encounter CORS issues, make sure your backend CORS configuration allows requests from your frontend domain
- **Database Connection Issues**: Verify your database connection string and credentials
- **Deployment Failures**: Check the Vercel deployment logs for error messages
- **Migration/Seed Errors**: If you encounter errors during migration or seeding, check the Vercel build logs

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Serverless Functions](https://vercel.com/docs/serverless-functions/introduction)
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)
