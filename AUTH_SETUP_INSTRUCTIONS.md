# Authentication System - Setup Instructions

## What Was Built

✅ **Login Page** - Email/password authentication with social login buttons
✅ **Signup Page** - Student registration with full profile
✅ **Auth Context** - Global authentication state management
✅ **Protected Routes** - Redirect to login if not authenticated
✅ **Backend Auth API** - Login, signup, and user management
✅ **User Model** - MongoDB schema with password hashing
✅ **Profile Integration** - Sidebar now uses real user data

## Required Packages

### Backend Packages

Install these in the `backend` folder:

```bash
cd backend
npm install bcryptjs jsonwebtoken
```

**Packages**:
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT token generation

### Frontend Packages

React Router is likely already installed, but if not:

```bash
cd frontend
npm install react-router-dom
```

## Environment Variables

Add to `backend/.env`:

```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

## How to Test

### 1. Start Backend

```bash
cd backend
npm start
```

Backend should show:
```
Server running on port 5000
MongoDB connected successfully
```

### 2. Start Frontend

```bash
cd frontend
npm run dev
```

### 3. Test Flow

1. **Open browser**: `http://localhost:3000`
2. **You'll see**: Login page (redirected because not authenticated)
3. **Click "Sign up"**: Go to signup page
4. **Fill form**:
   - Name: Your Name
   - Student ID: CS21B1001
   - Email: test@college.edu
   - College: MVGR College of Engineering
   - Year: 3rd Year, CSE
   - Phone: +91 98765 43210
   - Password: test123
   - Confirm Password: test123
5. **Click "Create Account"**
6. **You'll be redirected**: To main campus map (Home page)
7. **Click hamburger menu**: See your profile in sidebar
8. **Click Logout**: Redirected back to login

## Features

### Login Page
- Email and password fields
- Show/hide password toggle
- Remember me checkbox
- Forgot password link
- Social login buttons (Google, Facebook)
- Link to signup page
- Smooth animations

### Signup Page
- Full name and student ID
- Email address
- College and year/department
- Phone number
- Password with confirmation
- Show/hide password toggles
- Terms and conditions checkbox
- Link to login page
- Form validation

### Authentication Flow
1. User signs up → Account created → Auto login → Redirect to home
2. User logs in → Token stored → Redirect to home
3. User visits protected route → Check auth → Redirect to login if not authenticated
4. User logs out → Clear token → Redirect to login

### Security Features
- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ JWT tokens with 7-day expiration
- ✅ Protected API routes
- ✅ Password minimum length (6 characters)
- ✅ Email and student ID uniqueness
- ✅ Secure password comparison

## File Structure

```
frontend/src/
├── context/
│   └── AuthContext.jsx          ← NEW: Auth state management
├── components/
│   ├── ProtectedRoute.jsx       ← NEW: Route protection
│   └── ProfileSidebar.jsx       ← UPDATED: Uses real user data
├── pages/
│   ├── Login.jsx                ← NEW: Login page
│   ├── Signup.jsx               ← NEW: Signup page
│   └── Home.jsx                 ← UPDATED: Removed mock data
└── App.jsx                      ← UPDATED: Added routing

backend/
├── models/
│   └── User.js                  ← NEW: User schema
├── routes/
│   └── auth.js                  ← NEW: Auth endpoints
└── server.js                    ← UPDATED: Added auth routes
```

## API Endpoints

### POST /api/auth/signup
Create new user account

**Request**:
```json
{
  "name": "John Doe",
  "email": "john@college.edu",
  "password": "password123",
  "studentId": "CS21B1001",
  "college": "MVGR College",
  "year": "3rd Year, CSE",
  "phone": "+91 98765 43210"
}
```

**Response**:
```json
{
  "message": "User created successfully",
  "user": { ...user data without password },
  "token": "jwt-token-here"
}
```

### POST /api/auth/login
Login existing user

**Request**:
```json
{
  "email": "john@college.edu",
  "password": "password123"
}
```

**Response**:
```json
{
  "message": "Login successful",
  "user": { ...user data without password },
  "token": "jwt-token-here"
}
```

### GET /api/auth/me
Get current user (requires token)

**Headers**:
```
Authorization: Bearer <token>
```

**Response**:
```json
{
  "user": { ...user data without password }
}
```

### POST /api/auth/logout
Logout user (client-side token removal)

## Color Palette (Consistent with Profile Sidebar)

### Primary Colors
- Blue: `#2563EB` (from-blue-600)
- Blue Dark: `#3B82F6` (to-blue-700)
- Green: `#10B981` (accent)

### Backgrounds
- Light Blue: `#EFF6FF` (from-blue-50)
- White: `#FFFFFF`
- Light Green: `#F0FDF4` (to-green-50)

### Text
- Dark: `#111827` (gray-900)
- Medium: `#6B7280` (gray-600)
- Light: `#9CA3AF` (gray-400)

### States
- Success: `#10B981` (green-500)
- Error: `#EF4444` (red-500)
- Warning: `#F59E0B` (amber-500)

## Customization

### Change JWT Expiration

In `backend/routes/auth.js`:
```javascript
const token = jwt.sign(
  { userId: user._id, email: user.email },
  JWT_SECRET,
  { expiresIn: '30d' } // Change from 7d to 30d
);
```

### Add More User Fields

1. Update `backend/models/User.js`:
```javascript
department: {
  type: String,
  required: true
}
```

2. Update signup form in `frontend/src/pages/Signup.jsx`

3. Update `ProfileCard.jsx` to display new field

### Change Password Requirements

In `backend/models/User.js`:
```javascript
password: {
  type: String,
  required: true,
  minlength: 8 // Change from 6 to 8
}
```

## Troubleshooting

### "bcryptjs not found"
```bash
cd backend
npm install bcryptjs
```

### "jsonwebtoken not found"
```bash
cd backend
npm install jsonwebtoken
```

### "react-router-dom not found"
```bash
cd frontend
npm install react-router-dom
```

### Login redirects to login again
- Check browser console for errors
- Verify token is being stored in localStorage
- Check backend is running and responding

### Password not hashing
- Verify bcryptjs is installed
- Check User model pre-save hook
- Look at backend console for errors

### JWT errors
- Verify JWT_SECRET is set in .env
- Check token format in requests
- Verify token hasn't expired

## Next Steps

1. **Install packages** (see above)
2. **Add JWT_SECRET** to backend/.env
3. **Restart backend** server
4. **Test signup** flow
5. **Test login** flow
6. **Test logout** flow

## Summary

✅ Complete authentication system
✅ Login and signup pages
✅ Protected routes
✅ JWT token authentication
✅ Password hashing
✅ Profile integration
✅ Same color palette as sidebar
✅ Smooth animations
✅ Form validation
✅ Error handling

**Status**: Ready to install packages and test!
