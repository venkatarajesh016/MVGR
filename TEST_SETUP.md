# Test Setup - Quick Verification

## Step 1: Test Backend

Open terminal:
```bash
cd backend
node server.js
```

You should see:
```
Server running on port 5000
MongoDB connected successfully
```

## Step 2: Test Backend API

Open another terminal:
```bash
curl http://localhost:5000/api/health
```

Should return:
```json
{"status":"ok"}
```

## Step 3: Test Frontend Build

```bash
cd frontend
npm run dev
```

You should see:
```
VITE v5.x.x ready in XXX ms
➜  Local:   http://localhost:3000/
```

## Step 4: Open Browser

Go to: `http://localhost:3000`

## What You Should See

**If everything works:**
- Auth page with blue gradient background
- "Campus Navigator" logo
- Sign In / Sign Up tabs

**If white screen:**
1. Press F12 to open DevTools
2. Go to Console tab
3. Look for red errors
4. Copy the error message

## Common Errors & Quick Fixes

### Error: "Failed to fetch"
**Fix:** Backend not running
```bash
cd backend
node server.js
```

### Error: "Cannot find module 'react-router-dom'"
**Fix:** Package not installed
```bash
cd frontend
npm install react-router-dom
```

### Error: "Unexpected token"
**Fix:** Syntax error in code
- Check the file mentioned in error
- Look for missing brackets or quotes

### No errors but white screen
**Fix:** Try this test:

Replace `frontend/src/main.jsx` with:
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root')).render(
  <div style={{
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #3b82f6, #10b981)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '24px',
    fontWeight: 'bold'
  }}>
    ✅ React is Working!
  </div>
);
```

If you see "React is Working!", the issue is in App.jsx or its dependencies.

## Checklist

- [ ] Backend running on port 5000
- [ ] MongoDB connected
- [ ] Frontend running on port 3000
- [ ] No console errors
- [ ] Can access http://localhost:3000
- [ ] Auth page loads

## If All Else Fails

1. **Stop everything** (Ctrl+C in all terminals)
2. **Clean install:**
```bash
cd frontend
rm -rf node_modules .vite
npm install

cd ../backend
rm -rf node_modules
npm install
```
3. **Restart:**
```bash
# Terminal 1
cd backend
node server.js

# Terminal 2
cd frontend
npm run dev
```

## Need Help?

Check these files:
- `WHITE_SCREEN_DEBUG.md` - Detailed debugging
- `TROUBLESHOOTING.md` - Common issues
- Browser console (F12) - Error messages

---

**Most important:** Check browser console for errors!
