// Campus walkable paths network
// Defines the actual walking paths between key points on campus
// Coordinates based on your campus center: 18.05997021737144, 83.40515640049136
// 100m radius coverage

const centerLat = 18.05997021737144;
const centerLng = 83.40515640049136;

const campusWalkways = {
  // Main intersections and path nodes (road junctions)
  nodes: {
    // Central area
    'central_plaza': { lat: centerLat, lng: centerLng },
    'main_road_north': { lat: centerLat + 0.0006, lng: centerLng },
    'main_road_south': { lat: centerLat - 0.0006, lng: centerLng },
    'main_road_east': { lat: centerLat, lng: centerLng + 0.0006 },
    'main_road_west': { lat: centerLat, lng: centerLng - 0.0006 },
    
    // North area
    'north_junction': { lat: centerLat + 0.0007, lng: centerLng + 0.0002 },
    'cs_block_road': { lat: centerLat + 0.0006, lng: centerLng + 0.0004 },
    'hostel_a_road': { lat: centerLat + 0.0008, lng: centerLng + 0.0006 },
    'sports_road': { lat: centerLat + 0.0006, lng: centerLng + 0.0008 },
    'north_gate': { lat: centerLat + 0.0009, lng: centerLng + 0.0003 },
    
    // South area
    'south_junction': { lat: centerLat - 0.0007, lng: centerLng - 0.0002 },
    'admin_road': { lat: centerLat - 0.0006, lng: centerLng - 0.0004 },
    'auditorium_road': { lat: centerLat - 0.0007, lng: centerLng },
    'main_gate': { lat: centerLat - 0.0009, lng: centerLng - 0.0006 },
    'bus_stop': { lat: centerLat - 0.0008, lng: centerLng - 0.0005 },
    
    // East area
    'east_junction': { lat: centerLat + 0.0002, lng: centerLng + 0.0007 },
    'cafeteria_road': { lat: centerLat, lng: centerLng + 0.0007 },
    'eng_block_a_road': { lat: centerLat - 0.0004, lng: centerLng + 0.0006 },
    'parking_a_road': { lat: centerLat - 0.0006, lng: centerLng + 0.0007 },
    'hostel_b_road': { lat: centerLat - 0.0008, lng: centerLng + 0.0004 },
    'workshop_road': { lat: centerLat - 0.0005, lng: centerLng + 0.0007 },
    
    // West area
    'west_junction': { lat: centerLat + 0.0002, lng: centerLng - 0.0005 },
    'library_road': { lat: centerLat + 0.0004, lng: centerLng - 0.0006 },
    'medical_road': { lat: centerLat - 0.0002, lng: centerLng - 0.0006 },
    'eng_block_b_road': { lat: centerLat + 0.0005, lng: centerLng - 0.0005 },
    'parking_b_road': { lat: centerLat + 0.0007, lng: centerLng - 0.0004 },
    
    // Inner roads
    'science_lab_road': { lat: centerLat + 0.0004, lng: centerLng + 0.0006 },
    'garden_path': { lat: centerLat + 0.0002, lng: centerLng + 0.0002 },
    'fountain_plaza': { lat: centerLat, lng: centerLng - 0.0003 },
    'cycle_stand': { lat: centerLat - 0.0004, lng: centerLng - 0.0003 },
    'basketball_court': { lat: centerLat + 0.0005, lng: centerLng + 0.0007 },
    'football_ground': { lat: centerLat + 0.0008, lng: centerLng + 0.0008 }
  },

  // Connections between nodes (bidirectional roads/paths)
  edges: [
    // Main cross roads
    ['central_plaza', 'main_road_north'],
    ['central_plaza', 'main_road_south'],
    ['central_plaza', 'main_road_east'],
    ['central_plaza', 'main_road_west'],
    ['central_plaza', 'garden_path'],
    ['central_plaza', 'fountain_plaza'],
    
    // North area connections
    ['main_road_north', 'north_junction'],
    ['north_junction', 'cs_block_road'],
    ['cs_block_road', 'science_lab_road'],
    ['cs_block_road', 'hostel_a_road'],
    ['hostel_a_road', 'sports_road'],
    ['hostel_a_road', 'football_ground'],
    ['sports_road', 'basketball_court'],
    ['north_junction', 'north_gate'],
    ['north_junction', 'parking_b_road'],
    
    // South area connections
    ['main_road_south', 'south_junction'],
    ['south_junction', 'admin_road'],
    ['south_junction', 'auditorium_road'],
    ['admin_road', 'main_gate'],
    ['admin_road', 'cycle_stand'],
    ['main_gate', 'bus_stop'],
    ['south_junction', 'medical_road'],
    
    // East area connections
    ['main_road_east', 'east_junction'],
    ['east_junction', 'cafeteria_road'],
    ['east_junction', 'garden_path'],
    ['east_junction', 'basketball_court'],
    ['cafeteria_road', 'science_lab_road'],
    ['main_road_east', 'eng_block_a_road'],
    ['eng_block_a_road', 'workshop_road'],
    ['eng_block_a_road', 'parking_a_road'],
    ['parking_a_road', 'hostel_b_road'],
    ['hostel_b_road', 'main_road_south'],
    
    // West area connections
    ['main_road_west', 'west_junction'],
    ['west_junction', 'library_road'],
    ['west_junction', 'eng_block_b_road'],
    ['west_junction', 'fountain_plaza'],
    ['fountain_plaza', 'medical_road'],
    ['fountain_plaza', 'cycle_stand'],
    ['medical_road', 'main_road_south'],
    ['library_road', 'parking_b_road'],
    ['eng_block_b_road', 'parking_b_road'],
    
    // Cross connections
    ['garden_path', 'east_junction'],
    ['science_lab_road', 'sports_road'],
    ['library_road', 'north_junction'],
    ['admin_road', 'parking_a_road'],
    ['workshop_road', 'parking_a_road'],
    ['basketball_court', 'football_ground']
  ]
};

