# Profile Sidebar - Quick Start

## What Was Built

✅ **ProfileCard** - Beautiful user profile display with avatar, name, and details
✅ **ProfileSidebar** - Slide-in drawer with navigation menu
✅ **Hamburger Menu** - Added to TopNavBar
✅ **Integration** - Connected to main Home page
✅ **Demo Page** - Standalone test page

## How to Test

### Option 1: In Main App (Recommended)

1. **Make sure frontend is running**:
   ```bash
   cd frontend
   npm run dev
   ```

2. **Open browser**: `http://localhost:3000`

3. **Click hamburger menu** (☰ icon in top-left corner)

4. **Sidebar slides in** from left with:
   - Profile card (blue gradient)
   - User info (name, ID, college, etc.)
   - Navigation menu (Home, Classes, Map, Settings)
   - Logout button

5. **Close sidebar** by:
   - Clicking X button
   - Clicking outside (on backdrop)

### Option 2: Demo Page

1. **Add route** to `frontend/src/App.jsx`:
   ```jsx
   import ProfileDemo from './pages/ProfileDemo';
   
   // Add this route:
   <Route path="/profile-demo" element={<ProfileDemo />} />
   ```

2. **Visit**: `http://localhost:3000/profile-demo`

## Features

### Profile Card
- Circular avatar with online indicator (green dot)
- User name and student ID
- College name with building icon
- Year of study with graduation cap icon
- Phone number with phone icon
- Email with mail icon
- Beautiful blue gradient background

### Sidebar
- 320px width
- Smooth slide-in animation
- Backdrop overlay (semi-transparent black)
- Navigation menu with icons
- Hover effects on menu items
- Logout option (red hover)
- Footer with version info

### Animations
- Slide-in: Spring animation (smooth and natural)
- Backdrop: Fade in/out
- Menu items: Staggered appearance
- Hover: Color transitions

## Customization

### Change User Data

Edit `frontend/src/pages/Home.jsx`:

```javascript
const userData = {
  name: 'Your Name',              // Change this
  studentId: 'YOUR_ID',           // Change this
  college: 'Your College',        // Change this
  year: 'Your Year',              // Change this
  phone: 'Your Phone',            // Change this
  email: 'your@email.com',        // Change this
  avatar: 'https://...'           // Add image URL
};
```

### Add Profile Picture

Replace `avatar: null` with your image URL:
```javascript
avatar: 'https://i.pravatar.cc/150?img=12'  // Example
```

### Change Colors

**Profile Card** (`ProfileCard.jsx`):
```jsx
// Line 8: Change gradient colors
className="bg-gradient-to-br from-blue-600 to-blue-700"
// Try: from-purple-600 to-purple-700
// Try: from-green-600 to-green-700
```

**Sidebar Width** (`ProfileSidebar.jsx`):
```jsx
// Line 42: Change width
className="... w-80 ..."  // 320px
// Try: w-72 (288px) or w-96 (384px)
```

## File Structure

```
frontend/src/
├── components/
│   ├── ProfileCard.jsx          ← NEW: Profile display
│   ├── ProfileSidebar.jsx       ← NEW: Sidebar drawer
│   └── TopNavBar.jsx            ← UPDATED: Added hamburger
├── pages/
│   ├── Home.jsx                 ← UPDATED: Integrated sidebar
│   └── ProfileDemo.jsx          ← NEW: Demo page
```

## What Each Component Does

### ProfileCard.jsx
- Displays user information
- Shows avatar (or default icon)
- Lists details with icons
- Used inside ProfileSidebar

### ProfileSidebar.jsx
- Main sidebar container
- Handles open/close animations
- Contains ProfileCard
- Contains navigation menu
- Handles backdrop clicks

### TopNavBar.jsx
- Shows campus name
- Has hamburger menu button
- Triggers sidebar open

### Home.jsx
- Main app page
- Manages sidebar state
- Provides user data
- Renders all components

## Navigation Menu

Current menu items:
1. **Home** - Home icon
2. **My Classes** - Book icon
3. **Campus Map** - Map icon
4. **Settings** - Settings icon
5. **Logout** - Logout icon (red on hover)

To add more items, edit `ProfileSidebar.jsx`:
```javascript
const menuItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: BookOpen, label: 'My Classes', path: '/classes' },
  // Add your items here
];
```

## Responsive Design

- **Mobile**: Full overlay, 320px sidebar
- **Tablet**: Partial overlay, 320px sidebar
- **Desktop**: Partial overlay, 320px sidebar

Works perfectly on all screen sizes!

## Troubleshooting

### Sidebar doesn't open?
- Check if hamburger button is visible
- Check browser console for errors
- Verify frontend is running

### No animations?
- Framer Motion should be installed
- Check if `npm install` was run
- Restart dev server

### Styling looks wrong?
- Tailwind CSS should be configured
- Run `npm run dev` to rebuild
- Clear browser cache

## Next Steps

1. **Test it**: Click the hamburger menu
2. **Customize**: Change user data and colors
3. **Integrate**: Connect to your auth system
4. **Enhance**: Add more menu items or features

## Summary

✅ Profile sidebar is ready to use
✅ Hamburger menu integrated
✅ Smooth animations working
✅ Responsive design implemented
✅ Easy to customize

**Just refresh your browser and click the hamburger menu (☰) in the top-left corner!**

---

**Status**: ✅ COMPLETE AND READY TO USE
**Time to test**: 10 seconds
**Action**: Refresh browser → Click hamburger menu
