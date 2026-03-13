# 🚀 Authentication System - Quick Start

## ✅ What's Been Built

Complete authentication system with:
- Sign In / Sign Up pages
- 4 user roles: Admin, Teacher, Student, Guest
- JWT authentication
- Protected routes
- Role badges
- Profile integration
- Logout functionality

## 📦 Installation (2 minutes)

### Step 1: Install Backend Dependencies
```bash
cd backend
npm install
```

This installs `bcryptjs` and `jsonwebtoken`.

### Step 2: Install Frontend Dependencies
```bash
cd frontend
npm install
```

This installs `react-router-dom`.

## 🚀 Run the App

### Terminal 1: Start Backend
```bash
cd backend
npm start
```

Backend runs on `http://localhost:5000`

### Terminal 2: Start Frontend
```bash
cd frontend
npm run dev
```

Frontend runs on `http://localhost:3000`

## 🎯 Test It Out

1. **Open browser**: `http://localhost:3000`
2. **You'll see**: Auth page (redirected because not logged in)
3. **Click**: "Sign Up" tab
4. **Choose**: Student / Guest category
5. **Select**: Student role
6. **Fill form**:
   - Name: Test Student
   - Student ID: CS21B1001
   - College: MVGR College
   - Year: 3rd Year, Computer Science
   - Phone: +91 9876543210
   - Email: student@test.com
   - Password: test123
7. **Click**: "Create Account"
8. **Result**: Logged in and redirected to map!

## 🎨 UI Flow

### Sign Up Process

```
1. Choose Category
   ┌─────────────────┐  ┌─────────────────┐
   │ Admin / Teacher │  │ Student / Guest │
   │   🛡️ 🎓         │  │    👤 👥        │
   └─────────────────┘  └─────────────────┘

2. Select Role
   [Admin] [Teacher]  or  [Student] [Guest]

3. Fill Form
   (Role-specific fields appear)

4. Create Account
   → Logged in → Redirected to map
```

### Sign In Process

```
1. Enter email + password
2. Click "Sign In"
3. → Logged in → Redirected to map
```

## 👥 Test All Roles

### Student
```
Email: student@test.com
Password: test123
Fields: name, studentId, college, year, phone
```

### Guest
```
Email: guest@test.com
Password: test123
Fields: username only
```

### Admin
```
Email: admin@test.com
Password: test123
Fields: name, employeeId, college, department, phone
```

### Teacher
```
Email: teacher@test.com
Password: test123
Fields: name, employeeId, college, department, subject, phone
```

## 🎯 Features to Test

### 1. Sign Up
- ✅ Category selection with animated cards
- ✅ Role toggle buttons
- ✅ Dynamic form fields based on role
- ✅ Form validation
- ✅ Password show/hide
- ✅ Loading state
- ✅ Error messages

### 2. Sign In
- ✅ Email + password login
- ✅ Works for all roles
- ✅ Error handling
- ✅ Auto-redirect after login

### 3. Protected Routes
- ✅ Can't access map without login
- ✅ Auto-redirect to /auth
- ✅ Loading state while checking auth

### 4. Profile Integration
- ✅ Real user data in sidebar
- ✅ Role badge in top nav
- ✅ Logout button works
- ✅ Redirects to /auth after logout

### 5. Security
- ✅ Passwords hashed (bcrypt)
- ✅ JWT tokens (7-day expiry)
- ✅ Token in localStorage
- ✅ Token sent with all API requests

## 🔧 Files Modified/Created

### Backend (5 files)
```
backend/
├── models/User.js              (NEW)
├── middleware/auth.js          (NEW)
├── middleware/roleCheck.js     (NEW)
├── routes/auth.js              (NEW)
├── server.js                   (UPDATED)
├── .env                        (UPDATED - added JWT_SECRET)
└── package.json                (UPDATED - added dependencies)
```

### Frontend (7 files)
```
frontend/
├── src/
│   ├── context/AuthContext.jsx         (NEW)
│   ├── components/ProtectedRoute.jsx   (NEW)
│   ├── pages/AuthPage.jsx              (NEW)
│   ├── App.jsx                         (UPDATED - routing)
│   ├── services/api.js                 (UPDATED - auth endpoints)
│   ├── components/TopNavBar.jsx        (UPDATED - role badge)
│   ├── components/ProfileSidebar.jsx   (UPDATED - logout)
│   └── pages/Home.jsx                  (UPDATED - real user data)
└── package.json                        (UPDATED - added react-router-dom)
```

## 🎨 UI Design

### Colors
- Primary: Blue (#2563EB)
- Secondary: Green (#10B981)
- Accent: Amber (#F59E0B)
- Background: Gradient (Blue → Green)

### Animations
- Page transitions (Framer Motion)
- Category card hover effects
- Form field stagger animations
- Loading spinners
- Smooth role switching

### Responsive
- Mobile: Full-width forms
- Tablet: 2-column forms
- Desktop: Centered layout

## 🐛 Troubleshooting

### "Cannot find module 'bcryptjs'"
```bash
cd backend
npm install
```

### "Cannot find module 'react-router-dom'"
```bash
cd frontend
npm install
```

### Backend won't start
- Check MongoDB connection
- Verify .env file has JWT_SECRET
- Port 5000 might be in use

### Can't login
- Make sure backend is running
- Check browser console for errors
- Verify user is registered first

### Redirects to /auth immediately
- This is correct! You need to sign up first
- No users exist initially

## 📝 API Endpoints

```
POST /api/auth/register  - Register new user
POST /api/auth/login     - Login
GET  /api/auth/me        - Get current user (protected)
POST /api/auth/logout    - Logout
```

## 🎯 Next Steps

1. **Test all 4 roles** - Create users for each role
2. **Test logout** - Click hamburger menu → Logout
3. **Test protected routes** - Try accessing / without login
4. **Check profile** - Open sidebar to see real user data
5. **Check role badge** - See role in top nav bar

## 📊 Summary

✅ Backend: 5 new files, JWT auth, bcrypt passwords
✅ Frontend: 7 updated files, routing, auth context
✅ UI: Modern design, animations, responsive
✅ Security: Hashed passwords, JWT tokens, protected routes
✅ Integration: Real user data, logout, role badges

**Status**: ✅ READY TO USE
**Time to test**: 2 minutes
**Action**: Install dependencies → Start servers → Test signup

---

**Everything is set up and ready to go! Just run `npm install` in both folders and start the servers.** 🚀
