# Campus Navigation Mobile App

A React Native mobile application for campus navigation using Expo, built to replicate the web version's functionality with mobile-optimized UI and performance.

## Features

- **Interactive Map Display**: Full-screen map using react-native-maps
- **Real-time Location Tracking**: GPS-based user location with expo-location
- **Route Navigation**: Calculate and display routes between locations
- **Waypoint Markers**: Show navigation checkpoints with instructions
- **Navigation Guidance**: Floating panel with real-time navigation updates
- **Building/Room Selection**: Browse and select destinations
- **Authentication**: Secure login/signup with JWT tokens
- **Responsive Design**: Optimized for both Android and iOS

## Project Structure

```
mobile-app/
├── src/
│   ├── screens/
│   │   ├── MapScreen.js           # Main map and navigation screen
│   │   ├── AuthScreen.js          # Login/signup screen
│   │   └── DestinationScreen.js   # Building/room selection
│   ├── components/
│   │   ├── NavigationPanel.js     # Floating navigation guidance
│   │   └── DestinationSelector.js # Destination picker modal
│   ├── services/
│   │   └── api.js                 # API client with axios
│   ├── utils/
│   │   └── location.js            # Location utilities
│   └── context/
│       └── AuthContext.js         # Auth state management
├── App.js                         # Root component with navigation
├── app.json                       # Expo configuration
├── package.json                   # Dependencies
└── babel.config.js               # Babel configuration
```

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- iOS Simulator (Mac) or Android Emulator

### Setup Steps

1. **Install dependencies**:
   ```bash
   cd mobile-app
   npm install
   ```

2. **Configure backend URL**:
   - Open `src/services/api.js`
   - Update `API_BASE_URL` with your backend server URL
   - Example: `http://192.168.1.100:5000`

3. **Start the app**:
   ```bash
   npm start
   ```

4. **Run on device/emulator**:
   - Press `a` for Android emulator
   - Press `i` for iOS simulator
   - Scan QR code with Expo Go app on physical device

## Key Components

### MapScreen.js
Main navigation screen with:
- Full-screen map centered on user location
- Building markers for all campus locations
- Route polyline visualization
- Waypoint markers along the route
- Destination selector button
- Real-time location tracking

### NavigationPanel.js
Floating panel showing:
- Destination name and distance
- Progress bar (waypoints completed)
- Current instruction and waypoint details
- Scrollable list of all waypoints
- Auto-updates as user moves

### AuthScreen.js
Authentication interface with:
- Sign in / Sign up toggle
- Email and password fields
- Name field for new users
- Secure token storage using expo-secure-store

### DestinationSelector.js
Modal for selecting destinations:
- Search functionality
- Building list with descriptions
- Tap to select and calculate route

## API Integration

The app connects to your existing backend API. Required endpoints:

```
GET /buildings              # List all buildings
GET /buildings/:id          # Get building details
GET /rooms                  # List all rooms
GET /rooms?building=:id     # Get rooms by building
GET /landmarks              # List all landmarks
GET /route                  # Calculate route
  Params: startLat, startLng, endLat, endLng
GET /waypoints/:routeId     # Get waypoints for route
POST /auth/login            # User login
POST /auth/register         # User registration
```

## Location Permissions

The app requires location permissions:

**iOS**: Add to `app.json`:
```json
"infoPlist": {
  "NSLocationWhenInUseUsageDescription": "...",
  "NSLocationAlwaysAndWhenInUseUsageDescription": "..."
}
```

**Android**: Permissions are auto-configured via `app.json` plugins

## Configuration

### Backend URL
Update in `src/services/api.js`:
```javascript
const API_BASE_URL = 'http://your-backend-url';
```

### Map Region
Default campus center in `MapScreen.js`:
```javascript
const CAMPUS_CENTER = {
  latitude: 17.3853,
  longitude: 78.4867,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};
```

### Location Accuracy
Adjust in `src/utils/location.js`:
```javascript
accuracy: Location.Accuracy.High  // or Medium, Low
```

## Building & Deployment

### Android
```bash
eas build --platform android
```

### iOS
```bash
eas build --platform ios
```

### Web (Testing)
```bash
npm run web
```

## Troubleshooting

### Location not updating
- Check location permissions in device settings
- Ensure GPS is enabled
- Verify `expo-location` is properly installed

### Map not loading
- Confirm Google Maps API key is set (Android)
- Check internet connection
- Verify map provider is available

### Route not calculating
- Ensure backend server is running
- Check API_BASE_URL is correct
- Verify coordinates are valid

### Authentication issues
- Clear app cache and reinstall
- Check JWT_SECRET in backend
- Verify token storage with expo-secure-store

## Performance Optimization

- Map uses `PROVIDER_GOOGLE` for better performance
- Location updates throttled to 1 second intervals
- Route polylines optimized with minimal coordinates
- Lazy loading of building markers
- Efficient state management with React hooks

## Security

- JWT tokens stored securely with expo-secure-store
- API requests include authorization headers
- HTTPS recommended for production
- Sensitive data not logged to console

## Future Enhancements

- Offline map support with cached tiles
- Voice-guided navigation
- Multiple route options
- Favorite locations
- Social features (share routes)
- Accessibility improvements
- Dark mode support

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review backend API logs
3. Check Expo documentation: https://docs.expo.dev
4. React Native Maps: https://github.com/react-native-maps/react-native-maps

## License

MIT
