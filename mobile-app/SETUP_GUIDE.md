# Mobile App Setup Guide

## Quick Start

### 1. Install Expo CLI
```bash
npm install -g expo-cli
```

### 2. Install Dependencies
```bash
cd mobile-app
npm install
```

### 3. Configure Backend Connection
Edit `src/services/api.js` and update:
```javascript
const API_BASE_URL = 'http://192.168.1.100:5000'; // Your backend URL
```

### 4. Start Development Server
```bash
npm start
```

### 5. Run on Device/Emulator
- **Android**: Press `a` (requires Android Studio emulator)
- **iOS**: Press `i` (requires Xcode on Mac)
- **Physical Device**: Scan QR code with Expo Go app

---

## Platform-Specific Setup

### Android Setup

**Requirements**:
- Android Studio installed
- Android SDK (API 21+)
- Java Development Kit (JDK)

**Steps**:
1. Open Android Studio
2. Create/start an emulator (AVD Manager)
3. Run `npm start` in mobile-app folder
4. Press `a` to launch on emulator

**Troubleshooting**:
- If emulator doesn't start: `emulator -list-avds` to see available devices
- Clear cache: `npm start -- --clear`

### iOS Setup (Mac Only)

**Requirements**:
- Xcode installed
- iOS Simulator
- CocoaPods

**Steps**:
1. Run `npm start`
2. Press `i` to launch iOS Simulator
3. Simulator will open automatically

**Troubleshooting**:
- If pods fail: `cd ios && pod install && cd ..`
- Clear cache: `npm start -- --clear`

### Physical Device Setup

**Requirements**:
- Expo Go app installed (iOS App Store / Google Play)
- Same WiFi network as development machine

**Steps**:
1. Run `npm start`
2. Scan QR code with Expo Go app
3. App loads on your device

---

## Environment Configuration

### Backend URL Configuration

**Development**:
```javascript
// src/services/api.js
const API_BASE_URL = 'http://192.168.1.100:5000';
```

**Production**:
```javascript
const API_BASE_URL = 'https://api.yourdomain.com';
```

### Location Permissions

**iOS** (`app.json`):
```json
{
  "expo": {
    "ios": {
      "infoPlist": {
        "NSLocationWhenInUseUsageDescription": "This app needs access to your location to show your position on the campus map.",
        "NSLocationAlwaysAndWhenInUseUsageDescription": "This app needs access to your location for navigation."
      }
    }
  }
}
```

**Android** (`app.json`):
```json
{
  "expo": {
    "android": {
      "permissions": [
        "android.permission.ACCESS_FINE_LOCATION",
        "android.permission.ACCESS_COARSE_LOCATION"
      ]
    }
  }
}
```

---

## Testing the App

### Test Workflow

1. **Launch App**
   - See splash screen
   - Navigate to auth screen

2. **Authentication**
   - Sign up with test account
   - Or sign in with existing account

3. **Map Screen**
   - Map loads with user location
   - Building markers visible
   - Tap "Select Destination" button

4. **Route Calculation**
   - Select a building
   - Route displays on map
   - Navigation panel appears

5. **Navigation**
   - View waypoints
   - See distance to next checkpoint
   - Panel updates as you move

### Test Data

Use these test coordinates:
- **Campus Center**: 17.3853, 78.4867
- **Building 1**: 17.3862, 78.4874
- **Building 2**: 17.3845, 78.4860

---

## Common Issues & Solutions

### Issue: "Cannot find module 'react-native-maps'"
**Solution**:
```bash
npm install react-native-maps
npm start -- --clear
```

### Issue: "Location permission denied"
**Solution**:
- iOS: Settings → Privacy → Location → Allow
- Android: Settings → Apps → Permissions → Location

### Issue: "Map not loading"
**Solution**:
- Check internet connection
- Verify backend URL is correct
- Restart Expo server: `npm start -- --clear`

### Issue: "Route calculation fails"
**Solution**:
- Ensure backend server is running
- Check backend logs for errors
- Verify coordinates are valid

### Issue: "Emulator won't start"
**Solution**:
```bash
# List available emulators
emulator -list-avds

# Start specific emulator
emulator -avd <emulator_name>
```

---

## Development Tips

### Hot Reload
- Save file → App reloads automatically
- For native changes: Restart Expo server

### Debugging
- Open Expo menu: Shake device or press `m` in terminal
- Select "Debug remote JS"
- Chrome DevTools opens

### Console Logs
- View in terminal where `npm start` is running
- Or in Chrome DevTools console

### Performance Monitoring
- Expo menu → Performance Monitor
- Check FPS and memory usage

---

## Building for Production

### Android APK
```bash
eas build --platform android --local
```

### iOS IPA
```bash
eas build --platform ios --local
```

### Web Build
```bash
npm run web
```

---

## Deployment

### Using Expo Hosting
```bash
eas build --platform android
eas build --platform ios
eas submit --platform android
eas submit --platform ios
```

### Self-Hosted
1. Build APK/IPA locally
2. Upload to your app store
3. Configure backend URL for production

---

## Next Steps

1. ✅ Install dependencies
2. ✅ Configure backend URL
3. ✅ Start development server
4. ✅ Test on emulator/device
5. ✅ Customize UI/features
6. ✅ Build for production

For more help, see README.md or visit https://docs.expo.dev
