# White Screen Debug Guide

## Quick Fixes to Try

### 1. Check Browser Console (MOST IMPORTANT)

1. Open browser DevTools: Press `F12`
2. Go to **Console** tab
3. Look for red error messages
4. Take a screenshot or copy the error

**Common errors and fixes:**

#### "Failed to fetch" or Network Error
- Backend is not running
- Start backend: `cd backend && node server.js`

#### "Cannot read property of undefined"
- Check the error stack trace
- Usually in AuthContext or a component

#### Import/Module errors
- Clear node_modules and reinstall:
```bash
cd frontend
rm -rf node_modules
npm install
```

### 2. Test with Simple App

Replace `frontend/src/main.jsx` temporarily:

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function TestApp() {
  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-gray-900">
          ✅ React is Working!
        </h1>
        <p className="mt-4 text-gray-600">
          If you see this, the problem is in App.jsx or its dependencies.
        </p>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TestApp />
  </React.StrictMode>
);
```

**If this works:** The issue is in App.jsx, AuthContext, or one of the pages.
**If this doesn't work:** The issue is with Vite, React, or build setup.

### 3. Check Backend is Running

```bash
curl http://localhost:5000/api/health
```

Should return: `{"status":"ok"}`

If not, start backend:
```bash
cd backend
node server.js
```

### 4. Clear Everything

```bash
# Stop all servers (Ctrl+C)

# Frontend
cd frontend
rm -rf node_modules
rm -rf .vite
npm install
npm run dev

# Backend (new terminal)
cd backend
node server.js
```

### 5. Check Vite Config

Make sure `frontend/vite.config.js` has proxy:

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
});
```

## Step-by-Step Debugging

### Step 1: Check if Vite is Running

Terminal should show:
```
VITE v5.x.x ready in XXX ms
➜  Local:   http://localhost:3000/
```

If not, restart:
```bash
cd frontend
npm run dev
```

### Step 2: Check Browser Network Tab

1. Open DevTools (F12)
2. Go to **Network** tab
3. Refresh page
4. Look for failed requests (red)
5. Click on failed request to see details

### Step 3: Check Console for Errors

Look for these specific errors:

**"AuthContext is undefined"**
- AuthProvider not wrapping components
- Check App.jsx structure

**"Cannot read property 'user' of null"**
- Component trying to access user before it's loaded
- Add loading check

**"Failed to resolve import"**
- Package not installed
- Run `npm install` in frontend

**"Unexpected token"**
- Syntax error in a file
- Check the file mentioned in error

### Step 4: Test Each Component

Create a test file `frontend/src/test.jsx`:

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// Test 1: Basic React
function Test1() {
  return <div>Test 1: React works</div>;
}

// Test 2: Tailwind
function Test2() {
  return <div className="bg-blue-500 text-white p-4">Test 2: Tailwind works</div>;
}

// Test 3: Router
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function Test3() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Test 3: Router works</div>} />
      </Routes>
    </BrowserRouter>
  );
}

// Run tests
ReactDOM.createRoot(document.getElementById('root')).render(
  <Test3 />
);
```

Then update `main.jsx` to import from `test.jsx` instead of `App.jsx`.

## Common Issues & Solutions

### Issue: White screen, no errors

**Cause:** React is rendering but something is invisible

**Fix:**
1. Check if `index.html` has `<div id="root"></div>`
2. Check if CSS is loading
3. Add background color to body in `index.css`:
```css
body {
  background-color: #f0f0f0;
}
```

### Issue: "Cannot find module"

**Fix:**
```bash
cd frontend
npm install
```

### Issue: Backend not responding

**Fix:**
```bash
cd backend
npm install
node server.js
```

### Issue: CORS errors

**Fix:** Already configured in backend, but verify:
- Backend has `app.use(cors())`
- Frontend has proxy in vite.config.js

### Issue: MongoDB connection failed

**Fix:**
- Check internet connection
- Verify MONGO_URI in backend/.env
- Check MongoDB Atlas is accessible

## Emergency Rollback

If nothing works, restore to working state:

1. **Backup current code**
2. **Remove auth system temporarily:**

Replace `frontend/src/App.jsx`:
```jsx
import React from 'react';
import Home from './pages/Home';

function App() {
  return <Home />;
}

export default App;
```

3. **Remove auth imports from Home.jsx:**
- Remove `useAuth` import
- Remove auth-related state
- Use mock user data

4. **Test if map works**

5. **Then add auth back piece by piece**

## Get Detailed Error Info

Add this to `frontend/src/main.jsx`:

```jsx
window.addEventListener('error', (e) => {
  console.error('Global error:', e.error);
  document.body.innerHTML = `
    <div style="padding: 20px; background: #fee; color: #c00;">
      <h1>Error Detected</h1>
      <pre>${e.error.stack}</pre>
    </div>
  `;
});
```

## What to Check in Order

1. ✅ Browser console errors
2. ✅ Network tab for failed requests
3. ✅ Backend is running (port 5000)
4. ✅ Frontend is running (port 3000)
5. ✅ node_modules installed
6. ✅ No syntax errors
7. ✅ MongoDB connected
8. ✅ All imports are correct

## Still White Screen?

**Send me:**
1. Browser console errors (screenshot or text)
2. Network tab errors
3. Backend terminal output
4. Frontend terminal output

**Or try:**
1. Different browser
2. Incognito mode
3. Clear browser cache
4. Restart computer

## Quick Test Commands

```bash
# Test backend
curl http://localhost:5000/api/health

# Test if React is building
cd frontend
npm run build

# Test if packages are installed
npm list react react-dom react-router-dom

# Check for port conflicts
netstat -ano | findstr :3000
netstat -ano | findstr :5000
```

## Most Likely Causes

1. **Backend not running** (80% of cases)
2. **Missing package** (10% of cases)
3. **Syntax error** (5% of cases)
4. **Browser cache** (5% of cases)

---

**First step:** Open browser console (F12) and check for errors!
