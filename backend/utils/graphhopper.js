const axios = require('axios');

const GRAPHHOPPER_API_KEY = process.env.GRAPHHOPPER_API_KEY;
const GRAPHHOPPER_BASE_URL = 'https://graphhopper.com/api/1';

/**
 * Get route from GraphHopper API
 * @param {number} startLat - Start latitude
 * @param {number} startLng - Start longitude
 * @param {number} endLat - End latitude
 * @param {number} endLng - End longitude
 * @param {string} profile - Routing profile (foot, car, bike)
 * @returns {Promise<Object>} Route data
 */
async function getGraphHopperRoute(startLat, startLng, endLat, endLng, profile = 'foot') {
  try {
    // Check if API key is configured
    if (!GRAPHHOPPER_API_KEY || 
        GRAPHHOPPER_API_KEY === 'your_graphhopper_api_key_here' ||
        GRAPHHOPPER_API_KEY.trim() === '') {
      console.log('ℹ️  GraphHopper API key not configured. Using campus routing.');
      console.log('📝 To enable GraphHopper:');
      console.log('   1. Sign up at https://www.graphhopper.com/');
      console.log('   2. Get your free API key');
      console.log('   3. Add to backend/.env: GRAPHHOPPER_API_KEY=your_key_here');
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
          time: Math.round(path.time / 1000 / 60), // Convert ms to minutes
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

    console.log('⚠️  GraphHopper returned no paths');
    return null;
  } catch (error) {
    if (error.response) {
      // API returned an error
      console.error('❌ GraphHopper API error:', error.response.status);
      if (error.response.status === 400) {
        console.error('   Invalid API key or request parameters');
        console.error('   Please check your GRAPHHOPPER_API_KEY in .env file');
      } else if (error.response.status === 401) {
        console.error('   Unauthorized - Invalid API key');
      } else if (error.response.status === 429) {
        console.error('   Rate limit exceeded (500 requests/day on free tier)');
      }
    } else if (error.request) {
      // Request made but no response
      console.error('❌ GraphHopper API timeout or network error');
    } else {
      console.error('❌ GraphHopper error:', error.message);
    }
    return null;
  }
}

/**
 * Get isochrone (reachable area) from a point
 * @param {number} lat - Center latitude
 * @param {number} lng - Center longitude
 * @param {number} timeLimit - Time limit in seconds
 * @param {string} profile - Routing profile
 * @returns {Promise<Object>} Isochrone data
 */
async function getIsochrone(lat, lng, timeLimit = 300, profile = 'foot') {
  try {
    if (!GRAPHHOPPER_API_KEY || 
        GRAPHHOPPER_API_KEY === 'your_graphhopper_api_key_here' ||
        GRAPHHOPPER_API_KEY.trim() === '') {
      return null;
    }

    const response = await axios.get(`${GRAPHHOPPER_BASE_URL}/isochrone`, {
      params: {
        point: `${lat},${lng}`,
        time_limit: timeLimit,
        profile: profile,
        key: GRAPHHOPPER_API_KEY
      }
    });

    return response.data;
  } catch (error) {
    console.error('GraphHopper Isochrone error:', error.message);
    return null;
  }
}

module.exports = {
  getGraphHopperRoute,
  getIsochrone
};
