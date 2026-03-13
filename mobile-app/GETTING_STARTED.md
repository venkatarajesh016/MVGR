# Getting Started with Campus Navigation Mobile App

## 🎯 Your First 30 Minutes

### Minute 1-5: Setup
```bash
cd mobile-app
npm install
```

### Minute 6-10: Configure
1. Open `src/services/api.js`
2. Find: `const API_BASE_URL = 'http://your-backend-url';`
3. Replace with your backend URL
4. Save file

### Minute 11-15: Start
```bash
npm start
```

### Minute 16-25: Run
- **Android**: Press `a` in terminal
- **iOS**: Press `i` in terminal
- **Physical Device**: Scan QR code with Expo Go app

### Minute 26-30: Test
1. Sign up with test account
2. Grant location permission
3. Select a destination
4. Follow the navigation

---

## 📱 First Run Experience

### What You'll See

**Screen 1: Auth Screen**
- Sign up form
- Email, password, name fields
- Sign in toggle

**Screen 2: Map Screen**
- Full-screen map
- Your location (blue marker)
- Building markers
- "Select Destination" button

**Screen 3: Navigation**
- Route on map (blue line)
- Waypoint markers (green)
- Destination marker (red)
- Floating guidance panel

---

## 🔧 Configuration Checklist

### Essential Configuration

**Backend URL** (REQUIRED)
```javascript
// src/services/api.js
const API_BASE_URL = 'http://192.168.1.100:5000';
```

**Campus Location** (Optional)
```javascript
// src/screens/MapScreen.js
const CAMPUS_CENTER = {
  latitude: 17.3853,
  longitude: 78.4867,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};
```

**Location Accuracy** (Optional)
```javascript
// src/utils/location.js
accuracy: Location.Accuracy.High
```

---

## 🧪 Testing Workflow

### Test 1: Authentication
1. Open app
2. Tap "Sign Up"
3. Enter: name, email, password
4. Tap "Sign Up" button
5. ✅ Should see map screen

### Test 2: Map Display
1. On map screen
2. Check if map loads
3. Check if your location shows (blue marker)
4. Try zooming and panning
5. ✅ Should work smoothly

### Test 3: Destination Selection
1. Tap "Select Destination" button
2. See list of buildings
3. Try searching for a building
4. Tap a building
5. ✅ Should calculate route

### Test 4: Navigation
1. After selecting destination
2. See route on map (blue line)
3. See waypoints (green markers)
4. See guidance panel
5. ✅ Should show instructions

### Test 5: Real-Time Updates
1. During navigation
2. Move around (simulate with emulator)
3. Watch distance update
4. Watch waypoint advance
5. ✅ Should update in real-time

---

## 🐛 Common Issues & Quick Fixes

### Issue: "Cannot find module"
```bash
# Solution
npm install
npm start -- --clear
```

### Issue: "Backend URL not working"
```javascript
// Check if URL is correct
// Should be: http://192.168.1.100:5000
// Not: http://localhost:5000 (won't work on device)
```

### Issue: "Location permission denied"
- iOS: Settings → Privacy → Location → Allow
- Android: Settings → Apps → Permissions → Location

### Issue: "Map not loading"
- Check internet connection
- Verify backend URL
- Restart Expo server

### Issue: "Route not calculating"
- Ensure backend is running
- Check backend logs
- Verify coordinates are valid

---

## 📚 Documentation Quick Links

| Need | File |
|------|------|
| Complete overview | README.md |
| Installation help | SETUP_GUIDE.md |
| Feature details | FEATURES_GUIDE.md |
| Configuration | IMPORTANT_NOTES.md |
| Quick lookup | QUICK_REFERENCE.md |
| Folder layout | FOLDER_STRUCTURE.md |

---

## 🎨 Customization Ideas

### Change Colors
```javascript
// In any component
backgroundColor: '#2563EB'  // Blue
backgroundColor: '#10B981'  // Green
backgroundColor: '#F59E0B'  // Amber
```

### Change Campus Center
```javascript
// src/screens/MapScreen.js
const CAMPUS_CENTER = {
  latitude: YOUR_LAT,
  longitude: YOUR_LNG,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};
```

### Change App Name
```json
// app.json
{
  "expo": {
    "name": "Your App Name",
    "slug": "your-app-slug"
  }
}
```

---

## 🚀 Next Steps

### Immediate (Today)
- [ ] Install dependencies
- [ ] Configure backend URL
- [ ] Start dev server
- [ ] Test on emulator

### This Week
- [ ] Test all features
- [ ] Customize colors
- [ ] Add app icon
- [ ] Test on physical device

### This Month
- [ ] Build for production
- [ ] Configure app signing
- [ ] Prepare app store listings
- [ ] Submit to app stores

---

## 💡 Pro Tips

### Development
- Use `npm start -- --clear` to clear cache
- Check console logs in terminal
- Use Expo menu (shake device) for debugging
- Test on multiple devices

### Performance
- Keep location updates throttled
- Lazy load markers
- Cache building data
- Minimize re-renders

### Security
- Always use HTTPS in production
- Keep JWT_SECRET safe
- Validate all inputs
- Don't log sensitive data

---

## 🎓 Learning Path

### Day 1: Setup & Basics
- [ ] Install and run app
- [ ] Understand folder structure
- [ ] Read README.md
- [ ] Test basic features

### Day 2: Features
- [ ] Read FEATURES_GUIDE.md
- [ ] Explore source code
- [ ] Test all features
- [ ] Understand API integration

### Day 3: Customization
- [ ] Customize colors
- [ ] Update campus location
- [ ] Add app icon
- [ ] Modify UI

### Day 4: Deployment
- [ ] Build for production
- [ ] Test thoroughly
- [ ] Prepare app store listings
- [ ] Submit to stores

---

## 📞 Getting Help

### Documentation
1. Check README.md
2. Check SETUP_GUIDE.md
3. Check FEATURES_GUIDE.md
4. Check QUICK_REFERENCE.md

### Debugging
1. Check console logs
2. Check backend logs
3. Check network requests
4. Check device settings

### Resources
- Expo: https://docs.expo.dev
- React Native: https://reactnative.dev
- Stack Overflow: Tag `react-native`

---

## ✅ Success Checklist

- [ ] App installed and running
- [ ] Backend URL configured
- [ ] Can sign up/login
- [ ] Map displays correctly
- [ ] Location tracking works
- [ ] Can select destination
- [ ] Route calculates
- [ ] Navigation panel shows
- [ ] Real-time updates work
- [ ] No console errors

---

## 🎉 You're All Set!

You now have a fully functional mobile app. Start exploring and customizing it to fit your needs.

### Quick Commands

```bash
# Start development
npm start

# Clear cache
npm start -- --clear

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on web (testing)
npm run web
```

---

## 🚀 Ready to Build?

Once you're comfortable with the app:

```bash
# Build for Android
eas build --platform android

# Build for iOS
eas build --platform ios

# Submit to stores
eas submit --platform android
eas submit --platform ios
```

---

## 📝 Important Notes

⚠️ **Before Running**:
- Update backend URL
- Ensure backend is running
- Verify API endpoints exist

⚠️ **Before Deployment**:
- Update backend URL to production
- Test all features
- Update app version
- Add app icon

---

## 🎊 Congratulations!

You're ready to start developing your mobile app. Have fun and happy coding!

For detailed information, check the other documentation files.

---

**Last Updated**: March 13, 2026
**Status**: Ready to Use
**Version**: 1.0.0
