# Installation Guide

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** (optional) - [Download](https://git-scm.com/)
- **MongoDB Atlas Account** (free) - [Sign up](https://www.mongodb.com/cloud/atlas)
- **Mapbox Account** (free) - [Sign up](https://www.mapbox.com/)

## Step 1: Get MongoDB Atlas Credentials

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free M0 cluster (if you don't have one)
3. Click "Connect" on your cluster
4. Choose "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database password
7. Add database name: `campus-navigation`

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/campus-navigation?retryWrites=true&w=majority
```

## Step 2: Get Mapbox Token

1. Go to [Mapbox](https://www.mapbox.com/)
2. Sign up or log in
3. Go to your [Account page](https://account.mapbox.com/)
4. Navigate to "Access tokens"
5. Copy your "Default public token" (starts with `pk.`)

## Step 3: Clone or Download Project

### Option A: Using Git
```bash
git clone <repository-url>
cd campus-navigation-system
```

### Option B: Manual Download
1. Download the project ZIP
2. Extract to your desired location
3. Open terminal in project folder

## Step 4: Automated Setup (Recommended)

### On Windows
```bash
setup.bat
```

### On Mac/Linux
```bash
chmod +x setup.sh
./setup.sh
```

This will:
- Install all backend dependencies
- Install all frontend dependencies
- Create .env file from example
- Display next steps

## Step 5: Manual Setup (Alternative)

### Backend Setup
```bash
cd backend
npm install
```

Create `.env` file in `backend` folder:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
MAPBOX_TOKEN=your_mapbox_token_here
```

### Frontend Setup
```bash
cd frontend
npm install
```

## Step 6: Verify Installation

### Check Backend
```bash
cd backend
npm start
```

You should see:
```
Server running on port 5000
MongoDB connected successfully
```

### Check Frontend
Open a new terminal:
```bash
cd frontend
npm run dev
```

You should see:
```
VITE v5.0.0  ready in XXX ms
➜  Local:   http://localhost:3000/
```

## Step 7: Import Sample Data

### Option A: Using CSV File
```bash
curl -X POST http://localhost:5000/api/upload-csv \
  -F "csv=@example-data.csv"
```

### Option B: Using API Directly

Create a building:
```bash
curl -X POST http://localhost:5000/api/buildings \
  -F "name=Academic Block A" \
  -F "lat=18.2351" \
  -F "lng=83.4126" \
  -F "description=Main engineering building"
```

Create a room:
```bash
curl -X POST http://localhost:5000/api/rooms \
  -H "Content-Type: application/json" \
  -d '{
    "roomNumber": "101",
    "buildingId": "your_building_id_here",
    "floor": 1,
    "department": "Computer Science",
    "lat": 18.2352,
    "lng": 83.4127
  }'
```

## Step 8: Access Application

Open your browser and go to:
```
http://localhost:3000
```

You should see the Campus Navigation System with:
- Interactive map
- Search bar
- Your location (if permitted)
- Sample buildings and landmarks

## Troubleshooting

### Backend Issues

**Error: MongoDB connection failed**
```
Solution:
1. Check MONGO_URI in .env file
2. Verify MongoDB Atlas IP whitelist (add 0.0.0.0/0)
3. Confirm database user has read/write permissions
4. Check internet connection
```

**Error: Port 5000 already in use**
```
Solution:
1. Change PORT in .env to 5001 or another port
2. Update frontend proxy in vite.config.js
3. Or kill process using port 5000
```

**Error: Mapbox token invalid**
```
Solution:
1. Verify MAPBOX_TOKEN in .env
2. Check token at mapbox.com/account
3. Ensure token starts with 'pk.'
4. Create new token if needed
```

### Frontend Issues

**Error: Cannot connect to backend**
```
Solution:
1. Ensure backend is running on port 5000
2. Check proxy configuration in vite.config.js
3. Verify CORS settings in backend/server.js
```

**Error: Map not loading**
```
Solution:
1. Check browser console for errors
2. Verify Mapbox token is correct
3. Check internet connection
4. Clear browser cache
```

**Error: Location not working**
```
Solution:
1. Enable location permissions in browser
2. Use HTTPS in production (required for geolocation)
3. Check browser compatibility
```

### Common Issues

**npm install fails**
```
Solution:
1. Delete node_modules folder
2. Delete package-lock.json
3. Run npm install again
4. Try npm cache clean --force
```

**Dependencies version conflicts**
```
Solution:
1. Use Node.js v16 or higher
2. Update npm: npm install -g npm@latest
3. Check package.json for correct versions
```

## Development Workflow

### Running Both Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Making Changes

1. Edit files in `src` folder
2. Changes auto-reload in browser
3. Check console for errors
4. Test on mobile device

### Building for Production

**Frontend:**
```bash
cd frontend
npm run build
```

Output in `frontend/dist` folder

**Backend:**
```bash
cd backend
# Already production-ready
```

## Environment Variables Reference

### Backend (.env)
```env
# Server Configuration
PORT=5000

# Database
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/campus-navigation

# Map Service
MAPBOX_TOKEN=pk.your_mapbox_token_here
```

### Frontend (optional)
```env
# API URL (if different from default)
VITE_API_URL=http://localhost:5000
```

## Port Configuration

Default ports:
- Backend: 5000
- Frontend: 3000

To change:
1. Backend: Edit PORT in backend/.env
2. Frontend: Edit vite.config.js server.port
3. Update proxy target in vite.config.js

## Database Setup

### MongoDB Atlas Configuration

1. **Network Access**
   - Add IP: 0.0.0.0/0 (allow all)
   - Or add your specific IP

2. **Database Access**
   - Create user with read/write permissions
   - Save username and password

3. **Database**
   - Name: campus-navigation
   - Collections: buildings, rooms, landmarks

## File Upload Configuration

### Upload Directory
- Location: `backend/uploads/`
- Auto-created on first upload
- Served at: `/uploads/filename`

### Upload Limits
- Max file size: 5MB
- Allowed types: JPEG, PNG, GIF
- Automatic filename generation

## Testing Installation

### Backend Health Check
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "ok",
  "mapboxToken": "pk.xxx..."
}
```

### Frontend Check
1. Open http://localhost:3000
2. Map should load
3. Search bar should appear
4. No console errors

### Full System Test
1. Search for a location
2. Click on a marker
3. View location details
4. Start navigation
5. See route on map

## Next Steps

After successful installation:

1. **Customize Campus Data**
   - Add your buildings
   - Upload building images
   - Add rooms and landmarks

2. **Configure Map**
   - Update default center coordinates
   - Adjust zoom level
   - Customize marker styles

3. **Deploy to Production**
   - See DEPLOYMENT.md
   - Configure production environment
   - Set up monitoring

4. **Explore Features**
   - See FEATURES.md
   - Read UI_IMPROVEMENTS.md
   - Check COMPONENT_GUIDE.md

## Support

If you encounter issues:

1. Check this guide
2. Review error messages
3. Check browser console
4. Verify environment variables
5. Test with sample data

## Quick Commands Reference

```bash
# Install dependencies
npm install

# Start backend
cd backend && npm start

# Start frontend
cd frontend && npm run dev

# Build frontend
cd frontend && npm run build

# Import CSV data
curl -X POST http://localhost:5000/api/upload-csv -F "csv=@example-data.csv"

# Check backend health
curl http://localhost:5000/api/health
```

---

**Installation Time**: ~10 minutes
**Difficulty**: Easy
**Support**: See documentation files
