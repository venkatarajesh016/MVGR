# Campus Navigator - Complete Application

## 🎯 What This Is

A full-stack campus navigation web application with:
- 🔐 User authentication (Login/Signup)
- 🗺️ Interactive campus map
- 🔍 Building and landmark search
- 🧭 Turn-by-turn navigation
- 📸 Waypoint image gallery
- 👤 User profile management
- 📱 Responsive design (mobile & desktop)

## 🚀 Quick Start (1 Minute)

### Just Double-Click This File:
```
START_APP.bat
```

That's it! The app will:
1. Install packages
2. Start servers
3. Open browser

## 📋 What's Included

### Frontend (React + Vite)
- Login & Signup pages
- Campus map with Mapbox
- Search functionality
- Navigation system
- Profile sidebar
- Waypoint gallery
- Responsive UI

### Backend (Node.js + Express)
- User authentication (JWT)
- MongoDB database
- Building/Room/Landmark APIs
- Navigation routing
- Image management
- CSV import

### Database (MongoDB Atlas)
- 16 Buildings
- 21 Rooms
- 12 Landmarks
- User accounts
- Already configured!

## 🎨 Features

### Authentication System
- ✅ Secure login/signup
- ✅ Password hashing (bcrypt)
- ✅ JWT tokens
- ✅ Protected routes
- ✅ Persistent sessions

### Campus Map
- ✅ Interactive Mapbox map
- ✅ 4 map styles
- ✅ Building markers
- ✅ Room markers
- ✅ Landmark markers
- ✅ User location tracking

### Navigation
- ✅ Search buildings/rooms/landmarks
- ✅ Calculate walking routes
- ✅ Turn-by-turn directions
- ✅ Distance calculation
- ✅ Waypoint images
- ✅ Road-based pathfinding

### User Profile
- ✅ Profile sidebar
- ✅ User information display
- ✅ Navigation menu
- ✅ Logout functionality
- ✅ Smooth animations

## 🛠️ Technology Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- Framer Motion
- Mapbox GL JS
- Lucide Icons
- React Router DOM

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- Bcrypt
- Multer (file uploads)

## 📁 Project Structure

```
hackthon/
├── frontend/
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Login, Signup, Home
│   │   ├── context/        # Auth context
│   │   ├── services/       # API calls
│   │   └── App.jsx         # Main app
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API endpoints
│   ├── utils/              # Pathfinding, etc.
│   ├── uploads/            # Image storage
│   ├── server.js           # Express server
│   └── package.json
│
└── START_APP.bat           # Quick start script
```

## 🔧 Manual Setup (If Needed)

### 1. Install Dependencies

**Frontend**:
```bash
cd frontend
npm install
npm install react-router-dom
```

**Backend**:
```bash
cd backend
npm install
npm install bcryptjs jsonwebtoken
```

### 2. Environment Variables

Already configured in `backend/.env`:
```env
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=campus-navigator-secret-key-2024-mvgr-college
MAPBOX_ACCESS_TOKEN=pk.eyJ1...
```

### 3. Start Servers

**Backend** (Terminal 1):
```bash
cd backend
npm start
```

**Frontend** (Terminal 2):
```bash
cd frontend
npm run dev
```

### 4. Access Application
```
http://localhost:3000
```

## 👥 User Guide

### First Time Use

1. **Open App**: http://localhost:3000
2. **Sign Up**: Click "Sign up" link
3. **Fill Form**:
   - Name: Your Name
   - Student ID: CS21B1001
   - Email: your@email.com
   - College: MVGR College of Engineering
   - Year: 3rd Year, CSE
   - Phone: +91 98765 43210
   - Password: (min 6 characters)
4. **Create Account**: Click button
5. **Explore**: You're in!

### Using the App

**Search Buildings**:
- Click search bar at top
- Type building name (e.g., "Auditorium")
- Click result

**Navigate**:
- Search for destination
- Click "Navigate" button
- See route on map
- Click "View Route Images" for waypoints

**View Profile**:
- Click hamburger menu (☰) top-left
- See your profile info
- Access navigation menu
- Logout when done

