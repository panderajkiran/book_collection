# Vercel Deployment Guide

This project is configured for deployment on Vercel.

## Prerequisites
- GitHub repository pushed (✅ Already done)
- Vercel account (https://vercel.com)

## Deployment Steps

### 1. Connect GitHub Repository to Vercel

1. Go to https://vercel.com/new
2. Click "Import Project"
3. Select "Import Git Repository"
4. Select your `book_collection` repository
5. Click "Import"

### 2. Configure Environment Variables

In the Vercel dashboard, add these environment variables under **Settings > Environment Variables**:

```
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=your_database_host
DB_PORT=5432
DB_NAME=book_notes_db
NODE_ENV=production
PORT=3000
```

**Important:** Replace these values with your actual PostgreSQL credentials.

### 3. Database Setup

You have two options for the database:

#### Option A: Use Your Existing PostgreSQL (Recommended for now)
- Ensure your PostgreSQL server is accessible from the internet
- Make sure the database is running and accessible
- Update DB_HOST in environment variables to your server's public IP or domain

#### Option B: Migrate to PostgreSQL Cloud Service (Recommended for production)
Popular options:
- **Render** (https://render.com) - Free tier available
- **Neon** (https://neon.tech) - Free PostgreSQL hosting
- **Supabase** (https://supabase.com) - PostgreSQL + extras
- **Railway** (https://railway.app)

Steps:
1. Create account on one of the services above
2. Create a PostgreSQL database
3. Get the connection string
4. Extract credentials and update Vercel environment variables
5. Run the init script or use the new database directly

### 4. Deploy

#### Automatic Deployment (Recommended)
- Every push to `main` branch will automatically deploy to Vercel
- Go to your Vercel project dashboard to monitor builds

#### Manual Deployment
```bash
npm i -g vercel
vercel --prod
```

### 5. Verify Deployment

After deployment:
1. Visit your Vercel URL (will be something like `https://book-collection-xxx.vercel.app`)
2. Test all functionality:
   - View books
   - Add new book
   - Edit book
   - Delete book
   - Sort books

## Troubleshooting

### Build Fails
- Check Vercel build logs: Project → Deployments → Select deployment → Logs
- Ensure all dependencies are in `package.json`
- Check for hardcoded paths or OS-specific code

### Database Connection Issues
- Verify environment variables are set correctly in Vercel dashboard
- Ensure PostgreSQL server is accessible from Vercel's servers
- Check database credentials
- Run `init-db.js` locally to test connection first

### Application Runs but Shows Errors
- Check Vercel Logs (not build logs, but runtime logs)
- Look for database connection errors
- Verify views and public files are being served correctly

## Performance Tips

1. **Enable Caching:**
   - Static files are automatically cached
   - Add cache headers for static assets

2. **Database Optimization:**
   - Use connection pooling (already configured in `database.js`)
   - Consider read replicas for high traffic

3. **Monitor Usage:**
   - Vercel provides 100 GB bandwidth free per month
   - Watch serverless function execution time

## Rollback

If you need to roll back to a previous deployment:
1. Go to Vercel dashboard
2. Select the project
3. Go to Deployments
4. Click the three dots next to a previous deployment
5. Select "Promote to Production"

## Support

- Vercel Docs: https://vercel.com/docs
- PostgreSQL Connection Help: Check your database provider's documentation
- Express.js Docs: https://expressjs.com

---

**Your deployment URL will appear after the first successful deployment!**
