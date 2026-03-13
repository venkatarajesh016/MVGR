# Quick Start - Authentication System

## 🚀 Start the Application

### 1. Start Backend
Open terminal in project root:
```bash
cd backend
node server.js
```

You should see:
```
Server running on port 5000
MongoDB connected successfully
```

### 2. Start Frontend
Open another terminal:
```bash
cd frontend
npm run dev
```

You should see:
```
VITE ready in XXX ms
Local: http://localhost:3000
```

### 3. Open Browser
Go to: `http://localhost:3000`

You'll be automatically redirected to `/auth` (login page)

## 📝 Create Your First Account

### Sign Up Flow:

1. **Click "Sign Up" tab**

2. **Choose Category:**
   - Click "Student / Guest" card (blue)

3. **Choose Role:**
   - Click "Student" card

4. **Fill the Form:**
   ```
   Full Name: Your Name
   Student ID: CS21B1001
   College: MVGR College of Engineering
   Year: 3rd Year, Computer Science
   Phone: +91 98765 43210
   Email: your.email@example.com
   Password: test123
   ```

5. **Click "Create Account"**

6. **You're in!** 
   - Redirected to campus map
   - Your name appears in top-right
   - Blue "Student" badge shows your role

## 🎯 Test the Profile Sidebar

1. **Click hamburger menu (☰)** in top-left corner

2. **Sidebar slides in** showing:
   - Your profile card (blue gradient)
   - Your name and student ID
   - College, year, phone, email
   - Navigation menu
   - Logout button

3. **Close sidebar:**
   - Click X button
   - Click outside (on backdrop)
   - Press Escape key

## 🔄 Test Login

1. **Click "Logout"** in sidebar

2. **You're back at login page**

3. **Sign In:**
   - Enter your email
   - Enter your password
   - Click "Sign In"

4. **You're back in!**

## 🎭 Test Different Roles

Create accounts for each role to see different profile displays:

### Student (Blue Badge)
- Category: Student / Guest
- Role: Student
- Shows: Student ID, College, Year, Phone, Email

### Guest (Gray Badge)
- Category: Student / Guest
- Role: Guest
- Shows: Username, Email only

### Admin (Red Badge)
- Category: Admin / Teacher
- Role: Admin
- Shows: Employee ID, College, Department, Phone, Email

### Teacher (Green Badge)
- Category: Admin / Teacher
- Role: Teacher
- Shows: Employee ID, College, Department, Subject, Phone, Email

## ✅ What to Check

### Top Navigation Bar
- ✅ Hamburger menu on left
- ✅ Campus Navigator logo
- ✅ Your name on right (desktop)
- ✅ Role badge on right (desktop)

### Profile Sidebar
- ✅ Smooth slide-in animation
- ✅ Profile card with gradient
- ✅ Role badge (color-coded)
- ✅ All your info displayed
- ✅ Navigation menu items
- ✅ Logout button (red hover)

### Authentication
- ✅ Can't access map without login
- ✅ Token persists on refresh
- ✅ Logout clears token
- ✅ Redirects work correctly

## 🐛 Common Issues

### "No token, authorization denied"
- You're not logged in
- Click "Sign In" and enter credentials

### "User with this email already exists"
- Email is already registered
- Use different email or sign in

### Backend not responding
- Check if backend is running on port 5000
- Look for "Server running on port 5000" message

### Frontend shows blank page
- Check browser console (F12)
- Make sure frontend is running
- Clear browser cache

## 🎨 UI Features to Notice

### Auth Page
- Glassmorphism effect (frosted glass)
- Gradient background (blue to green)
- Smooth tab switching
- Category cards with hover scale
- Role cards with icons
- Show/hide password toggle
- Loading spinner on submit

### Profile Sidebar
- Spring animation (natural bounce)
- Backdrop blur effect
- Color-coded role badges
- Icon-based information
- Hover effects on menu items
- Smooth transitions

### Top Nav
- Hamburger hover scale
- User info on desktop
- Responsive design

## 📱 Mobile Testing

1. Open browser DevTools (F12)
2. Click device toolbar icon
3. Select mobile device
4. Test:
   - Auth page (should be responsive)
   - Hamburger menu
   - Sidebar (full overlay)
   - All forms

## 🎉 You're All Set!

The authentication system is working! You can now:
- ✅ Sign up with different roles
- ✅ Sign in and out
- ✅ View your profile
- ✅ Navigate the campus map
- ✅ Use all existing features

## 📚 Next Steps

1. Explore the campus map
2. Try navigation features
3. Test with different user roles
4. Customize your profile
5. Add more features

---

**Need Help?** Check `AUTH_SYSTEM_COMPLETE.md` for detailed documentation.
