# Mobile App Features Guide

## Overview

The Campus Navigation Mobile App provides a complete navigation experience optimized for mobile devices. This guide explains each feature and how to use it.

---

## 1. Authentication

### Sign Up
- Create new account with name, email, and password
- Credentials stored securely
- JWT token saved locally

### Sign In
- Login with email and password
- Token persists across app sessions
- Auto-logout on token expiry

**Implementation**: `src/screens/AuthScreen.js`

---

## 2. Map Display

### Features
- Full-screen interactive map
- Centered on user's current location
- Multiple tile layers (OpenStreetMap)
- Zoom and pan controls
- Building markers with labels

### User Location
- Automatic GPS detection
- Blue marker shows current position
- Updates in real-time as you move
- Accuracy indicator

**Implementation**: `src/screens/MapScreen.js`

---

## 3. Destination Selection

### Methods

**Method 1: Tap Building on Map**
1. View map with building markers
2. Tap any building marker
3. Route automatically calculates

**Method 2: Use Destination Selector**
1. Tap "Select Destination" button
2. Browse buildings list
3. Search by name
4. Tap to select

**Implementation**: `src/components/DestinationSelector.js`

---

## 4. Route Calculation

### How It Works
1. Gets user's current location
2. Fetches destination coordinates
3. Calls backend routing API
4. Displays route on map
5. Extracts waypoints

### Route Display
- Blue polyline shows path
- Green marker = start point
- Red marker = destination
- Route follows actual roads

**Implementation**: `src/screens/MapScreen.js`

---

## 5. Navigation Guidance Panel

### Components

**Header Section**
- Destination name
- Distance to destination
- Close button

**Progress Section**
- Progress bar (waypoints completed)
- Current waypoint count

**Instruction Section**
- Current waypoint name
- Navigation instruction
- Distance to next checkpoint

**Waypoints List**
- All waypoints in order
- Current waypoint highlighted
- Tap to view details

### Auto-Updates
- Updates every 1 second
- Recalculates distance as you move
- Advances waypoint when nearby
- Shows next instruction

**Implementation**: `src/components/NavigationPanel.js`

---

## 6. Waypoint Markers

### Marker Types

**Start Marker** (Green)
- Your current location
- Updates in real-time

**Waypoint Markers** (Green)
- Navigation checkpoints
- Shows instruction on tap
- Advances automatically when reached

**Destination Marker** (Red)
- Final destination
- Shows building name

### Waypoint Information
- Name/location
- Navigation instruction
- Distance from current position
- Order in route

---

## 7. Real-Time Location Tracking

### Features
- Continuous GPS updates
- 1-second update interval
- 10-meter minimum distance threshold
- High accuracy mode

### Permissions
- Requested on first launch
- Can be changed in device settings
- Required for navigation

**Implementation**: `src/utils/location.js`

---

## 8. Search Functionality

### Search Buildings
1. Open Destination Selector
2. Type building name
3. Results filter in real-time
4. Tap to select

### Search Features
- Case-insensitive
- Partial name matching
- Instant results
- Clear search button

**Implementation**: `src/components/DestinationSelector.js`

---

## 9. Route Management

### Clear Route
- Tap close button in navigation panel
- Route removed from map
- Markers cleared
- Ready for new destination

### Multiple Routes
- Select new destination to replace route
- Previous route automatically cleared
- New route calculated

---

## 10. Offline Capabilities

### Currently Available
- View cached building data
- See previous routes (if cached)
- Access stored user profile

### Future Enhancements
- Offline map tiles
- Cached routes
- Offline search

---

## 11. Performance Features

### Optimization
- Lazy loading of markers
- Efficient polyline rendering
- Throttled location updates
- Minimal re-renders

### Battery Optimization
- Location updates only when needed
- Screen-off detection
- Efficient map rendering

---

## 12. Accessibility

### Current Features
- Large touch targets
- High contrast colors
- Clear typography
- Descriptive labels

### Future Enhancements
- Voice guidance
- Screen reader support
- Haptic feedback
- Keyboard navigation

---

## Usage Scenarios

### Scenario 1: First-Time User
1. Install app
2. Sign up with email
3. Grant location permission
4. See map with current location
5. Select destination
6. Follow navigation

### Scenario 2: Regular Navigation
1. Open app (auto-login)
2. Map loads with location
3. Select destination
4. Follow waypoints
5. Arrive at destination

### Scenario 3: Exploring Campus
1. Open app
2. Browse buildings on map
3. Tap building to see details
4. Calculate route if interested
5. Navigate or dismiss

---

## Advanced Features

### Distance Calculation
- Uses Haversine formula
- Accurate to ~10 meters
- Real-time updates

### Waypoint Detection
- Automatically advances when within 50 meters
- Shows next instruction
- Updates progress bar

### Route Optimization
- Uses OSRM routing engine
- Follows actual roads
- Pedestrian-friendly paths

---

## Settings & Customization

### Current Settings
- Backend URL (in code)
- Location accuracy
- Update intervals
- Map region

### Future Settings
- Theme (light/dark)
- Language
- Units (km/miles)
- Notification preferences

---

## Troubleshooting Features

### If Route Doesn't Calculate
1. Check internet connection
2. Verify backend is running
3. Ensure coordinates are valid
4. Try different destination

### If Location Not Updating
1. Check location permissions
2. Enable GPS on device
3. Restart app
4. Check signal strength

### If Map Not Loading
1. Verify internet connection
2. Check backend URL
3. Restart Expo server
4. Clear app cache

---

## Tips & Tricks

### Faster Navigation
- Tap building directly on map
- Use search for quick access
- Bookmark frequent destinations

### Better Accuracy
- Keep GPS enabled
- Walk in open areas
- Avoid tall buildings

### Battery Saving
- Close app when not in use
- Disable location when not navigating
- Use WiFi instead of cellular

---

## Feature Roadmap

### Phase 1 (Current)
- ✅ Map display
- ✅ Route calculation
- ✅ Real-time navigation
- ✅ Authentication

### Phase 2 (Planned)
- Voice guidance
- Offline maps
- Favorite locations
- Route history

### Phase 3 (Future)
- Social sharing
- Real-time crowding
- Event integration
- AR navigation

---

For more information, see README.md or SETUP_GUIDE.md
