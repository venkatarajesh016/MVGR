# Campus Navigation System

A complete web application that helps students find classrooms and buildings on campus using interactive maps.

## Tech Stack

- **Frontend**: React.js, Mapbox GL JS, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **File Storage**: Local uploads folder
- **Map Data**: OpenStreetMap via Mapbox

## Features

- **Interactive campus map** with zoom, pan, and 3D buildings
- **Real-time user location** tracking with pulse animation
- **Smart search** with auto-suggestions and categorized results
- **Route navigation** from current location to destination with distance and time
- **Landmark assistance** (gates, library, hostels, cafeteria)
- **Image-based building identification** with photo galleries
- **CSV bulk import** for buildings and rooms
- **Modern UI/UX** with smooth animations and glass morphism effects
- **Mobile-first design** with responsive layouts
- **Accessibility features** for all users

## Project Structure

```
project-root/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── MapView.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   └── NavigationPanel.jsx
│   │   ├── pages/
│   │   │   └── Home.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── routes/
│   │   ├── buildings.js
│   │   ├── rooms.js
│   │   ├── landmarks.js
│   │   ├── navigation.js
│   │   └── csv.js
│   ├── models/
│   │   ├── Building.js
│   │   ├── Room.js
│   │   └── Landmark.js
│   ├── middleware/
│   │   └── upload.js
│   ├── uploads/
│   ├── server.js
│   ├── .env
│   └── package.json
└── README.md
```

## Installation Steps

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account
- Mapbox account (free tier)

### 1. Clone and Setup

```bash
# Navigate to project directory
cd campus-navigation-system
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
MAPBOX_TOKEN=your_mapbox_access_token
```

**Get MongoDB URI:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database password

**Get Mapbox Token:**
1. Go to [Mapbox](https://www.mapbox.com/)
2. Sign up for free account
3. Go to Account → Access tokens
4. Copy your default public token

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

The frontend now includes modern UI libraries:
- **Framer Motion**: Smooth animations and transitions
- **Lucide React**: Beautiful icon set
- **Tailwind CSS**: Utility-first styling

### 4. Run the Application

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

The application will be available at `http://localhost:3000`

## API Endpoints

### Buildings
- `GET /api/buildings` - Get all buildings
- `POST /api/buildings` - Create building (with image upload)

### Rooms
- `GET /api/rooms` - Get all rooms
- `POST /api/rooms` - Create room

### Landmarks
- `GET /api/landmarks` - Get all landmarks
- `POST /api/landmarks` - Create landmark (with image upload)

### Navigation
- `GET /api/search?query=` - Search buildings, rooms, departments
- `GET /api/route?startLat=&startLng=&endLat=&endLng=` - Get route

### CSV Import
- `POST /api/upload-csv` - Upload CSV file with building/room data

## CSV Import Format

Create a CSV file with the following columns:

```csv
type,name,lat,lng,description,buildingName,roomNumber,floor,department
building,Academic Block A,18.2351,83.4126,Main engineering building,,,
building,Library,18.2355,83.4130,Central library,,,
room,,,18.2352,83.4127,Academic Block A,101,1,Computer Science
room,,,18.2353,83.4128,Academic Block A,102,1,Electronics
landmark,Main Gate,18.2340,83.4120,Campus entrance,,,
```

## Example Data

Use the provided `example-data.csv` to populate your database with sample data.

## Adding Data via API

### Add a Building with Image

```bash
curl -X POST http://localhost:5000/api/buildings \
  -F "name=Academic Block A" \
  -F "lat=18.2351" \
  -F "lng=83.4126" \
  -F "description=Main engineering building" \
  -F "image=@/path/to/image.jpg"
```

### Add a Room

```bash
curl -X POST http://localhost:5000/api/rooms \
  -H "Content-Type: application/json" \
  -d '{
    "roomNumber": "101",
    "buildingId": "building_id_here",
    "floor": 1,
    "department": "Computer Science",
    "lat": 18.2352,
    "lng": 83.4127
  }'
```

## Usage

1. **View Map**: The map loads with all buildings, rooms, and landmarks
2. **Find Your Location**: Click the location button or allow browser location access
3. **Search**: Type building name, room number, or department in the search bar
4. **Navigate**: Select a destination and click "Navigate Here" to see the route
5. **View Details**: Click on any marker to see building/room information and images

## Deployment

### Backend Deployment (Heroku)

```bash
cd backend
heroku create your-app-name
heroku config:set MONGO_URI=your_mongodb_uri
heroku config:set MAPBOX_TOKEN=your_mapbox_token
git push heroku main
```

### Frontend Deployment (Vercel)

```bash
cd frontend
npm run build
vercel --prod
```

Update the API base URL in `frontend/src/services/api.js` to your deployed backend URL.

## Troubleshooting

**Map not loading:**
- Check if Mapbox token is correctly set in backend `.env`
- Verify the token is valid at mapbox.com

**Database connection error:**
- Verify MongoDB URI in `.env`
- Check if your IP is whitelisted in MongoDB Atlas
- Ensure database user has correct permissions

**Images not displaying:**
- Check if `uploads` folder exists in backend
- Verify file permissions
- Check if images are being served at `/uploads` route

**Location not working:**
- Enable location permissions in browser
- Use HTTPS in production (required for geolocation API)

## License

MIT


## UI/UX Features

### Modern Design
- **Glass morphism effects** on floating panels
- **Smooth animations** powered by Framer Motion
- **Custom markers** with emoji icons and hover effects
- **Gradient buttons** with shadow effects
- **Responsive layout** for mobile, tablet, and desktop

### Components
- **TopNavBar**: Sticky header with campus branding
- **SearchBar**: Auto-suggest search with categorized results
- **InfoDrawer**: Bottom sheet for location details
- **NavigationPanel**: Compact route information display
- **FloatingActionButtons**: Quick access to location and layers
- **MapView**: Enhanced Mapbox integration with 3D buildings

### Animations
- Slide-up drawer animations
- Staggered search results
- Pulse effect on user location
- Smooth map transitions
- Button hover and tap effects

### Color Scheme
- Primary: Blue (#2563EB)
- Secondary: Green (#10B981)
- Accent: Amber (#F59E0B)
- Background: Light Gray (#F9FAFB)

For detailed UI documentation, see [UI_IMPROVEMENTS.md](UI_IMPROVEMENTS.md)