## 🌐 Hosting Options

### Local Network (Free)
1. Find your IP: `ipconfig`
2. Share: `http://YOUR_IP:3000`
3. Works on same WiFi

### Public Hosting (Free)
- **Frontend**: Vercel.com
- **Backend**: Render.com
- **Total**: Free tier available

See `RUN_AND_HOST.md` for detailed instructions.

## 📊 Database Info

### Already Seeded With:
- 16 Buildings (Main Academic, CS Block, Library, etc.)
- 21 Rooms (Classrooms, Labs)
- 12 Landmarks (Gates, Gardens, Sports areas)
- 32+ Road network nodes for pathfinding

### Campus Center:
- Latitude: 18.05997021737144
- Longitude: 83.40515640049136
- Coverage: 100m radius

## 🎨 Color Palette

- **Primary**: Blue (#2563EB, #3B82F6)
- **Secondary**: Green (#10B981)
- **Background**: White with blue-green gradients
- **Text**: Gray shades (#374151, #6B7280)

## 🔐 Security Features

- ✅ Password hashing (bcrypt, 10 rounds)
- ✅ JWT tokens (7-day expiration)
- ✅ Protected API routes
- ✅ Email uniqueness validation
- ✅ Student ID uniqueness validation
- ✅ Secure token storage (localStorage)

## 📱 Responsive Design

- ✅ Mobile (< 640px)
- ✅ Tablet (640px - 1024px)
- ✅ Desktop (> 1024px)
- ✅ Touch-friendly buttons
- ✅ Adaptive layouts

## 🐛 Troubleshooting

### App won't start?
```bash
# Kill any running Node processes
taskkill /F /IM node.exe

# Run START_APP.bat again
```

### Login doesn't work?
- Check backend is running (port 5000)
- Check MongoDB connection
- Clear browser cache
- Check browser console (F12)

### Map doesn't load?
- Check Mapbox token in backend/.env
- Check internet connection
- Try different map style

### Images don't load?
- Check internet connection (uses Picsum)
- Images have 3-tier fallback system
- Should always show something

## 📚 Documentation Files

- `START_HERE_TO_RUN.md` - Quick start guide
- `RUN_AND_HOST.md` - Hosting instructions
- `AUTH_QUICK_START.md` - Auth system guide
- `PROFILE_SIDEBAR_GUIDE.md` - Profile sidebar docs
- `IMAGE_LOADING_FIX.md` - Image troubleshooting

## 🎯 Test Checklist

- [ ] App starts successfully
- [ ] Login page displays
- [ ] Can create account
- [ ] Can login
- [ ] Map loads with markers
- [ ] Search works
- [ ] Navigation calculates routes
- [ ] Route images display
- [ ] Profile sidebar opens
- [ ] Can logout
- [ ] Works on mobile

## 📞 Support

### Check These First:
1. Both servers running?
2. MongoDB connected?
3. Packages installed?
4. Browser console errors?

### Common Issues:
- **Port in use**: Kill Node processes
- **Package errors**: Reinstall packages
- **Login fails**: Check backend logs
- **Map blank**: Check Mapbox token

## 🚀 Deployment

### Production Checklist:
- [ ] Change JWT_SECRET
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS
- [ ] Configure CORS
- [ ] Add rate limiting
- [ ] Set up monitoring
- [ ] Configure backups
- [ ] Optimize images
- [ ] Test on devices

## 📈 Future Enhancements

Possible additions:
- [ ] Real-time location updates
- [ ] Offline mode
- [ ] Push notifications
- [ ] Class schedule integration
- [ ] Friend location sharing
- [ ] AR navigation
- [ ] Voice directions
- [ ] Multi-language support

## 📄 License

This project is for educational purposes.

## 👨‍💻 Credits

Built with:
- React + Vite
- Node.js + Express
- MongoDB Atlas
- Mapbox GL JS
- Tailwind CSS
- Framer Motion

---

## 🎉 Ready to Start?

### Just run:
```
START_APP.bat
```

Or read `START_HERE_TO_RUN.md` for detailed instructions.

**Enjoy your Campus Navigator!** 🗺️✨
