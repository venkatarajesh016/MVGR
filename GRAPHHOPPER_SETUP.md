# GraphHopper Integration Setup

## What is GraphHopper?

GraphHopper is a professional routing engine that provides:
- Real road-based routing (not straight lines)
- Turn-by-turn directions
- Multiple routing profiles (walking, driving, cycling)
- Accurate distance and time calculations
- Free tier: 500 requests/day

## Setup Instructions

### Step 1: Get Your Free API Key

1. **Visit GraphHopper**: https://www.graphhopper.com/
2. **Sign Up**: Click "Get Started Free" or "Sign Up"
3. **Create Account**: Use your email to register
4. **Verify Email**: Check your inbox and verify
5. **Go to Dashboard**: https://graphhopper.com/dashboard/
6. **Find API Keys**: Navigate to "API Keys" section
7. **Copy Key**: Copy your default API key (starts with a long string)

### Step 2: Add API Key to Backend

1. Open `backend/.env` file
2. Add your GraphHopper API key:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
GRAPHHOPPER_API_KEY=your_actual_api_key_here
```

3. Save the file

### Step 3: Install Dependencies

```bash
cd backend
npm install axios
```

### Step 4: Restart Backend Server

```bash
# Stop current server (Ctrl+C)
npm start
```

## How It Works

### Automatic Fallback System

The application uses a smart routing system:

1. **Primary**: GraphHopper API (if key is configured)
   - Real road-based routing
   - Turn-by-turn directions
   - Accurate walking times

2. **Fallback**: Campus walkway pathfinding
   - Uses predefined campus paths
   - Works offline
   - No API key needed

### Routing Profiles

- **foot**: Walking routes (default)
- **car**: Driving routes
- **bike**: Cycling routes

### Features You Get

✅ **Real Road Routing**: Follows actual roads and paths
✅ **Turn-by-Turn**: Detailed navigation instructions
✅ **Accurate Distance**: Real walking distance
✅ **Time Estimates**: Based on walking speed
✅ **Multiple Routes**: Can suggest alternatives
✅ **Elevation Data**: Considers hills and slopes

## Testing the Integration

### 1. Check if API Key is Working

Look at backend console when calculating a route:
- ✅ "Attempting GraphHopper routing..." = API key configured
- ⚠️ "Using campus walkway pathfinding..." = Fallback mode

### 2. Test Route Calculation

1. Open the app at http://localhost:3000
2. Search for a building
3. Click "Navigate Here"
4. Check the route:
   - GraphHopper: Smooth curves following roads
   - Fallback: Straight lines between waypoints

### 3. View Turn-by-Turn Directions

Routes from GraphHopper include:
- Distance for each segment
- Time for each turn
- Direction instructions
- Total distance and time

## API Limits

### Free Tier
- **500 requests/day**
- **Unlimited for development**
- **No credit card required**

### Usage Tips
- Each route calculation = 1 request
- Cache routes when possible
- Fallback system prevents failures

## Troubleshooting

### "GraphHopper API key not configured"
- Check `.env` file exists in backend folder
- Verify API key is correct (no spaces)
- Restart backend server after adding key

### "GraphHopper API error"
- Check internet connection
- Verify API key is valid
- Check daily limit (500 requests)
- App automatically falls back to campus routing

### Routes Look Wrong
- Ensure coordinates are correct
- Check if location is accessible by foot
- GraphHopper may not have detailed data for all areas
- Fallback routing will be used automatically

## Advanced Configuration

### Change Routing Profile

In `backend/routes/navigation.js`, modify:

```javascript
route = await getGraphHopperRoute(
  parseFloat(startLat),
  parseFloat(startLng),
  parseFloat(endLat),
  parseFloat(endLng),
  'foot' // Change to 'car' or 'bike'
);
```

### Disable GraphHopper

To force campus routing only:

```javascript
// In navigation.js
if (false && process.env.GRAPHHOPPER_API_KEY) {
  // GraphHopper disabled
}
```

### Add Alternative Routes

```javascript
// In graphhopper.js
params: {
  point: [`${startLat},${startLng}`, `${endLat},${endLng}`],
  profile: profile,
  algorithm: 'alternative_route',
  'alternative_route.max_paths': 3,
  key: GRAPHHOPPER_API_KEY
}
```

## Benefits Over Basic Routing

| Feature | Basic Routing | GraphHopper |
|---------|--------------|-------------|
| Road Following | ❌ Straight lines | ✅ Real roads |
| Turn-by-Turn | ❌ No | ✅ Yes |
| Accurate Distance | ⚠️ Approximate | ✅ Precise |
| Time Estimates | ⚠️ Basic | ✅ Accurate |
| Elevation | ❌ No | ✅ Yes |
| Multiple Profiles | ❌ No | ✅ Walk/Drive/Bike |
| Offline Support | ✅ Yes | ❌ Needs internet |

## Example Response

### GraphHopper Route Response:
```json
{
  "type": "Feature",
  "geometry": {
    "type": "LineString",
    "coordinates": [[83.405167, 18.060005], ...]
  },
  "properties": {
    "distance": 450,
    "time": 6,
    "instructions": [
      {
        "text": "Continue onto Main Road",
        "distance": 150,
        "time": 2
      },
      {
        "text": "Turn left onto Campus Drive",
        "distance": 200,
        "time": 3
      }
    ],
    "pathType": "graphhopper",
    "profile": "foot"
  }
}
```

## Support

- **GraphHopper Docs**: https://docs.graphhopper.com/
- **API Reference**: https://docs.graphhopper.com/#tag/Routing-API
- **Community Forum**: https://discuss.graphhopper.com/

## Summary

1. ✅ Sign up at graphhopper.com
2. ✅ Get free API key
3. ✅ Add to backend/.env
4. ✅ Install axios: `npm install axios`
5. ✅ Restart backend server
6. ✅ Test routing in app

Your campus navigation now has professional-grade routing! 🎉
