# Fix "Failed to resolve import react-router-dom" Error

## The Problem
The error occurs because `react-router-dom` package is not installed in your frontend.

## The Solution (Choose One)

### ⚡ FASTEST: Double-Click This File
```
install-auth-packages.bat
```
This will install everything automatically!

### 🔧 MANUAL: Run These Commands

Open a **NEW terminal window** (outside VS Code) and run:

```bash
cd C:\Users\hp\OneDrive\Desktop\hackthon\frontend
npm install react-router-dom
```

Wait for it to finish, then:

```bash
cd ..\backend
npm install bcryptjs jsonwebtoken
```

## After Installation

### ✅ Step 1: Check Installation
You should see output like:
```
added 10 packages in 15s
```

### ✅ Step 2: Restart Frontend
The frontend should auto-reload. If not, refresh browser (F5).

### ✅ Step 3: Restart Backend
Stop backend (Ctrl+C in its terminal) and start again:
```bash
cd backend
npm start
```

## What You'll See

### Before Fix:
```
❌ [plugin:vite:import-analysis] Failed to resolve import "react-router-dom"
```

### After Fix:
```
✅ Beautiful login page with blue gradient background
✅ Email and password fields
✅ "Sign up" link at bottom
```

## Test It Works

1. **Refresh browser** (F5)
2. **You should see**: Login page (not error)
3. **Click "Sign up"**
4. **Fill the form**:
   - Name: Test User
   - Student ID: CS21B1001
   - Email: test@college.edu
   - Password: test123
   - Confirm: test123
5. **Click "Create Account"**
6. **You're in!** Campus map appears
7. **Click hamburger menu** (☰) - See your profile!

## Why This Happened

The authentication system needs 3 packages:
- `react-router-dom` - For page routing (Login → Signup → Home)
- `bcryptjs` - For password security
- `jsonwebtoken` - For login tokens

These weren't installed yet, so we need to add them.

## Troubleshooting

### PowerShell asks "Yes/No"?
Type `A` and press Enter (Yes to All)

### Still getting error?
1. Close VS Code terminal
2. Open NEW PowerShell window
3. Run commands again
4. Restart VS Code

### npm command not found?
Make sure Node.js is installed:
```bash
node --version
npm --version
```

### Packages install but error persists?
1. Stop frontend (Ctrl+C)
2. Delete `frontend/node_modules`
3. Run `npm install` in frontend folder
4. Start frontend again: `npm run dev`

## Quick Reference

### Package Locations
```
frontend/
  ├── node_modules/
  │   └── react-router-dom/  ← Should exist after install
  └── package.json           ← Will show react-router-dom

backend/
  ├── node_modules/
  │   ├── bcryptjs/          ← Should exist after install
  │   └── jsonwebtoken/      ← Should exist after install
  └── package.json           ← Will show both packages
```

### Verify Installation
```bash
# Check frontend
cd frontend
npm list react-router-dom

# Check backend
cd backend
npm list bcryptjs jsonwebtoken
```

## Summary

1. ✅ JWT_SECRET already added to backend/.env
2. ⏳ Need to install 3 packages
3. ⏳ Need to restart servers
4. ✅ Then login page will work!

---

**Current Status**: Waiting for package installation
**Time to fix**: 2 minutes
**Action**: Run install command or double-click batch file
