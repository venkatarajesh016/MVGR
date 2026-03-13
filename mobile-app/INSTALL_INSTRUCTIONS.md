# Complete Installation Instructions

## Prerequisites

### Required Software
- **Node.js** v16 or higher
- **npm** v8 or higher
- **Expo CLI** (will be installed via npm)

### Check Your Versions
```bash
node --version
npm --version
```

If versions are too old, download from: https://nodejs.org/

---

## Step-by-Step Installation

### Step 1: Navigate to Mobile App Folder
```bash
cd mobile-app
```

### Step 2: Install Dependencies
```bash
npm install --legacy-peer-deps
```

**Why `--legacy-peer-deps`?**
- React Native 0.74 and react-native-maps have different React version requirements
- This flag allows npm to resolve the conflict and install all packages
- It's safe to use and commonly used in React Native projects

### Step 3: Wait for Installation
- Installation takes 3-5 minutes
- You'll see progress indicators
- Don't interrupt the process

### Step 4: Verify Installation
```bash
npm list react react-native expo
```

You should see output like:
```
├── react@18.3.0
├── react-native@0.74.0
└── expo@51.0.0
```

---

## If Installation Fails

### Option A: Clean Install
```bash
# Remove existing installations
rm -rf node_modules package-lock.json

# Clear npm cache
npm cache clean --force

# Install again
npm install --legacy-peer-deps
```

### Option B: Use Yarn Instead
```bash
# Install yarn globally
npm install -g yarn

# Install dependencies with yarn
yarn install
```

### Option C: Update npm
```bash
# Update npm to latest version
npm install -g npm@latest

# Try installation again
npm install --legacy-peer-deps
```

---

## After Successful Installation

### Step 1: Configure Backend URL
Edit `src/services/api.js`:
```javascript
const API_BASE_URL = 'http://192.168.1.100:5000';
```

Replace with your actual backend URL.

### Step 2: Install Expo CLI (if not already installed)
```bash
npm install -g expo-cli
```

### Step 3: Start Development Server
```bash
npm start
```

You should see:
```
Starting Expo server...
Tunnel ready.
Scan the QR code above with Expo Go (Android) or the Camera app (iOS)
```

### Step 4: Run on Device/Emulator
- **Android**: Press `a` in terminal
- **iOS**: Press `i` in terminal
- **Physical Device**: Scan QR code with Expo Go app

---

## Troubleshooting Installation

### Issue: "npm ERR! code ERESOLVE"
**Solution**:
```bash
npm install --legacy-peer-deps
```

### Issue: "npm ERR! 404 Not Found"
**Solution**:
```bash
npm cache clean --force
npm install --legacy-peer-deps
```

### Issue: "Module not found after installation"
**Solution**:
```bash
rm -rf node_modules
npm install --legacy-peer-deps
```

### Issue: "Expo command not found"
**Solution**:
```bash
npm install -g expo-cli
expo --version
```

### Issue: "Port 19000 already in use"
**Solution**:
```bash
# Kill the process using port 19000
# On Windows:
netstat -ano | findstr :19000
taskkill /PID <PID> /F

# Or just use a different port:
npm start -- --port 19001
```

---

## Verifying Installation

### Check Node Modules
```bash
ls node_modules | grep -E "react|expo|axios"
```

Should show:
- react
- react-native
- expo
- axios
- And many others

### Check Expo CLI
```bash
expo --version
```

Should show version number like `51.0.0`

### Check Package Installation
```bash
npm list --depth=0
```

Should show all top-level dependencies installed.

---

## System Requirements

### Minimum
- **RAM**: 4GB
- **Disk Space**: 2GB
- **Node.js**: v16+
- **npm**: v8+

### Recommended
- **RAM**: 8GB
- **Disk Space**: 5GB
- **Node.js**: v18+
- **npm**: v9+

---

## Platform-Specific Setup

### Android Setup
1. Install Android Studio
2. Create/start an emulator
3. Run `npm start`
4. Press `a` to launch on emulator

### iOS Setup (Mac Only)
1. Install Xcode
2. Run `npm start`
3. Press `i` to launch iOS Simulator

### Physical Device Setup
1. Install Expo Go app (App Store / Play Store)
2. Run `npm start`
3. Scan QR code with Expo Go

---

## Quick Commands Reference

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on web (testing)
npm run web

# Clear cache
npm start -- --clear

# Check installed packages
npm list --depth=0

# Update packages
npm update

# Install specific package
npm install package-name --legacy-peer-deps
```

---

## Next Steps After Installation

1. ✅ Install dependencies
2. ✅ Configure backend URL
3. ✅ Start development server
4. ✅ Test on emulator/device
5. ✅ Customize UI
6. ✅ Add features
7. ✅ Build for production

---

## Getting Help

### Documentation
- See `GETTING_STARTED.md` for first 30 minutes
- See `SETUP_GUIDE.md` for detailed setup
- See `README.md` for complete overview

### Resources
- Expo Docs: https://docs.expo.dev
- React Native Docs: https://reactnative.dev
- npm Docs: https://docs.npmjs.com

### Common Issues
- Check `DEPENDENCY_FIX.md` for dependency issues
- Check `QUICK_REFERENCE.md` for quick solutions
- Check backend logs if API calls fail

---

## Success Indicators

After successful installation, you should see:
- ✅ No error messages
- ✅ `node_modules` folder created
- ✅ `package-lock.json` file created
- ✅ All dependencies listed in `npm list`
- ✅ Expo server starts without errors
- ✅ QR code displayed in terminal

---

## Estimated Time

- **Installation**: 3-5 minutes
- **Configuration**: 1 minute
- **First Run**: 2-3 minutes
- **Total**: ~10 minutes

---

**Status**: Ready to Install
**Last Updated**: March 13, 2026
**Version**: 1.0.0
