const express = require('express');
const router = express.Router();
const Building = require('../models/Building');
const Room = require('../models/Room');
const Landmark = require('../models/Landmark');
const { getOSRMRoute, getGraphHopperRoute } = require('../utils/graphhopper');

// Search endpoint
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ message: 'Query parameter is required' });
    }

    const searchRegex = new RegExp(query, 'i');

    const [buildings, rooms, landmarks] = await Promise.all([
      Building.find({ name: searchRegex }),
      Room.find({
        $or: [
          { roomNumber: searchRegex },
          { department: searchRegex }
        ]
      }).populate('buildingId'),
      Landmark.find({ name: searchRegex })
    ]);

    res.json({
      buildings,
      rooms,
      landmarks
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get walkable route between two points using OpenStreetMap
router.get('/route', async (req, res) => {
  try {
    const { startLat, startLng, endLat, endLng } = req.query;

    if (!startLat || !startLng || !endLat || !endLng) {
      return res.status(400).json({ message: 'All coordinates are required' });
    }

    const start = {
      lat: parseFloat(startLat),
      lng: parseFloat(startLng)
    };

    const end = {
      lat: parseFloat(endLat),
      lng: parseFloat(endLng)
    };

    // Check if start and end are the same
    const distance = calculateDistance(start.lat, start.lng, end.lat, end.lng);
    if (distance < 10) {
      return res.json({
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [[start.lng, start.lat]]
        },
        properties: {
          distance: 0,
          time: 0,
          pathType: 'same_location',
          instructions: ['You are already at the destination']
        }
      });
    }

    // Try OSRM first (OpenStreetMap - free, no API key needed)
    let route = await getOSRMRoute(start.lat, start.lng, end.lat, end.lng, 'foot');

    // Fallback to GraphHopper if OSRM fails
    if (!route) {
      console.log('🔄 OSRM failed, trying GraphHopper...');
      route = await getGraphHopperRoute(start.lat, start.lng, end.lat, end.lng, 'foot');
    }

    if (!route) {
      return res.status(500).json({
        message: 'Unable to calculate route. Please try again.',
        error: 'No routing service available'
      });
    }

    // Get images of buildings/landmarks along the route
    if (route && route.properties) {
      const waypointImages = await getWaypointImages(start, end);
      route.properties.waypointImages = waypointImages;
      console.log(`📸 Found ${waypointImages.length} images along the route`);
    }

    res.json(route);
  } catch (error) {
    console.error('Route error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Helper function to get images for waypoints
async function getWaypointImages(startPoint, endPoint) {
  const images = [];
  
  try {
    // Get all buildings and landmarks
    const [buildings, landmarks] = await Promise.all([
      Building.find({}),
      Landmark.find({})
    ]);

    // Combine all locations
    const allLocations = [
      ...buildings.map(b => ({
        name: b.name,
        lat: b.coordinates.latitude,
        lng: b.coordinates.longitude,
        image: b.image,
        type: 'building'
      })),
      ...landmarks.map(l => ({
        name: l.name,
        lat: l.coordinates.latitude,
        lng: l.coordinates.longitude,
        image: l.image,
        type: 'landmark'
      }))
    ];

    // Find locations near the route (within 50m of start/end or between them)
    const nearbyLocations = allLocations.filter(loc => {
      const distToStart = calculateDistance(startPoint.lat, startPoint.lng, loc.lat, loc.lng);
      const distToEnd = calculateDistance(endPoint.lat, endPoint.lng, loc.lat, loc.lng);
      
      // Include if within 100m of start or end
      return distToStart < 100 || distToEnd < 100;
    });

    // Sort by distance from start
    nearbyLocations.sort((a, b) => {
      const distA = calculateDistance(startPoint.lat, startPoint.lng, a.lat, a.lng);
      const distB = calculateDistance(startPoint.lat, startPoint.lng, b.lat, b.lng);
      return distA - distB;
    });

    // Add images for nearby locations
    for (const location of nearbyLocations) {
      const imageUrl = location.image 
        ? (location.image.startsWith('http') ? location.image : `http://localhost:5000${location.image}`)
        : `https://picsum.photos/seed/${encodeURIComponent(location.name)}/400/300`;
      
      images.push({
        name: location.name,
        image: imageUrl,
        type: location.type,
        coordinates: {
          latitude: location.lat,
          longitude: location.lng
        }
      });
    }
  } catch (error) {
    console.error('Error getting waypoint images:', error);
  }

  return images;
}

// Helper function to calculate distance between two points
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Earth radius in meters
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

module.exports = router;