// Building to nearest road node mapping
const buildingToNode = {
  'Main Academic Block': 'central_plaza',
  'Computer Science Block': 'cs_block_road',
  'Engineering Block A': 'eng_block_a_road',
  'Engineering Block B': 'eng_block_b_road',
  'Library Building': 'library_road',
  'Administration Office': 'admin_road',
  'Student Center': 'north_junction',
  'Cafeteria': 'cafeteria_road',
  'Hostel Block A': 'hostel_a_road',
  'Hostel Block B': 'hostel_b_road',
  'Hostel Block C': 'parking_b_road',
  'Sports Complex': 'sports_road',
  'Auditorium': 'auditorium_road',
  'Science Lab Block': 'science_lab_road',
  'Workshop Building': 'workshop_road',
  'Medical Center': 'medical_road',
  'Main Gate': 'main_gate',
  'North Gate': 'north_gate',
  'Parking Area A': 'parking_a_road',
  'Parking Area B': 'parking_b_road'
};

// Dijkstra's algorithm for shortest path
function findShortestPath(graph, startNode, endNode) {
  // If start and end are the same, return single node path
  if (startNode === endNode) {
    return [startNode];
  }

  const distances = {};
  const previous = {};
  const unvisited = new Set();

  // Initialize
  for (const node in graph.nodes) {
    distances[node] = Infinity;
    previous[node] = null;
    unvisited.add(node);
  }
  distances[startNode] = 0;

  while (unvisited.size > 0) {
    // Find node with minimum distance
    let currentNode = null;
    let minDistance = Infinity;
    for (const node of unvisited) {
      if (distances[node] < minDistance) {
        minDistance = distances[node];
        currentNode = node;
      }
    }

    if (currentNode === null || currentNode === endNode) break;
    unvisited.delete(currentNode);

    // Check neighbors
    const neighbors = getNeighbors(graph, currentNode);
    for (const neighbor of neighbors) {
      if (!unvisited.has(neighbor)) continue;

      const distance = calculateDistance(
        graph.nodes[currentNode].lat,
        graph.nodes[currentNode].lng,
        graph.nodes[neighbor].lat,
        graph.nodes[neighbor].lng
      );

      const alt = distances[currentNode] + distance;
      if (alt < distances[neighbor]) {
        distances[neighbor] = alt;
        previous[neighbor] = currentNode;
      }
    }
  }

  // Reconstruct path
  const path = [];
  let current = endNode;
  while (current !== null) {
    path.unshift(current);
    current = previous[current];
  }

  return path.length > 1 ? path : null;
}

function getNeighbors(graph, node) {
  const neighbors = [];
  for (const [node1, node2] of graph.edges) {
    if (node1 === node) neighbors.push(node2);
    if (node2 === node) neighbors.push(node1);
  }
  return neighbors;
}

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

function findNearestNode(lat, lng) {
  let nearestNode = null;
  let minDistance = Infinity;

  for (const [nodeName, coords] of Object.entries(campusWalkways.nodes)) {
    const distance = calculateDistance(lat, lng, coords.lat, coords.lng);
    if (distance < minDistance) {
      minDistance = distance;
      nearestNode = nodeName;
    }
  }

  return nearestNode;
}

