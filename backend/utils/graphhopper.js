const axios = require('axios');

// OSRM (Open Source Routing Machine) - Free, no API key needed
const OSRM_BASE_URL = 'https://router.project-osrm.org/route/v1';

/**
 * Get route from OSRM (OpenStreetMap Routing Machine)
 * @param {number} startLat - Start latitude
 * @param {number} startLng - Start longitude
 * @param {number} endLat - End latitude
 * @param {number} endLng - End longitude
 * @param {string} profile - Routing profile (foot, car, bike)
 * @returns {Promise<Object>} Route data
 */
async function getOSRMRoute(startLat, startLng, endLat, endLng, profile = 'foot') {
  try {
    console.log('🗺️  Requesting route from OpenStreetMap (OSRM)...');

    // Map profile names to OSRM profiles
    const profileMap = {
      'foot': 'foot',
      'walking': 'foot',
      'pedestrian': 'foot',
      'car': 'car',
      'bike': 'bike',
      'bicycle': 'bike'
    };

    const osrmProfile = profileMap[profile] || 'foot';

    // OSRM expects coordinates as lng,lat (not lat,lng)
    const coordinates = `${startLng},${startLat};${endLng},${endLat}`;

    const response = await axios.get(
      `${OSRM_BASE_URL}/${osrmProfile}/${coordinates}`,
      {
        params: {
          overview: 'full',
          steps: true,
          geometries: 'geojson',
          continue_straight: true
        },
        timeout: 10000
      }
    );

    if (response.data && response.data.routes && response.data.routes.length > 0) {
      const route = response.data.routes[0];
      
      console.log('✅ OpenStreetMap route calculated successfully');
      console.log(`   Distance: ${Math.round(route.distance)}m`);
      console.log(`   Time: ${Math.round(route.duration / 60)} minutes`);
      
      // Extract waypoints from route legs
      const waypoints = [];
      if (response.data.waypoints) {
        response.data.waypoints.forEach(wp => {
          waypoints.push({
            lat: wp.location[1],
            lng: wp.location[0],
            name: wp.name || 'Waypoint'
          });
        });
      }

      return {
        type: 'Feature',
        geometry: route.geometry,
        properties: {
          distance: Math.round(route.distance),
          time: Math.round(route.duration / 60), // Convert seconds to minutes
          duration: Math.round(route.duration),
          instructions: extractInstructions(route.legs),
          pathType: 'osrm',
          profile: osrmProfile,
          waypoints: waypoints
        }
      };
    }

    console.log('⚠️  OSRM returned no routes');
    return null;
  } catch (error) {
    console.error('❌ OSRM API error:', error.message);
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Data:', error.response.data);
    }
    return null;
  }
}

/**
 * Extract turn-by-turn instructions from route legs
 */
function extractInstructions(legs) {
  const instructions = [];
  
  legs.forEach((leg, legIndex) => {
    if (leg.steps) {
      leg.steps.forEach((step, stepIndex) => {
        if (step.maneuver) {
          const maneuver = step.maneuver;
          let instruction = '';

          switch (maneuver.type) {
            case 'turn':
              instruction = `Turn ${maneuver.modifier} for ${Math.round(step.distance)}m`;
              break;
            case 'new name':
              instruction = `Continue on ${step.name || 'road'} for ${Math.round(step.distance)}m`;
              break;
            case 'depart':
              instruction = `Start on ${step.name || 'road'}`;
              break;
            case 'arrive':
              instruction = `Arrive at destination`;
              break;
            default:
              instruction = `${maneuver.type} ${maneuver.modifier || ''} for ${Math.round(step.distance)}m`;
          }

          if (instruction) {
            instructions.push({
              text: instruction,
              distance: Math.round(step.distance),
              duration: Math.round(step.duration),
              name: step.name
            });
          }
        }
      });
    }
  });

  return instructions;
}

/**
 * Get route from GraphHopper API (fallback)
 */
async function getGraphHopperRoute(startLat, startLng, endLat, endLng, profile = 'foot') {
  const GRAPHHOPPER_API_KEY = process.env.GRAPHHOPPER_API_KEY;
  const GRAPHHOPPER_BASE_URL = 'https://graphhopper.com/api/1';

  try {
    if (!GRAPHHOPPER_API_KEY || 
        GRAPHHOPPER_API_KEY === 'your_graphhopper_api_key_here' ||
        GRAPHHOPPER_API_KEY.trim() === '') {
      return null;
    }

    console.log('🗺️  Requesting route from GraphHopper...');

    const response = await axios.get(`${GRAPHHOPPER_BASE_URL}/route`, {
      params: {
        point: [`${startLat},${startLng}`, `${endLat},${endLng}`],
        profile: profile,
        locale: 'en',
        instructions: true,
        calc_points: true,
        points_encoded: false,
        key: GRAPHHOPPER_API_KEY
      },
      timeout: 5000
    });

    if (response.data && response.data.paths && response.data.paths.length > 0) {
      const path = response.data.paths[0];
      
      console.log('✅ GraphHopper route calculated successfully');
      console.log(`   Distance: ${Math.round(path.distance)}m`);
      console.log(`   Time: ${Math.round(path.time / 1000 / 60)} minutes`);
      
      return {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: path.points.coordinates
        },
        properties: {
          distance: Math.round(path.distance),
          time: Math.round(path.time / 1000 / 60),
          instructions: path.instructions.map(inst => ({
            text: inst.text,
            distance: Math.round(inst.distance),
            time: Math.round(inst.time / 1000),
            sign: inst.sign
          })),
          pathType: 'graphhopper',
          profile: profile
        }
      };
    }

    return null;
  } catch (error) {
    console.error('❌ GraphHopper error:', error.message);
    return null;
  }
}

module.exports = {
  getOSRMRoute,
  getGraphHopperRoute
};
