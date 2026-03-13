# Backend URL Configuration Guide

## Current Configuration

Your backend is running on **port 5000**.

The API URL in `src/services/api.js` is currently set to:
```javascript
const API_BASE_URL = 'http://10.0.2.2:5000'; // Android Emulator
```

---

## Different URLs for Different Scenarios

### 1. Android Emulator (Recommended for Testing)
```javascript
const API_BASE_URL = 'http://10.0.2.2:5000';
```
- `10.0.2.2` is the special IP that Android emulator uses to access host machine
- Works when backend is running on your computer
- **Use this if testing on Android emulator**

### 2. iOS Simulator (Mac Only)
```javascript
const API_BASE_URL = 'http://localhost:5000';
```
- iOS simulator can access localhost directly
- Works when backend is running on your Mac
- **Use this if testing on iOS simulator**

### 3. Physical Device (Same WiFi Network)
```javascript
const API_BASE_URL = 'http://192.168.x.x:5000';
```
Replace `192.168.x.x` with your computer's IP address.

**How to find your IP:**
- Windows: Open Command Prompt and run `ipconfig`
- Mac/Linux: Open Terminal and run `ifconfig`
- Look for IPv4 address (usually starts with 192.168 or 10.0)

**Example:**
```javascript
const API_BASE_URL = 'http://192.168.1.100:5000';
```

### 4. Production (Deployed Backend)
```javascript
const API_BASE_URL = 'https://api.yourdomain.com';
```
- Use your production server URL
- Must use HTTPS
- **Use this for production deployment**

---

## How to Change the URL

### Step 1: Open the File
```
mobile-app/src/services/api.js
```

### Step 2: Find This Line
```javascript
const API_BASE_URL = 'http://10.0.2.2:5000';
```

### Step 3: Replace with Your URL
```javascript
const API_BASE_URL = 'http://192.168.1.100:5000'; // Your IP
```

### Step 4: Save the File

### Step 5: Restart the App
```bash
npm start -- --clear
```

---

## Quick Reference

| Scenario | URL | When to Use |
|----------|-----|------------|
| Android Emulator | `http://10.0.2.2:5000` | Testing on Android emulator |
| iOS Simulator | `http://localhost:5000` | Testing on iOS simulator (Mac) |
| Physical Device | `http://192.168.x.x:5000` | Testing on real phone |
| Production | `https://api.yourdomain.com` | Live deployment |

---

## Finding Your Computer's IP Address

### Windows
```bash
ipconfig
```
Look for "IPv4 Address" (usually 192.168.x.x)

### Mac/Linux
```bash
ifconfig
```
Look for "inet" address (usually 192.168.x.x)

### Example Output
```
IPv4 Address . . . . . . . . . . . : 192.168.1.100
```

Then use: `http://192.168.1.100:5000`

---

## Testing the Connection

### Check if Backend is Running
```bash
# From your backend folder
npm start
```

You should see:
```
Server running on port 5000
```

### Test the API
Open in browser:
```
http://localhost:5000/buildings
```

You should see JSON data.

---

## Common Issues

### Issue: "Cannot connect to backend"
**Solution:**
1. Verify backend is running: `npm start` in backend folder
2. Check the URL is correct
3. Ensure device is on same WiFi network
4. Check firewall settings

### Issue: "Connection refused"
**Solution:**
1. Backend is not running
2. Wrong IP address
3. Wrong port number
4. Firewall blocking connection

### Issue: "Network timeout"
**Solution:**
1. Check WiFi connection
2. Verify IP address is correct
3. Check backend logs for errors
4. Try restarting backend

---

## Verification Steps

### Step 1: Backend Running
```bash
# In backend folder
npm start
```

### Step 2: Check Backend URL
```bash
# In browser, visit:
http://localhost:5000/buildings
```

Should return JSON data.

### Step 3: Update Mobile App
Edit `src/services/api.js` with correct URL.

### Step 4: Start Mobile App
```bash
npm start
```

### Step 5: Test Connection
- Sign up/login
- Select destination
- Should see buildings list

---

## Environment Variables (Optional)

For better management, you can use environment variables:

### Create `.env` file in mobile-app folder
```
REACT_APP_API_URL=http://192.168.1.100:5000
```

### Update api.js
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://10.0.2.2:5000';
```

---

## Summary

1. **Current URL**: `http://10.0.2.2:5000` (Android Emulator)
2. **For Physical Device**: Replace with your computer's IP
3. **For iOS Simulator**: Use `http://localhost:5000`
4. **For Production**: Use your deployed backend URL

---

**Backend Port**: 5000
**Current URL**: http://10.0.2.2:5000
**Status**: Ready to Use
