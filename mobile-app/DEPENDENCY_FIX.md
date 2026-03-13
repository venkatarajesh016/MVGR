# Dependency Installation Fix

## Issue
npm install failed due to React version conflicts between React Native and react-native-maps.

## Solution

### Option 1: Use Legacy Peer Deps (Recommended)
```bash
npm install --legacy-peer-deps
```

This allows npm to ignore peer dependency conflicts and install all packages.

### Option 2: Clean Install
```bash
# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Install with legacy peer deps
npm install --legacy-peer-deps
```

### Option 3: Use Yarn (Alternative)
```bash
# Install yarn if not already installed
npm install -g yarn

# Install dependencies with yarn
yarn install
```

---

## What Was Fixed

Updated `package.json` to use compatible versions:
- Expo: ^51.0.0 (latest stable)
- React: ^18.3.0 (compatible with React Native 0.74)
- React Native: ^0.74.0 (latest stable)
- react-native-maps: ^1.10.0 (compatible with React 18.3)

---

## After Installation

Once dependencies are installed successfully:

```bash
# Start the development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

---

## If Issues Persist

### Clear Expo Cache
```bash
npm start -- --clear
```

### Reinstall Everything
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install --legacy-peer-deps
```

### Check Node Version
```bash
node --version  # Should be v16 or higher
npm --version   # Should be v8 or higher
```

---

## Troubleshooting

### "npm ERR! code ERESOLVE"
- Use `--legacy-peer-deps` flag
- Or use `yarn install` instead

### "Module not found"
- Run `npm install --legacy-peer-deps` again
- Clear cache: `npm cache clean --force`

### "Expo not found"
- Install Expo CLI: `npm install -g expo-cli`
- Verify: `expo --version`

---

## Next Steps

Once installation completes:

1. Configure backend URL in `src/services/api.js`
2. Run `npm start`
3. Press `a` for Android or `i` for iOS
4. Test the app

---

**Status**: Ready to install
**Command**: `npm install --legacy-peer-deps`
