# Authentication System - Quick Start

## 🚀 Installation (2 minutes)

### Step 1: Install Backend Packages
```bash
cd backend
npm install bcryptjs jsonwebtoken
```

### Step 2: Add JWT Secret
Add this line to `backend/.env`:
```env
JWT_SECRET=campus-navigator-secret-key-2024
```

### Step 3: Restart Backend
```bash
# If backend is running, stop it (Ctrl+C)
# Then start again:
npm start
```

### Step 4: Refresh Frontend
Just refresh your browser or restart frontend:
```bash
cd frontend
npm run dev
```

## ✅ Test It (1 minute)

1. **Open browser**: `http://localhost:3000`
2. **You'll see**: Login page (beautiful blue gradient!)
3. **Click "Sign up"** at bottom
4. **Fill the form**:
   - Name: Test User
   - Student ID: CS21B1001
   - Email: test@college.edu
   - College: MVGR College of Engineering
   - Year: 3rd Year, CSE
   - Phone: +91 98765 43210
   - Password: test123
   - Confirm: test123
   - ✓ Check terms box
5. **Click "Create Account"**
6. **Boom!** You're in the campus map
7. **Click hamburger menu** (☰) - See your profile!
8. **Click Logout** - Back to login

## 📱 What You Get

### Login Page
```
┌─────────────────────────────────┐
│         🗺️  Campus Navigator     │
│     Sign in to explore campus   │
│                                 │
│  ┌───────────────────────────┐  │
│  │   Welcome Back            │  │
│  │                           │  │
│  │  📧 Email                 │  │
│  │  🔒 Password              │  │
│  │  ☐ Remember me            │  │
│  │                           │  │
│  │  [    Sign In    ]        │  │
│  │                           │  │
│  │  ─── Or continue with ─── │  │
│  │  [Google] [Facebook]      │  │
│  │                           │  │
│  │  Don't have account?      │  │
│  │  Sign up                  │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

### Signup Page
```
┌─────────────────────────────────┐
│      🗺️  Join Campus Navigator  │
│    Create your account          │
│                                 │
│  ┌───────────────────────────┐  │
│  │   Create Account          │  │
│  │                           │  │
│  │  👤 Name    🎓 Student ID │  │
│  │  📧 Email                 │  │
│  │  🏢 College  📅 Year      │  │
│  │  📞 Phone                 │  │
│  │  🔒 Password              │  │
│  │  🔒 Confirm Password      │  │
│  │  ☐ I agree to terms       │  │
│  │                           │  │
│  │  [  Create Account  ]     │  │
│  │                           │  │
│  │  Already have account?    │  │
│  │  Sign in                  │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

### After Login
```
┌─────────────────────────────────┐
│  ☰  Campus Navigator            │  ← Click hamburger
└─────────────────────────────────┘
         ↓
┌──────────────┐
│  Profile     │  ← Your real data!
│  ┌────────┐  │
│  │ Avatar │  │
│  └────────┘  │
│  Test User   │
│  CS21B1001   │
│              │
│  🏢 MVGR     │
│  🎓 3rd Year │
│  📞 +91...   │
│  ✉️  test@.. │
│              │
│  🏠 Home     │
│  📚 Classes  │
│  🗺️  Map     │
│  ⚙️  Settings│
│              │
│  🚪 Logout   │  ← Click to logout
└──────────────┘
```

## 🎨 Color Scheme

Same beautiful colors as profile sidebar:
- **Primary**: Blue gradient (#2563EB → #3B82F6)
- **Background**: Light blue to white to light green
- **Accent**: Green (#10B981)
- **Text**: Gray shades
- **Buttons**: Blue gradient with hover effects

## 🔐 Security Features

✅ Passwords hashed with bcrypt
✅ JWT tokens (7-day expiration)
✅ Protected routes
✅ Email uniqueness
✅ Student ID uniqueness
✅ Password validation (min 6 chars)
✅ Secure token storage

## 🎯 Features

### Login
- Email/password authentication
- Show/hide password
- Remember me option
- Forgot password link
- Social login buttons (UI only)
- Error messages
- Loading states
- Smooth animations

### Signup
- Full profile registration
- Password confirmation
- Real-time validation
- Terms acceptance
- All required fields
- Error handling
- Success redirect

### Protected Routes
- Auto-redirect to login if not authenticated
- Token verification
- Persistent login (localStorage)
- Logout functionality

## 📝 User Data Flow

```
Signup Form
    ↓
Backend API (/api/auth/signup)
    ↓
Hash Password (bcrypt)
    ↓
Save to MongoDB
    ↓
Generate JWT Token
    ↓
Return User + Token
    ↓
Store in localStorage
    ↓
Redirect to Home
    ↓
Profile Sidebar shows real data!
```

## 🔄 Authentication Flow

```
1. User visits app
   ↓
2. Check localStorage for token
   ↓
3. Token exists?
   ├─ Yes → Load user data → Show Home
   └─ No → Redirect to Login
   
4. User logs in
   ↓
5. Send credentials to backend
   ↓
6. Backend validates
   ↓
7. Return token + user data
   ↓
8. Store in localStorage
   ↓
9. Update AuthContext
   ↓
10. Redirect to Home
```

## 🛠️ Customization

### Change Token Expiration
`backend/routes/auth.js` line 35:
```javascript
{ expiresIn: '30d' } // Change from 7d
```

### Add More Fields
1. Update `backend/models/User.js`
2. Update signup form
3. Update profile card

### Change Password Length
`backend/models/User.js` line 18:
```javascript
minlength: 8 // Change from 6
```

## 🐛 Troubleshooting

### Can't install packages?
Make sure you're in the right folder:
```bash
pwd  # Should show .../backend or .../frontend
```

### Backend won't start?
Check if packages are installed:
```bash
cd backend
npm list bcryptjs jsonwebtoken
```

### Login doesn't work?
1. Check backend console for errors
2. Check browser console (F12)
3. Verify MongoDB is connected
4. Check JWT_SECRET is in .env

### Profile sidebar empty?
1. Make sure you're logged in
2. Check AuthContext is providing user
3. Look at browser console for errors

## 📦 Files Created

```
frontend/src/
├── context/
│   └── AuthContext.jsx          ← Auth state
├── components/
│   └── ProtectedRoute.jsx       ← Route guard
├── pages/
│   ├── Login.jsx                ← Login page
│   └── Signup.jsx               ← Signup page

backend/
├── models/
│   └── User.js                  ← User schema
└── routes/
    └── auth.js                  ← Auth API
```

## ✨ Summary

✅ Beautiful login/signup pages
✅ Secure authentication
✅ Protected routes
✅ Real user profiles
✅ Same color palette
✅ Smooth animations
✅ Error handling
✅ Form validation

**Time to setup**: 2 minutes
**Time to test**: 1 minute
**Total**: 3 minutes to complete auth system!

---

**Ready?** Just run the 4 installation steps above and you're done! 🎉
