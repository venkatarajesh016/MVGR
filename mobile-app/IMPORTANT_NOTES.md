# Important Notes for Mobile App Development

## Before You Start

### 1. Backend URL Configuration
**CRITICAL**: Update the backend URL in `src/services/api.js` before running the app.

```javascript
// Current (placeholder)
const API_BASE_URL = 'http://your-backend-url';

// Update to your actual backend
const API_BASE_URL = 'http://192.168.1.100:5000'; // Development
const API_BASE_URL = 'https://api.yourdomain.com'; // Production
```

### 2. Required Backend Endpoints
Ensure your backend has these endpoints:
- `GET /buildings` - List all buildings
- `GET /rooms` - List all rooms
- `GET /route` - Calculate route (params: startLat, startLng, endLat, endLng)
- `GET /waypoints/:routeId` - Get waypoints
- `POST /auth/login` - User login
- `POST /auth/register` - User registration

### 3. Location Permissions
The app requires location permissions to function:
- **iOS**: Automatically configured in `app.json`
- **Android**: Automatically configured in `app.json`
- Users will be prompted on first launch

---

## Architecture Decisions

### Why React Native + Expo?
- Single codebase for iOS and Android
- Fast development with hot reload
- Easy deployment with Expo
- No need for native code knowledge

### Why react-native-maps?
- Native performance
- Works offline (with cached tiles)
- Supports multiple providers
- Better than web-based solutions

### Why expo-location?
- Simple API
- Handles permissions automatically
- Works on both platforms
- Real-time tracking support

### Why JWT Authentication?
- Stateless authentication
- Secure token storage with expo-secure-store
- Works with existing backend
- Easy to implement

---

## Key Implementation Details

### State Management
- Uses React hooks (useState, useEffect, useRef)
- Context API for authentication
- No Redux (kept simple for MVP)

### API Communication
- Axios for HTTP requests
- Automatic token injection
- Error handling with try-catch
- Timeout set to 10 seconds

### Location Tracking
- Continuous GPS updates (1 second interval)
- 10-meter minimum distance threshold
- High accuracy mode
- Automatic permission handling

### Route Rendering
- Polyline for route visualization
- Markers for waypoints
- Automatic map fitting
- Smooth animations

---

## Performance Considerations

### Optimization Strategies
1. **Lazy Loading**: Buildings loaded on demand
2. **Throttled Updates**: Location updates limited to 1 second
3. **Efficient Rendering**: Minimal re-renders with proper dependencies
4. **Memory Management**: Cleanup in useEffect return functions

### Battery Optimization
- Location updates only when app is active
- Map rendering optimized
- No background tasks by default

### Network Optimization
- Single API call for route calculation
- Cached building data
- Minimal payload sizes

---

## Security Best Practices

### Implemented
- ✅ JWT tokens stored securely (expo-secure-store)
- ✅ Authorization headers on all requests
- ✅ HTTPS recommended for production
- ✅ No sensitive data in logs

### Recommendations
- Use HTTPS in production
- Implement token refresh mechanism
- Add rate limiting on backend
- Validate all user inputs
- Use environment variables for secrets

---

## Testing Checklist

### Before Deployment
- [ ] Backend URL configured correctly
- [ ] All API endpoints working
- [ ] Location permissions granted
- [ ] Route calculation tested
- [ ] Navigation panel updates correctly
- [ ] Authentication flow works
- [ ] App doesn't crash on errors
- [ ] Performance acceptable
- [ ] Battery usage reasonable

### Test Scenarios
1. **First Launch**: Sign up → Grant permissions → See map
2. **Navigation**: Select destination → View route → Follow waypoints
3. **Error Handling**: Offline → Wrong credentials → Invalid location
4. **Performance**: Multiple routes → Long navigation → Rapid location changes

---

## Common Customizations

### Change Campus Center
Edit `src/screens/MapScreen.js`:
```javascript
const CAMPUS_CENTER = {
  latitude: 17.3853,      // Your latitude
  longitude: 78.4867,     // Your longitude
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};
```

### Change Colors
Update throughout components:
```javascript
backgroundColor: '#2563EB'  // Primary blue
backgroundColor: '#10B981'  // Green
backgroundColor: '#F59E0B'  // Amber
```

### Change Location Accuracy
Edit `src/utils/location.js`:
```javascript
accuracy: Location.Accuracy.High    // High, Medium, Low
```

### Change Update Interval
Edit `src/utils/location.js`:
```javascript
timeInterval: 1000,      // 1 second
distanceInterval: 10,    // 10 meters
```

---

## Deployment Checklist

### Before Building
- [ ] Update backend URL to production
- [ ] Test all features thoroughly
- [ ] Update app version in `app.json`
- [ ] Add app icon and splash screen
- [ ] Configure app name and slug
- [ ] Set up privacy policy
- [ ] Prepare app store listings

### Android Deployment
- [ ] Generate signing key
- [ ] Configure app signing
- [ ] Test on multiple devices
- [ ] Submit to Google Play Store

### iOS Deployment
- [ ] Create Apple Developer account
- [ ] Configure provisioning profiles
- [ ] Test on multiple devices
- [ ] Submit to App Store

---

## Troubleshooting Guide

### App Won't Start
```bash
# Clear cache and reinstall
npm start -- --clear
npm install
```

### Map Not Loading
- Check internet connection
- Verify backend URL
- Check Google Maps API key (Android)
- Restart Expo server

### Location Not Working
- Check permissions in device settings
- Enable GPS
- Restart app
- Check location accuracy setting

### Route Not Calculating
- Verify backend is running
- Check API endpoint
- Ensure coordinates are valid
- Check network connection

### Authentication Fails
- Verify backend auth endpoints
- Check JWT_SECRET on backend
- Clear app cache
- Reinstall app

---

## Future Enhancement Ideas

### Phase 2
- [ ] Voice-guided navigation
- [ ] Offline map support
- [ ] Favorite locations
- [ ] Route history
- [ ] Dark mode

### Phase 3
- [ ] Social features (share routes)
- [ ] Real-time crowding data
- [ ] Event integration
- [ ] AR navigation
- [ ] Multiple language support

### Phase 4
- [ ] Accessibility features
- [ ] Advanced search filters
- [ ] Route preferences
- [ ] Notifications
- [ ] Analytics

---

## Support Resources

### Documentation
- Expo: https://docs.expo.dev
- React Native: https://reactnative.dev
- React Native Maps: https://github.com/react-native-maps/react-native-maps
- Axios: https://axios-http.com

### Community
- Expo Discord: https://discord.gg/expo
- React Native Community: https://github.com/react-native-community
- Stack Overflow: Tag `react-native`

### Tools
- Expo Go App: Download from App Store / Play Store
- Android Studio: For emulator
- Xcode: For iOS simulator (Mac only)

---

## Version History

### v1.0.0 (Current)
- Initial release
- Map display with real-time location
- Route calculation and navigation
- Authentication system
- Waypoint guidance
- Building/room selection

---

## Contact & Support

For issues or questions:
1. Check SETUP_GUIDE.md
2. Review FEATURES_GUIDE.md
3. Check troubleshooting section above
4. Review backend logs
5. Check Expo documentation

---

**Last Updated**: March 13, 2026
**Status**: Ready for Development
