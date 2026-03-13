const express = require('express');
const router = express.Router();
const Building = require('../models/Building');
const Room = require('../models/Room');
const Landmark = require('../models/Landmark');
const { generateWalkablePath } = require('../utils/pathfinder');
const { getGraphHopperRoute } = require('../utils/graphhopper');

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

// Get walkable route between two points
router.get('/route', async (req, res) => {
  try {
    const { startLat, startLng, endLat, endLng, startBuilding, endBuilding, useGraphHopper } = req.query;

    if (!startLat || !startLng || !endLat || !endLng) {
      return res.status(400).json({ message: 'All coordinates are required' });
    }

    let route = null;

    // Try GraphHopper first if requested or API key is available
    if (useGraphHopper !== 'false' && process.env.GRAPHHOPPER_API_KEY && 
        process.env.GRAPHHOPPER_API_KEY !== 'your_graphhopper_api_key_here') {
      route = await getGraphHopperRoute(
        parseFloat(startLat),
        parseFloat(startLng),
        parseFloat(endLat),
        parseFloat(endLng),
        'foot' // Walking/pedestrian paths only
      );
    }

    // Fallback to campus walkway pathfinding if GraphHopper fails
    if (!route) {
      console.log('🚶 Using campus walkway pathfinding...');
      route = generateWalkablePath(
        parseFloat(startLat),
        parseFloat(startLng),
        parseFloat(endLat),
        parseFloat(endLng),
        startBuilding,
        endBuilding
      );
    }

    // Get images of buildings/landmarks along the route
    if (route && route.properties && route.properties.waypoints) {
      const waypointImages = await getWaypointImages(route.properties.waypoints);
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
async function getWaypointImages(waypoints) {
  const images = [];
  
  // Map of ALL road nodes to nearby buildings/landmarks
  const nodeToLocation = {
    // Buildings
    'main_gate': 'Main Gate',
    'central_plaza': 'Main Academic Block',
    'cs_block_road': 'Computer Science Block',
    'eng_block_a_road': 'Engineering Block A',
    'eng_block_b_road': 'Engineering Block B',
    'library_road': 'Library Building',
    'admin_road': 'Administration Office',
    'north_junction': 'Student Center',
    'cafeteria_road': 'Cafeteria',
    'hostel_a_road': 'Hostel Block A',
    'hostel_b_road': 'Hostel Block B',
    'sports_road': 'Sports Complex',
    'auditorium_road': 'Auditorium',
    'science_lab_road': 'Science Lab Block',
    'workshop_road': 'Workshop Building',
    'medical_road': 'Medical Center',
    'north_gate': 'North Gate',
    'parking_a_road': 'Parking Area A',
    'parking_b_road': 'Parking Area B',
    
    // Landmarks
    'garden_path': 'Central Garden',
    'fountain_plaza': 'Fountain Plaza',
    'basketball_court': 'Basketball Court',
    'football_ground': 'Football Ground',
    'bus_stop': 'Bus Stop',
    'cycle_stand': 'Cycle Stand',
    
    // Road junctions - map to nearest landmark/building
    'main_road_north': 'Student Center',
    'main_road_south': 'Administration Office',
    'main_road_east': 'Cafeteria',
    'main_road_west': 'Library Building',
    'south_junction': 'Administration Office',
    'east_junction': 'Cafeteria',
    'west_junction': 'Library Building'
  };

  for (const waypoint of waypoints) {
    const locationName = nodeToLocation[waypoint];
    if (locationName) {
      // Try to find building first
      const building = await Building.findOne({ name: locationName });
      if (building) {
        const imageUrl = building.image 
          ? (building.image.startsWith('http') ? building.image : `http://localhost:5000${building.image}`)
          : `https://picsum.photos/seed/${encodeURIComponent(locationName)}/400/300`;
        
        images.push({
          waypoint: waypoint,
          name: locationName,
          image: imageUrl,
          type: 'building',
          coordinates: building.coordinates
        });
        continue;
      }

      // Try to find landmark
      const landmark = await Landmark.findOne({ name: locationName });
      if (landmark) {
        const imageUrl = landmark.image 
          ? (landmark.image.startsWith('http') ? landmark.image : `http://localhost:5000${landmark.image}`)
          : `https://picsum.photos/seed/${encodeURIComponent(locationName)}/400/300`;
        
        images.push({
          waypoint: waypoint,
          name: locationName,
          image: imageUrl,
          type: 'landmark',
          coordinates: landmark.coordinates
        });
        continue;
      }

      // If no building or landmark found, add placeholder
      images.push({
        waypoint: waypoint,
        name: locationName,
        image: `https://picsum.photos/seed/${encodeURIComponent(locationName)}/400/300`,
        type: 'placeholder',
        coordinates: null
      });
    }
  }

  console.log(`📸 Returning ${images.length} waypoint images`);
  return images;
}

module.exports = router;