function generateWalkablePath(startLat, startLng, endLat, endLng, startBuilding = null, endBuilding = null) {
  // ALWAYS use building names to get proper road nodes - never use raw coordinates
  let startNode = startBuilding && buildingToNode[startBuilding] 
    ? buildingToNode[startBuilding] 
    : findNearestNode(startLat, startLng);
    
  let endNode = endBuilding && buildingToNode[endBuilding]
    ? buildingToNode[endBuilding]
    : findNearestNode(endLat, endLng);

  console.log(`🗺️  Pathfinding: ${startNode} → ${endNode}`);

  // If start and end are the same location
  if (startNode === endNode) {
    const nodeCoords = campusWalkways.nodes[startNode];
    console.log('ℹ️  Start and end are at the same location');
    return {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [[nodeCoords.lng, nodeCoords.lat]]
      },
      properties: {
        distance: 0,
        pathType: 'same_location',
        directions: ['You are already at the destination']
      }
    };
  }

  // Find path through walkway network - ONLY road nodes
  const pathNodes = findShortestPath(campusWalkways, startNode, endNode);

  if (!pathNodes || pathNodes.length === 0) {
    console.log('⚠️  No path found through road network');
    return {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: []
      },
      properties: {
        distance: 0,
        pathType: 'no_route',
        error: 'No walkable route found'
      }
    };
  }

  console.log(`✅ Path found with ${pathNodes.length} waypoints:`, pathNodes.join(' → '));

  // Build coordinates array - ONLY road node coordinates, NO start/end points
  const coordinates = [];
  
  // Add ALL road nodes in the path - this ensures we follow roads completely
  for (let i = 0; i < pathNodes.length; i++) {
    const coords = campusWalkways.nodes[pathNodes[i]];
    coordinates.push([coords.lng, coords.lat]);
  }

  // Calculate total distance along roads only
  let totalDistance = 0;
  for (let i = 0; i < coordinates.length - 1; i++) {
    totalDistance += calculateDistance(
      coordinates[i][1], coordinates[i][0],
      coordinates[i + 1][1], coordinates[i + 1][0]
    );
  }

  console.log(`📏 Total distance: ${Math.round(totalDistance)}m`);
  console.log(`🛣️  Route uses ${pathNodes.length} road nodes - NO direct lines`);

  // Generate turn-by-turn directions
  const directions = generateDirections(pathNodes);

  return {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: coordinates
    },
    properties: {
      distance: Math.round(totalDistance),
      pathType: 'walkway',
      directions: directions,
      waypoints: pathNodes
    }
  };
}

function generateDirections(pathNodes) {
  const directions = [];
  const nodeNames = {
    'main_gate': 'Main Gate',
    'gate_junction': 'Gate Junction',
    'parking_junction': 'Parking Area',
    'admin_junction': 'Administration Building',
    'medical_junction': 'Medical Center',
    'central_plaza': 'Central Plaza',
    'main_road_north': 'Main Road North',
    'main_road_south': 'Main Road South',
    'science_road': 'Science Block Road',
    'science_junction': 'Science Junction',
    'eng_road_west': 'Engineering Road West',
    'eng_junction': 'Engineering Junction',
    'eng_road_east': 'Engineering Road East',
    'library_junction': 'Library',
    'workshop_road': 'Workshop Area',
    'cafeteria_road': 'Cafeteria',
    'cafeteria_junction': 'Cafeteria Junction',
    'hostel_road_south_1': 'Girls Hostel Road',
    'hostel_road_south_2': 'Girls Hostel Area',
    'hostel_road_south_3': 'Girls Hostel Block 2',
    'hostel_main_road': 'Hostel Main Road',
    'hostel_road_north_1': 'Boys Hostel Road',
    'hostel_road_north_2': 'Boys Hostel Area',
    'hostel_road_north_3': 'Boys Hostel Block 2',
    'sports_road': 'Sports Complex',
    'sports_junction': 'Sports Junction',
    'north_gate_road': 'North Gate Road',
    'north_gate': 'North Gate',
    'student_center_road': 'Student Center',
    'student_junction': 'Student Junction'
  };

  for (let i = 0; i < pathNodes.length; i++) {
    const node = pathNodes[i];
    const nodeName = nodeNames[node] || node;

    if (i === 0) {
      directions.push(`Start at ${nodeName}`);
    } else if (i === pathNodes.length - 1) {
      directions.push(`Arrive at ${nodeName}`);
    } else {
      directions.push(`Continue through ${nodeName}`);
    }
  }

  return directions;
}

module.exports = {
  generateWalkablePath,
  campusWalkways,
  buildingToNode
};
