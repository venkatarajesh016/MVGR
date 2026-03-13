# Google Maps Campus Navigation Demo

## Overview
A complete web-based campus navigation prototype using Google Maps JavaScript API with dummy waypoint data and placeholder images.

## Features

✅ **Google Maps Integration**
- Interactive map with user location detection
- Walking directions using Google Directions API
- Real-time route display with polylines

✅ **Dummy Waypoint System**
- Pre-defined checkpoints for each destination
- Placeholder images for landmarks
- Turn-by-turn instructions

✅ **Real-time Navigation**
- Continuous location tracking
- Distance calculation to next waypoint
- Automatic waypoint detection (within 30 meters)

✅ **Navigation Panel**
- Shows landmark image
- Displays instructions
- Shows distance to next checkpoint
- Appears automatically when near waypoint

✅ **Responsive Design**
- Works on desktop and mobile
- Full-screen map
- Floating controls and navigation panel

## Setup Instructions

### 1. Get Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable these APIs:
   - Maps JavaScript API
   - Directions API
   - Geolocation API
4. Create credentials (API Key)
5. Copy your API key

### 2. Configure the Demo

Open `google-maps-demo.html` and replace:

```javascript
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&callback=initMap" async defer></script>
```

Replace `YOUR_GOOGLE_MAPS_API_KEY` with your actual API key.

### 3. Run the Demo

Simply open `google-maps-demo.html` in a web browser:

```bash
# Option 1: Double-click the file
# Option 2: Use a local server
python -m http.server 8000
# Then open http://localhost:8000/google-maps-demo.html
```

## How to Use

1. **Allow Location Access**
   - Browser will ask for location permission
   - Click "Allow" to use your real location
   - Or it will use default campus center

2. **Select Destination**
   - Choose from dropdown: Library, Canteen, Academic Block, etc.
   - Click "Start Navigation"

3. **View Route**
   - Blue walking route appears on map
   - Numbered markers show waypoints
   - Click markers to see landmark info

4. **Navigate**
   - Walk towards destination
   - When within 30 meters of a waypoint:
     - Navigation panel appears
     - Shows landmark image
     - Displays instructions
     - Shows distance

5. **Clear Route**
   - Click "Clear Route" to reset

## Dummy Waypoint Data

The demo includes 5 destinations with waypoints:

### Library Route
- Main Gate → Central Garden → Library

### Canteen Route
- Main Gate → Canteen

### Academic Block Route
- Main Gate → Central Plaza → Academic Block

### Sports Complex Route
- Main Gate → Sports Complex

### Hostel Route
- Main Gate → Hostel Block

## Customization

### Add New Destinations

Edit the `waypointData` object in the HTML file:

```javascript
const waypointData = {
    your_destination: [
        {
            name: "Checkpoint Name",
            lat: 18.059970,
            lng: 83.405156,
            image: "https://via.placeholder.com/400x200/color/ffffff?text=Your+Text",
            instruction: "Your instruction here"
        }
    ]
};
```

### Change Placeholder Images

Use different placeholder services:
- `https://via.placeholder.com/400x200/4285f4/ffffff?text=Your+Text`
- `https://placehold.co/400x200/blue/white?text=Your+Text`
- Or use real image URLs

### Adjust Detection Distance

Change the proximity threshold (default 30 meters):

```javascript
if (distance <= 30) {  // Change this value
    showNavigationPanel(waypoint, distance);
}
```

## Features Explained

### 1. User Location Detection
```javascript
navigator.geolocation.getCurrentPosition()
```
- Uses browser Geolocation API
- Falls back to default location if denied

### 2. Walking Directions
```javascript
travelMode: google.maps.TravelMode.WALKING
```
- Google Directions API with WALKING mode
- Draws route as blue polyline

### 3. Waypoint Markers
- Green markers for checkpoints
- Red marker for final destination
- Numbered labels (1, 2, 3...)
- Click to see info popup

### 4. Real-time Tracking
```javascript
navigator.geolocation.watchPosition()
```
- Continuously updates user position
- Calculates distance to next waypoint
- Shows navigation panel when close

### 5. Distance Calculation
- Haversine formula for accurate distance
- Updates in real-time
- Displayed in meters

## Browser Compatibility

✅ Chrome (Desktop & Mobile)
✅ Firefox (Desktop & Mobile)
✅ Safari (Desktop & Mobile)
✅ Edge (Desktop & Mobile)

## Requirements

- Modern web browser
- Internet connection (for Google Maps)
- Location services enabled (optional)
- Google Maps API key

## Troubleshooting

### Map doesn't load
- Check API key is correct
- Ensure Maps JavaScript API is enabled
- Check browser console for errors

### Location not detected
- Allow location permission in browser
- Check if HTTPS is used (required for geolocation)
- Falls back to default location automatically

### Route not showing
- Ensure Directions API is enabled
- Check API key has proper permissions
- Verify coordinates are valid

### Navigation panel not appearing
- Check if within 30 meters of waypoint
- Ensure location tracking is active
- Look for console errors

## Demo Coordinates

Campus Center: `18.059970, 83.405156`

All waypoints are within 100m radius of this center point.

## Next Steps

To make this production-ready:

1. Replace placeholder images with real photos
2. Add actual campus building coordinates
3. Implement backend for dynamic waypoint data
4. Add more destinations and routes
5. Enhance UI with more features
6. Add offline support
7. Implement route optimization

## License

This is a demo/prototype for educational purposes.

## Support

For Google Maps API issues, visit:
- [Google Maps Documentation](https://developers.google.com/maps/documentation)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/google-maps)
