# Quick Reference Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install
```bash
cd mobile-app
npm install
```

### Step 2: Configure
Edit `src/services/api.js`:
```javascript
const API_BASE_URL = 'http://192.168.1.100:5000';
```

### Step 3: Start
```bash
npm start
```

### Step 4: Run
- Android: Press `a`
- iOS: Press `i`
- Physical: Scan QR code

### Step 5: Test
- Sign up with test account
- Grant location permission
- Select destination
- Follow navigation

---

## 📁 File Quick Reference

| File | Purpose |
|------|---------|
| `App.js` | Root component, navigation setup |
| `src/screens/MapScreen.js` | Main map and navigation |
| `src/screens/AuthScreen.js` | Login/signup |
| `src/components/NavigationPanel.js` | Floating guidance |
| `src/services/api.js` | API client |
| `src/utils/location.js` | GPS utilities |
| `app.json` | Expo configuration |
| `package.json` | Dependencies |

---

## 🔧 Common Customizations

### Change Backend URL
```javascript
// src/services/api.js
const API_BASE_URL = 'http://your-url:5000';
```

### Change Campus Location
```javascript
// src/screens/MapScreen.js
const CAMPUS_CENTER = {
  latitude: 17.3853,
  longitude: 78.4867,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};
```

### Change Colors
```javascript
// Throughout components
backgroundColor: '#2563EB'  // Blue
backgroundColor: '#10B981'  // Green
backgroundColor: '#F59E0B'  // Amber
```

### Change Location Update Interval
```javascript
// src/utils/location.js
timeInterval: 1000,      // milliseconds
distanceInterval: 10,    // meters
```

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Map not loading | Check internet, verify backend URL |
| Location not working | Check permissions, enable GPS |
| Route not calculating | Verify backend is running |
| App won't start | Run `npm start -- --clear` |
| Authentication fails | Check backend auth endpoints |

---

## 📱 Testing Checklist

- [ ] Backend URL configured
- [ ] Backend server running
- [ ] Location permissions granted
- [ ] Can sign up/login
- [ ] Map displays with location
- [ ] Can select destination
- [ ] Route calculates correctly
- [ ] Navigation panel updates
- [ ] No console errors

---

## 🎯 Key Features

| Feature | File |
|---------|------|
| Map Display | `MapScreen.js` |
| Real-time Location | `location.js` |
| Route Calculation | `MapScreen.js` |
| Navigation Guidance | `NavigationPanel.js` |
| Authentication | `AuthScreen.js` |
| Destination Selection | `DestinationSelector.js` |

---

## 📚 Documentation

| Document | Content |
|----------|---------|
| `README.md` | Full overview |
| `SETUP_GUIDE.md` | Installation steps |
| `FEATURES_GUIDE.md` | Feature details |
| `IMPORTANT_NOTES.md` | Critical config |
| `PROJECT_SUMMARY.md` | Project overview |
| `QUICK_REFERENCE.md` | This file |

---

## 🔑 Required API Endpoints

```
GET /buildings              # List buildings
GET /rooms                  # List rooms
GET /route                  # Calculate route
GET /waypoints/:id          # Get waypoints
POST /auth/login            # User login
POST /auth/register         # User registration
```

---

## 💾 Environment Setup

### Backend URL
```javascript
// Development
const API_BASE_URL = 'http://192.168.1.100:5000';

// Production
const API_BASE_URL = 'https://api.yourdomain.com';
```

### Location Accuracy
```javascript
// High, Medium, Low
accuracy: Location.Accuracy.High
```

---

## 🚢 Deployment

### Android
```bash
eas build --platform android
eas submit --platform android
```

### iOS
```bash
eas build --platform ios
eas submit --platform ios
```

---

## 📊 Project Stats

- **Total Files**: 15
- **Screens**: 3
- **Components**: 2
- **Services**: 1
- **Utils**: 1
- **Documentation**: 6
- **Lines of Code**: ~1500
- **Setup Time**: 5 minutes

---

## 🎨 Design System

### Colors
- Primary Blue: `#2563EB`
- Green: `#10B981`
- Amber: `#F59E0B`
- Gray: `#6B7280`
- Light Gray: `#F9FAFB`

### Spacing
- Small: 8px
- Medium: 16px
- Large: 24px
- XL: 32px

### Border Radius
- Small: 4px
- Medium: 8px
- Large: 16px

---

## 🔐 Security

- ✅ JWT tokens stored securely
- ✅ Authorization headers on requests
- ✅ HTTPS recommended
- ✅ No sensitive data in logs

---

## ⚡ Performance Tips

1. Use high accuracy only when needed
2. Throttle location updates
3. Lazy load markers
4. Cache building data
5. Minimize re-renders

---

## 📞 Support

1. Check SETUP_GUIDE.md
2. Review FEATURES_GUIDE.md
3. See IMPORTANT_NOTES.md
4. Check Expo docs
5. Review backend logs

---

## 🎓 Learning Resources

- Expo: https://docs.expo.dev
- React Native: https://reactnative.dev
- React Native Maps: https://github.com/react-native-maps/react-native-maps
- Axios: https://axios-http.com

---

## ✅ Pre-Launch Checklist

- [ ] Backend URL updated
- [ ] All features tested
- [ ] No console errors
- [ ] Performance acceptable
- [ ] Battery usage reasonable
- [ ] Permissions working
- [ ] Error handling tested
- [ ] Documentation reviewed

---

## 🚀 Next Steps

1. Install dependencies
2. Configure backend URL
3. Start development server
4. Test on emulator
5. Customize UI
6. Add features
7. Build for production
8. Deploy to app stores

---

**Last Updated**: March 13, 2026
**Version**: 1.0.0
**Status**: Ready to Use
