# 🚀 Start Campus Navigator

## Easiest Way - Just Double-Click This File:

```
START_APP.bat
```

This will:
1. ✅ Install all required packages automatically
2. ✅ Start backend server (port 5000)
3. ✅ Start frontend server (port 3000)
4. ✅ Open browser automatically

## What You'll See

### Two Command Windows Will Open:

**Window 1: Backend Server**
```
Server running on port 5000
MongoDB connected successfully
```

**Window 2: Frontend Server**
```
VITE ready in xxx ms
➜ Local: http://localhost:3000/
```

### Browser Will Open Automatically
- Beautiful login page with blue gradient
- Email and password fields
- "Sign up" link

## First Time Setup

### 1. Create Account
- Click "Sign up"
- Fill in your details:
  - Name: Your Name
  - Student ID: CS21B1001
  - Email: test@college.edu
  - Password: test123
- Click "Create Account"

### 2. Explore
- You'll see the campus map
- Search for buildings
- Navigate between locations
- View route images
- Check your profile (hamburger menu ☰)

## Access from Other Devices

### Find Your IP Address:
1. Open Command Prompt
2. Type: `ipconfig`
3. Look for "IPv4 Address" (e.g., 192.168.1.100)

### Share This URL:
```
http://YOUR_IP_ADDRESS:3000
```

Anyone on the same WiFi can access it!

## Stop the Servers

Just close the two command windows that opened.

## Troubleshooting

### Batch file doesn't work?
Open Command Prompt manually:

**Terminal 1 (Backend)**:
```bash
cd C:\Users\hp\OneDrive\Desktop\hackthon\backend
npm install bcryptjs jsonwebtoken
npm start
```

**Terminal 2 (Frontend)**:
```bash
cd C:\Users\hp\OneDrive\Desktop\hackthon\frontend
npm install react-router-dom
npm run dev
```

### Port already in use?
Stop any running Node processes:
```bash
taskkill /F /IM node.exe
```

Then run START_APP.bat again.

### Browser doesn't open?
Manually go to: `http://localhost:3000`

## Features Available

✅ User Authentication (Login/Signup)
✅ Campus Map with Buildings & Landmarks
✅ Search Functionality
✅ Navigation with Routes
✅ Waypoint Images Gallery
✅ User Profile Sidebar
✅ Real-time Location
✅ Multiple Map Styles

## Quick Test Checklist

- [ ] Login page loads
- [ ] Can create account
- [ ] Can login
- [ ] Campus map displays
- [ ] Can search buildings
- [ ] Can navigate between locations
- [ ] Route images display
- [ ] Profile sidebar works
- [ ] Can logout

## URLs

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **API Health**: http://localhost:5000/api/health

## Default Test Account

After first signup, you can use:
- Email: test@college.edu
- Password: test123

---

**Ready?** Just double-click `START_APP.bat` and you're good to go! 🎉
