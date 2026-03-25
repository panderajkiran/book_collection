# 🚀 Vercel Deployment Checklist & Instructions

## Before Deployment - Local Testing

- [x] Code runs locally with `npm start`
- [x] All features tested locally (CRUD operations)
- [x] Environment variables in `.env` file
- [x] `.env` file is in `.gitignore` ✅
- [x] No hardcoded passwords in code ✅
- [x] PORT configured to use `process.env.PORT` ✅
- [x] Updated vercel.json configuration ✅

## Step-by-Step Deployment Instructions

### 1. Push Latest Changes to GitHub

```bash
# Navigate to your project directory
cd c:\Users\sakshi pandey\Desktop\udemy_WebDevcourse\sec34_capstone

# Add all changes
git add .

# Commit changes
git commit -m "Prepare for Vercel deployment: Add vercel.json and environment config"

# Push to GitHub (make sure to use the correct branch)
git push origin master
```

### 2. Create Vercel Account (if you don't have one)

1. Go to https://vercel.com
2. Click "Sign Up"
3. Sign up with GitHub (recommended for automatic deployments)

### 3. Import Project to Vercel

1. Go to https://vercel.com/new
2. Click "Import Project"
3. Select "Import Git Repository"
4. Paste your GitHub URL: `https://github.com/panderajkiran/book_collection`
5. Click "Import"
6. Select the "master" branch (since that's your current branch)
7. Click "Continue"

### 4. Configure Project Settings (Optional but Recommended)

- **Project Name:** book-collection (default is fine)
- **Framework Preset:** Other
- Click "Deploy" if you want to proceed with defaults, OR continue to the next step

### 5. Configure Environment Variables

**This is CRITICAL for database connection!**

After creating the project on Vercel, go to:

**Project Settings → Environment Variables**

Add the following variables (get actual values from your setup):

```
DB_USER = postgres
DB_PASSWORD = 1234
DB_HOST = your_server_ip_or_domain
DB_PORT = 5432
DB_NAME = sec34_capstone
NODE_ENV = production
```

**Important Notes:**
- `DB_HOST`: If your PostgreSQL is on your local machine, get your computer's public IP (https://whatismyipaddress.com)
- Your firewall must allow port 5432 from Vercel's servers
- OR use a cloud-hosted PostgreSQL database (see options below)

### 6. Handle Database Options

#### Option A: Keep Local PostgreSQL (Simple but requires firewall setup)
- Your PostgreSQL must be accessible from the internet
- Add your public IP to your router's port forwarding
- Forward port 5432 to your machine's internal IP

#### Option B: Recommended - Use Cloud PostgreSQL

**Neon (Free, easiest setup):**
1. Go to https://neon.tech
2. Sign up and create a project
3. Create a database
4. Get the connection string
5. Extract values:
   - `DB_USER`: from connection string
   - `DB_PASSWORD`: from connection string
   - `DB_HOST`: postgres.xxx.neon.tech
   - `DB_PORT`: 5432
   - `DB_NAME`: database name

**Render (Also free):**
1. Go to https://render.com
2. Create new PostgreSQL database
3. Follow similarsteps

**Supabase (Free PostgreSQL + UI):**
1. Go to https://supabase.com
2. Create project and database
3. Get credentials from settings

### 7. Deploy Your Project

After setting environment variables:

1. Go to **Deployments** tab
2. Click the dots next to the latest deployment
3. Select "Promote to Production"

**OR** push a new commit to trigger automatic deployment:

```bash
git commit --allow-empty -m "Trigger Vercel deployment"
git push origin master
```

### 8. Verify Deployment Success

1. Go to your Vercel project dashboard
2. Wait for deployment to complete (shows green checkmark)
3. Click the deployment URL (looks like: `book-collection-xxx.vercel.app`)
4. Test the application:
   - ✅ View books
   - ✅ Add new book
   - ✅ Edit book
   - ✅ Delete book
   - ✅ Sort functionality
   - ✅ Styling loads correctly

### 9. Set Up Continuous Deployment

By default, every push to `master` will deploy automatically! This means:

```bash
# Any of these commands will trigger a new Vercel deployment:
git push origin master    # Automatic deployment
```

You can see all deployments in your Vercel dashboard.

---

## Troubleshooting Common Issues

### ❌ Build Fails with "Cannot find module"
**Solution:**
1. Check if all dependencies are in `package.json`
2. Run `npm install` locally first
3. Commit updated `package-lock.json`

### ❌ Deployment Succeeds but App Shows Error
**Check Build Logs:**
1. Vercel Dashboard → Deployments → Select failed deployment
2. Scroll down to see build logs and error messages

### ❌ Database Connection Fails
**Verify:**
1. Environment variables are set in Vercel dashboard
2. Database is running and accessible
3. Credentials are correct (test locally first)
4. If using local PostgreSQL, check firewall/port forwarding

**Fix:**
```bash
# Test database connection locally
node init-db.js
```

### ❌ Static Files (CSS/JS) Not Loading
**Check:** vercel.json routes are correct (already done ✅)

### ❌ "Port Already in Use"
- Normal on Vercel, the platform assigns the correct port
- Your code uses `process.env.PORT` (already fixed ✅)

---

## Advanced Deployment Options

### Use CLI for Manual Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project directory
cd your-project
vercel --prod
```

### Domain Configuration
After successful deployment:
1. Vercel Dashboard → Settings
2. Add custom domain
3. Update DNS records as instructed
4. Wait for SSL certificate (usually instant)

### Preview Deployments
- Vercel automatically creates a preview URL for every push
- Main branch deployments go to production
- Great for testing before going live!

---

## Post-Deployment Monitoring

**Monitor Logs:**
- Vercel Dashboard → Deployments → Select deployment → Functions/Logs
- Check for any runtime errors

**Performance Insights:**
- Vercel Dashboard → Analytics
- Monitor bandwidth and function execution time

**Auto-Scaling:**
- Vercel automatically scales based on traffic
- Your app can handle increased load

---

## Useful Links

- Vercel Docs: https://vercel.com/docs
- Node.js on Vercel: https://vercel.com/docs/runtimes/node-js
- PostgreSQL Hosting Options:
  - Neon: https://neon.tech
  - Render: https://render.com
  - Supabase: https://supabase.com
  - Railway: https://railway.app

---

## Summary

✅ **Changes Made:**
- Created `vercel.json` configuration
- Updated `index.js` to use `process.env.PORT`
- Created this deployment guide

✅ **Ready to Deploy!**
Next Steps:
1. Git push changes
2. Connect GitHub to Vercel
3. Add environment variables
4. Deploy!

**Your app will be live in minutes!** 🎉

