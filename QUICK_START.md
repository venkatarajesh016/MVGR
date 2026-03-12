# Quick Start Guide - Campus Navigation System

## Installation

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
Create `backend/.env` file:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
MAPBOX_TOKEN=your_mapbox_access_token
```

### 3. Install Frontend Dependencies
```bash
cd frontend
npm install
```

## Running the Application

### Start Backend Server
```bash
cd backend
npm start
```
Server runs on http://localhost:5000

### Start Frontend Development Server
```bash
cd frontend
npm run dev
```
Application opens at http://localhost:3000

## Using the Application

### Search for Locations
1. Click the search bar at the top
2. Type building name, room number, or department
3. Select from auto-suggested results
4. View location details in the info drawer

### Navigate to a Location
1. Search or click a marker on the map
2. Click "Navigate Here" button
3. View route, distance, and estimated time
4. Follow the blue line on the map

### View Your Location
1. Click the navigation button (bottom right)
2. Allow browser location access
3. See your position with a pulsing red marker

## Import Sample Data

Upload the `example-data.csv` file using the API:
```bash
curl -X POST http://localhost:5000/api/upload-csv \
  -F "csv=@example-data.csv"
```

## Troubleshooting

**Map not loading?**
- Check Mapbox token in backend/.env
- Verify token at mapbox.com

**Database connection error?**
- Verify MongoDB URI in backend/.env
- Check IP whitelist in MongoDB Atlas

**Location not working?**
- Enable location permissions in browser
- Use HTTPS in production

## Next Steps

- Add your campus buildings via API
- Upload building images
- Customize map center coordinates
- Deploy to production

For detailed documentation, see README.md and UI_IMPROVEMENTS.md
