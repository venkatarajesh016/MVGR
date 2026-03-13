# Authentication System Setup Guide

## Overview

Complete authentication system with Sign In/Sign Up for Campus Navigation app with 4 user roles: Admin, Teacher, Student, and Guest.

## Installation

### Backend Dependencies

```bash
cd backend
npm install bcryptjs jsonwebtoken
```

### Frontend Dependencies

```bash
cd frontend
npm install react-router-dom
```

## Backend Setup

### 1. Environment Variables

Already added to `backend/.env`:
```
JWT_SECRET=campus_nav_secret_key_2024_mvgr_college_secure_token_xyz123
```

### 2. Files Created

- `backend/models/User.js` - User model with role-based fields
- `backend/middleware/auth.js` - JWT authentication middleware
- `backend/middleware/roleCheck.js` - Role-based access control
- `backend/routes/auth.js` - Authentication routes
- `backend/server.js` - Updated with auth routes

### 3. API Endpoints

**POST /api/auth/register**
- Register new user
- Body: { email, password, role, ...roleSpecificFields }
- Returns: { token, user }

**POST /api/auth/login**
- Login with email and password
- Body: { email, password }
- Returns: { token, user }

**GET /api/auth/me**
- Get current user (protected)
- Headers: Authorization: Bearer {token}
- Returns: { user }

**POST /api/auth/logout**
- Logout (client-side token removal)
- Headers: Authorization: Bearer {token}
- Returns: { message }

## Frontend Setup

### 1. Files Created

- `frontend/src/context/AuthContext.jsx` - Auth state management
- `frontend/src/components/ProtectedRoute.jsx` - Route guard
- `frontend/src/pages/AuthPage.jsx` - Sign In/Sign Up UI
- `frontend/src/App.jsx` - Updated with routing
- `frontend/src/services/api.js` - Updated with auth endpoints
- `frontend/src/components/TopNavBar.jsx` - Added role badge
- `frontend/src/components/ProfileSidebar.jsx` - Added logout
- `frontend/src/pages/Home.jsx` - Uses real user data

### 2. Routes

- `/auth` - Authentication page (Sign In/Sign Up)
- `/` - Home page (protected, requires login)
- `*` - Redirects to home

## User Roles & Fields

### Student
```javascript
{
  email: String (required, unique),
  password: String (required, min 6 chars),
  role: "student",
  name: String (required),
  studentId: String (required, unique),
  college: String (required),
  year: String (required),
  phone: String (required),
  avatar: String (optional)
}
```

### Guest
```javascript
{
  email: String (required, unique),
  password: String (required, min 6 chars),
  role: "guest",
  username: String (required)
}
```

### Admin
```javascript
{
  email: String (required, unique),
  password: String (required, min 6 chars),
  role: "admin",
  name: String (required),
  employeeId: String (required, unique),
  college: String (required),
  department: String (required),
  phone: String (required),
  avatar: String (optional)
}
```

### Teacher
```javascript
{
  email: String (required, unique),
  password: String (required, min 6 chars),
  role: "teacher",
  name: String (required),
  employeeId: String (required, unique),
  college: String (required),
  department: String (required),
  subject: String (required),
  phone: String (required),
  avatar: String (optional)
}
```

## How to Run

### 1. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

### 2. Start Backend

```bash
cd backend
npm start
# or
npm run dev
```

Backend runs on: `http://localhost:5000`

### 3. Start Frontend

```bash
cd frontend
npm run dev
```

Frontend runs on: `http://localhost:3000`

### 4. Test the System

1. Open `http://localhost:3000`
2. You'll be redirected to `/auth` (not logged in)
3. Click "Sign Up" tab
4. Choose a category (Admin/Teacher or Student/Guest)
5. Select a role
6. Fill in the form
7. Click "Create Account"
8. You'll be logged in and redirected to the map

## Features

### Sign In
- Single form for all roles
- Email + password authentication
- JWT token stored in localStorage
- Auto-redirect to home after login

### Sign Up
- Two-step process:
  1. Choose category (Admin/Teacher or Student/Guest)
  2. Select specific role and fill form
- Role-specific form fields
- Form validation
- Password strength (min 6 chars)
- Email format validation
- Unique ID validation (studentId, employeeId)

### UI/UX
- Glassmorphism design matching existing app
- Framer Motion animations
- Category selection with large cards
- Role toggle buttons
- Show/hide password
- Loading states
- Error messages
- Mobile responsive

### Security
- Passwords hashed with bcrypt (10 salt rounds)
- JWT tokens with 7-day expiry
- Protected routes
- Token validation on each request
- Role-based access control ready

### Profile Integration
- Real user data in ProfileSidebar
- Role badge in TopNavBar
- Logout functionality
- User info from AuthContext

## Testing

### Test User Registration

**Student:**
```json
{
  "email": "student@test.com",
  "password": "test123",
  "role": "student",
  "name": "Test Student",
  "studentId": "CS21B1001",
  "college": "MVGR College",
  "year": "3rd Year, CS",
  "phone": "+91 9876543210"
}
```

**Guest:**
```json
{
  "email": "guest@test.com",
  "password": "test123",
  "role": "guest",
  "username": "testguest"
}
```

**Admin:**
```json
{
  "email": "admin@test.com",
  "password": "test123",
  "role": "admin",
  "name": "Test Admin",
  "employeeId": "EMP001",
  "college": "MVGR College",
  "department": "Administration",
  "phone": "+91 9876543210"
}
```

**Teacher:**
```json
{
  "email": "teacher@test.com",
  "password": "test123",
  "role": "teacher",
  "name": "Test Teacher",
  "employeeId": "EMP002",
  "college": "MVGR College",
  "department": "Computer Science",
  "subject": "Data Structures",
  "phone": "+91 9876543210"
}
```

## API Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123",
    "role": "student",
    "name": "Test User",
    "studentId": "CS21B1001",
    "college": "MVGR College",
    "year": "3rd Year, CS",
    "phone": "+91 9876543210"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123"
  }'
```

### Get Current User
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Troubleshooting

### Backend won't start
- Check if MongoDB is connected
- Verify JWT_SECRET in .env
- Run `npm install` to ensure dependencies

### Frontend shows errors
- Run `npm install` to install react-router-dom
- Clear browser cache
- Check console for specific errors

### Can't login
- Verify backend is running on port 5000
- Check network tab for API errors
- Ensure user is registered first

### Token expired
- Tokens expire after 7 days
- Logout and login again
- Or adjust expiry in `backend/routes/auth.js`

## Next Steps

### Optional Enhancements

1. **Email Verification**
   - Send verification email on registration
   - Verify email before allowing login

2. **Password Reset**
   - Forgot password functionality
   - Email reset link

3. **Profile Picture Upload**
   - Allow users to upload avatars
   - Store in uploads folder or cloud storage

4. **Role-Based Features**
   - Admin dashboard
   - Teacher class management
   - Student schedule view

5. **Session Management**
   - Refresh tokens
   - Token blacklisting on logout
   - Multiple device sessions

## Summary

✅ Complete authentication system
✅ 4 user roles (Admin, Teacher, Student, Guest)
✅ JWT-based authentication
✅ Protected routes
✅ Role-based access control
✅ Modern UI with animations
✅ Mobile responsive
✅ Integrated with existing app
✅ Real user data in profile

The authentication system is fully functional and ready to use!
