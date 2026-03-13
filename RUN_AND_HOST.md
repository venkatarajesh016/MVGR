# Run and Host Campus Navigator - Complete Guide

## Step 1: Install Packages (5 minutes)

### Open Command Prompt (NOT PowerShell)
Press `Win + R`, type `cmd`, press Enter

### Install Frontend Package
```bash
cd C:\Users\hp\OneDrive\Desktop\hackthon\frontend
npm install react-router-dom
```

Wait for completion, then:

### Install Backend Packages
```bash
cd C:\Users\hp\OneDrive\Desktop\hackthon\backend
npm install bcryptjs jsonwebtoken
```

## Step 2: Start Backend Server

### In Command Prompt:
```bash
cd C:\Users\hp\OneDrive\Desktop\hackthon\backend
npm start
```

You should see:
```
Server running on port 5000
MongoDB connected successfully
```

**Keep this terminal open!**

## Step 3: Start Frontend Server

### Open a NEW Command Prompt window
Press `Win + R`, type `cmd`, press Enter

```bash
cd C:\Users\hp\OneDrive\Desktop\hackthon\frontend
npm run dev
```

You should see:
```
  VITE v4.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.x.x:3000/
```

**Keep this terminal open too!**

## Step 4: Access the Site

### Local Access (Your Computer)
Open browser and go to:
```
http://localhost:3000
```

### Network Access (Other Devices on Same WiFi)
Find your IP address:
```bash
ipconfig
```

Look for "IPv4 Address" (e.g., 192.168.1.100)

Then on other devices, go to:
```
http://192.168.1.100:3000
```

## Step 5: Test the Application

### 1. Login Page
- You'll see a beautiful blue gradient login page
- Email and password fields
- "Sign up" link at bottom

### 2. Create Account
- Click "Sign up"
- Fill in the form:
  - Name: Your Name
  - Student ID: CS21B1001
  - Email: test@college.edu
  - College: MVGR College of Engineering
  - Year: 3rd Year, CSE
  - Phone: +91 98765 43210
  - Password: test123
  - Confirm Password: test123
  - Check "I agree to terms"
- Click "Create Account"

### 3. Explore Campus Map
- You'll be redirected to the campus map
- Search for buildings (e.g., "Auditorium")
- Click "Navigate" to see routes
- Click "View Route Images" to see waypoint photos

### 4. Check Profile
- Click hamburger menu (☰) in top-left
- See your profile with all details
- Try navigation menu items
- Click "Logout" to test logout

## Hosting Options

### Option 1: Local Network (Free, Immediate)
**What it is**: Access from any device on your WiFi

**Steps**:
1. Both servers running (backend + frontend)
2. Find your IP: `ipconfig` → IPv4 Address
3. Share URL: `http://YOUR_IP:3000`
4. Anyone on same WiFi can access

**Pros**:
- ✅ Free
- ✅ Instant
- ✅ No setup needed

**Cons**:
- ❌ Only works on same WiFi
- ❌ Computer must stay on

### Option 2: Vercel (Free, Public)
**What it is**: Free hosting for frontend

**Steps**:
1. Create account at https://vercel.com
2. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
3. Deploy frontend:
   ```bash
   cd frontend
   vercel
   ```
4. Follow prompts
5. Get public URL (e.g., `your-app.vercel.app`)

**Backend**: Deploy to Render.com (free tier)

**Pros**:
- ✅ Free
- ✅ Public URL
- ✅ HTTPS
- ✅ Fast

**Cons**:
- ❌ Requires account
- ❌ Backend needs separate hosting

### Option 3: Netlify (Free, Public)
**What it is**: Free hosting for static sites

**Steps**:
1. Build frontend:
   ```bash
   cd frontend
   npm run build
   ```
2. Create account at https://netlify.com
3. Drag `dist` folder to Netlify
4. Get public URL

**Backend**: Deploy to Railway.app (free tier)

### Option 4: Render (Free, Full Stack)
**What it is**: Free hosting for both frontend and backend

**Steps**:
1. Create account at https://render.com
2. Connect GitHub repository
3. Create Web Service for backend
4. Create Static Site for frontend
5. Get public URLs

**Pros**:
- ✅ Free
- ✅ Both frontend and backend
- ✅ Auto-deploy from GitHub

**Cons**:
- ❌ Slower (free tier)
- ❌ Requires GitHub

### Option 5: Heroku (Paid, Professional)
**What it is**: Professional hosting platform

**Cost**: ~$7/month per service

**Steps**:
1. Create account at https://heroku.com
2. Install Heroku CLI
3. Deploy backend and frontend
4. Get public URLs

## Quick Deployment Guide (Vercel + Render)

### Deploy Frontend to Vercel (5 minutes)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   cd frontend
   vercel
   ```

4. **Follow prompts**:
   - Set up and deploy? Y
   - Which scope? (your account)
   - Link to existing project? N
   - Project name? campus-navigator
   - Directory? ./
   - Override settings? N

5. **Get URL**: `https://campus-navigator-xxx.vercel.app`

### Deploy Backend to Render (5 minutes)

1. **Create account**: https://render.com

2. **New Web Service**:
   - Connect GitHub (or upload code)
   - Name: campus-navigator-api
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Add Environment Variables**:
   - MONGO_URI: (your MongoDB connection)
   - JWT_SECRET: campus-navigator-secret-key-2024
   - PORT: 5000

4. **Deploy**: Click "Create Web Service"

5. **Get URL**: `https://campus-navigator-api.onrender.com`

6. **Update Frontend**: Change API URL in frontend to Render URL

## Environment Variables for Production

### Backend (.env)
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your-super-secret-jwt-key
GRAPHHOPPER_API_KEY=your_key
MAPBOX_ACCESS_TOKEN=your_token
NODE_ENV=production
```

### Frontend (Update API URL)
In `frontend/src/services/api.js`:
```javascript
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-url.com/api'
  : '/api';
```

## Troubleshooting

### Backend won't start
- Check MongoDB connection
- Verify all packages installed
- Check port 5000 is free

### Frontend won't start
- Check react-router-dom installed
- Verify backend is running
- Check port 3000 is free

### Can't access from other devices
- Check firewall settings
- Verify both devices on same WiFi
- Use correct IP address

### Login doesn't work
- Check backend is running
- Verify MongoDB connected
- Check browser console for errors

## Production Checklist

Before deploying to production:

- [ ] Change JWT_SECRET to strong random string
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS
- [ ] Set up proper CORS
- [ ] Add rate limiting
- [ ] Set up monitoring
- [ ] Configure backups
- [ ] Add error logging
- [ ] Test on mobile devices
- [ ] Optimize images
- [ ] Enable compression
- [ ] Set up CDN (optional)

## Current Status

✅ Backend configured
✅ Frontend configured
✅ JWT_SECRET added
✅ MongoDB connected
⏳ Packages need installation
⏳ Servers need to start

## Summary

**Local Development**:
1. Install packages (cmd: npm install)
2. Start backend (cmd: npm start)
3. Start frontend (cmd: npm run dev)
4. Access: http://localhost:3000

**Local Network**:
1. Same as above
2. Find IP: ipconfig
3. Share: http://YOUR_IP:3000

**Public Hosting**:
1. Frontend: Vercel (free)
2. Backend: Render (free)
3. Total time: 10 minutes
4. Get public URLs

---

**Ready to start?** Open Command Prompt and run the installation commands above!
