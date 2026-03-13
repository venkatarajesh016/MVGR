# Simple Setup Guide (No Conflicts)

## Quick Fix - Use This Exact Command

```bash
npm install --legacy-peer-deps --force
```

This will:
- Ignore peer dependency conflicts
- Force install all packages
- Take 5-10 minutes
- Work reliably

---

## Step-by-Step

### Step 1: Clean Everything
```bash
# Remove old installations
rmdir /s /q node_modules
del package-lock.json
npm cache clean --force
```

### Step 2: Install Dependencies
```bash
npm install --legacy-peer-deps --force
```

### Step 3: Install Expo CLI Globally
```bash
npm install -g expo-cli
```

### Step 4: Verify Installation
```bash
expo --version
npm list react react-native
```

### Step 5: Start the App
```bash
npm start
```

---

## If You're on Windows

### Use the Batch Script
```bash
# Run this file:
QUICK_SETUP.bat
```

This automates all the steps above.

---

## Troubleshooting

### "expo is not recognized"
```bash
npm install -g expo-cli
```

### "ERESOLVE could not resolve"
```bash
npm install --legacy-peer-deps --force
```

### "Module not found"
```bash
rm -rf node_modules
npm install --legacy-peer-deps --force
```

### Still having issues?
```bash
# Nuclear option - clean everything
rmdir /s /q node_modules
del package-lock.json
npm cache clean --force
npm install --legacy-peer-deps --force
npm install -g expo-cli
```

---

## What Each Flag Does

| Flag | Purpose |
|------|---------|
| `--legacy-peer-deps` | Ignore peer dependency conflicts |
| `--force` | Force install even if conflicts exist |
| `-g` | Install globally (for expo-cli) |

---

## Expected Output

After successful installation, you should see:
```
added 500+ packages in 5-10 minutes
```

Then run:
```bash
npm start
```

You should see:
```
Starting Expo server...
Tunnel ready.
Scan the QR code above with Expo Go
```

---

## Next Steps

1. ✅ Run: `npm install --legacy-peer-deps --force`
2. ✅ Run: `npm install -g expo-cli`
3. ✅ Edit `src/services/api.js` - update backend URL
4. ✅ Run: `npm start`
5. ✅ Scan QR code with Expo Go app

---

## Time Estimate

- Installation: 5-10 minutes
- Configuration: 1 minute
- First run: 2-3 minutes
- **Total: ~15 minutes**

---

**Status**: Ready to Install
**Command**: `npm install --legacy-peer-deps --force`
