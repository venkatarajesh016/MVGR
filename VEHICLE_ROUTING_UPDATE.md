# Vehicle Routing Update

## Changes Made

Updated the routing system to use **bike** or **car** instead of foot for navigation.

## Backend Changes

### 1. Navigation Route Handler (`backend/routes/navigation.js`)
- Added `vehicle` parameter to route endpoint
- Default vehicle type is now `bike`
- Supports both `bike` and `car` options
- GraphHopper API now uses the selected vehicle type
- Updated console logging to show vehicle type

### 2. API Service (`frontend/src/services/api.js`)
- Updated `getRoute` function to accept `vehicle` parameter
- Default vehicle is `bike`
- Vehicle type is passed to backend API

## Frontend Changes

### 3. Home Page (`frontend/src/pages/Home.jsx`)
- Added `vehicle` state (default: 'bike')
- Added vehicle selector UI with two options:
  - 🚴 Bike (default)
  - 🚗 Car
- Vehicle selector positioned at bottom-right of screen
- Selected vehicle is highlighted with blue background
- Vehicle type is passed to API when calculating routes

## UI Features

### Vehicle Selector
- Located at bottom-right corner above floating action buttons
- Glass morphism design matching the app theme
- Two buttons with emoji icons:
  - Bike button (🚴)
  - Car button (🚗)
- Active selection highlighted in blue
- Smooth animations on hover and click

## How It Works

1. User selects vehicle type (bike or car) from the selector
2. When user clicks "Navigate" to a destination
3. The selected vehicle type is sent to the backend
4. Backend uses the vehicle type for:
   - GraphHopper API routing (if API key configured)
   - Campus pathfinding (fallback)
5. Route is optimized for the selected vehicle type

## API Parameters

### Route Endpoint
```
GET /api/route?startLat=X&startLng=Y&endLat=X&endLng=Y&vehicle=bike
```

Parameters:
- `startLat`, `startLng` - Starting coordinates
- `endLat`, `endLng` - Destination coordinates
- `startBuilding` - Optional building name for start
- `endBuilding` - Optional building name for destination
- `vehicle` - Vehicle type: `bike` or `car` (default: `bike`)

## Testing

1. Open the app in your browser
2. Select a destination
3. Choose vehicle type (bike or car) from the selector
4. Click "Navigate"
5. Route will be calculated based on selected vehicle
6. Backend console will show: `🚴 Using campus pathfinding (bike)...` or `🚗 Using campus pathfinding (car)...`

## Notes

- Default vehicle is **bike** for campus navigation
- Vehicle selection persists during the session
- GraphHopper API (if configured) will use the selected vehicle profile
- Campus pathfinding works the same for both vehicles (uses road network)
