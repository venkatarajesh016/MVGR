# Troubleshooting Guide

## ✅ FIXED: react-router-dom not found

### Issue
```
Failed to resolve import "react-router-dom" from "src/App.jsx"
```

### Solution
The package was installed but Vite needs to restart to pick it up.

**Steps:**
1. Stop the frontend dev server (Ctrl+C)
2. Restart it:
```bash
cd frontend
npm run dev
```

The error should now be gone!

## Common Issues & Solutions

### 1. Backend Port Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**
```bash
# Windows
Get-Process | Where-Object {$_.ProcessName -eq "node"} | Stop-Process -Force

# Then restart
cd backend
node server.js
```

### 2. MongoDB Connection Failed

**Error:**
```
MongoDB connection error
```

**Solution:**
- Check your internet connection
- Verify MONGO_URI in `backend/.env`
- Make sure MongoDB Atlas is accessible

### 3. JWT Token Invalid

**Error:**
```
Token is not valid
```

**Solution:**
- Clear browser localStorage
- Sign in again
- Check JWT_SECRET in `backend/.env`

### 4. Can't Access Map Without Login

**This is correct behavior!**
- The app now requires authentication
- Go to `/auth` to sign in or sign up
- After login, you'll be redirected to the map

### 5. Profile Sidebar Not Opening

**Check:**
- Is the hamburger menu visible?
- Click the ☰ icon in top-left
- Check browser console for errors
- Make sure you're logged in

### 6. User Data Not Showing

**Solution:**
- Make sure you're logged in
- Check browser console
- Verify backend is running
- Check network tab for API calls

### 7. Vite Dev Server Errors

**Solution:**
```bash
cd frontend
rm -rf node_modules
npm install
npm run dev
```

### 8. Backend Routes Not Working

**Check:**
- Backend is running on port 5000
- Check `backend/server.js` has auth routes
- Verify MongoDB is connected
- Check backend console for errors

### 9. CORS Errors

**Solution:**
- Backend already has CORS enabled
- Make sure frontend proxy is configured in `vite.config.js`
- Restart both servers

### 10. Password Too Short Error

**This is validation!**
- Passwords must be at least 6 characters
- Use a longer password

## Quick Fixes

### Clear Everything and Start Fresh

```bash
# Stop all servers

# Backend
cd backend
rm -rf node_modules
npm install
node server.js

# Frontend (new terminal)
cd frontend
rm -rf node_modules
npm install
npm run dev
```

### Clear Browser Data

1. Open DevTools (F12)
2. Go to Application tab
3. Clear Storage → Clear site data
4. Refresh page

### Check if Services are Running

**Backend:**
```bash
curl http://localhost:5000/api/health
```
Should return: `{"status":"ok"}`

**Frontend:**
Open browser to `http://localhost:3000`

## Verification Checklist

After fixing issues, verify:

- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] Can access `/auth` page
- [ ] Can sign up new user
- [ ] Can sign in
- [ ] Redirected to map after login
- [ ] Hamburger menu opens sidebar
- [ ] Profile shows correct data
- [ ] Can logout
- [ ] Redirected to `/auth` after logout

## Still Having Issues?

1. **Check browser console** (F12 → Console tab)
2. **Check backend logs** (terminal where backend is running)
3. **Check network tab** (F12 → Network tab)
4. **Verify all files exist** (check file structure)
5. **Make sure all packages installed**:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

## Package Versions

If you have version conflicts:

**Backend:**
```json
{
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.2",
  "express": "^4.18.2",
  "mongoose": "^8.0.0"
}
```

**Frontend:**
```json
{
  "react": "^18.2.0",
  "react-router-dom": "^6.20.0",
  "framer-motion": "^10.16.0",
  "lucide-react": "^0.294.0"
}
```

## Environment Variables

Make sure `backend/.env` has:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here
GRAPHHOPPER_API_KEY=your_key
MAPBOX_ACCESS_TOKEN=your_token
```

## Success Indicators

You'll know everything is working when:

✅ Backend shows: "Server running on port 5000"
✅ Backend shows: "MongoDB connected successfully"
✅ Frontend shows: "VITE ready in XXX ms"
✅ Browser opens to auth page
✅ Can create account and login
✅ Profile sidebar works
✅ Map loads correctly

## Need More Help?

Check these files:
- `AUTH_SYSTEM_COMPLETE.md` - Full documentation
- `QUICK_START_AUTH.md` - Quick start guide
- Browser console - Error messages
- Backend terminal - Server logs

---

**Most Common Fix:** Just restart the dev servers!
