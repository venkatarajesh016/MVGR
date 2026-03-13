# Install Authentication Packages

## Quick Fix - Run This

### Option 1: Double-click this file (Easiest)
```
install-auth-packages.bat
```

### Option 2: Manual Installation

Open a **NEW PowerShell or Command Prompt window** (not in VS Code) and run:

#### Frontend Package
```bash
cd C:\Users\hp\OneDrive\Desktop\hackthon\frontend
npm install react-router-dom
```

#### Backend Packages
```bash
cd C:\Users\hp\OneDrive\Desktop\hackthon\backend
npm install bcryptjs jsonwebtoken
```

## After Installation

### 1. Add JWT Secret
Open `backend/.env` and add this line:
```env
JWT_SECRET=campus-navigator-secret-key-2024
```

### 2. Restart Backend
Stop the backend (Ctrl+C) and start again:
```bash
cd backend
npm start
```

### 3. Refresh Browser
Just refresh your browser (F5) or restart frontend:
```bash
cd frontend
npm run dev
```

## Expected Result

After installation and refresh:
- ✅ No more "Failed to resolve import" error
- ✅ You'll see the Login page
- ✅ Can click "Sign up" to create account
- ✅ Can login and access campus map

## Packages Being Installed

### Frontend
- **react-router-dom** (v6.x) - For routing (Login, Signup, Home pages)

### Backend
- **bcryptjs** - For password hashing
- **jsonwebtoken** - For JWT token generation

## Troubleshooting

### If npm install fails:
Try with administrator privileges or use:
```bash
npm install --legacy-peer-deps react-router-dom
```

### If PowerShell asks for confirmation:
Type `A` and press Enter (Yes to All)

### If packages still not found:
1. Delete `node_modules` folder
2. Delete `package-lock.json`
3. Run `npm install` again

## Quick Test After Installation

1. Open browser: `http://localhost:3000`
2. Should see: Login page (not error)
3. Click "Sign up"
4. Fill form and create account
5. You're in!

---

**Status**: Waiting for package installation
**Time needed**: 1-2 minutes
**Action**: Run install command above
