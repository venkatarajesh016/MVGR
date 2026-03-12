// Campus walkable paths network
// Defines the actual walking paths between key points on campus
// Coordinates based on your campus center: 18.060005, 83.405167

const campusWalkways = {
  // Main intersections and path nodes (road junctions)
  nodes: {
    // Main entrance area
    'main_gate': { lat: 18.059400, lng: 83.404200 },
    'gate_junction': { lat: 18.059500, lng: 83.404400 },
    'parking_junction': { lat: 18.059600, lng: 83.404600 },
    
    // Central road system
    'admin_junction': { lat: 18.059700, lng: 83.404800 },
    'medical_junction': { lat: 18.059900, lng: 83.404700 },
    'central_plaza': { lat: 18.060005, lng: 83.405167 },
    'main_road_north': { lat: 18.060300, lng: 83.405167 },
    'main_road_south': { lat: 18.059700, lng: 83.405167 },
    
    // Academic area roads
    'science_road': { lat: 18.060450, lng: 83.404500 },
    'science_junction': { lat: 18.060350, lng: 83.404700 },
    'eng_road_west': { lat: 18.060200, lng: 83.405600 },
    'eng_junction': { lat: 18.060300, lng: 83.405800 },
    'eng_road_east': { lat: 18.060100, lng: 83.405900 },
    
    // Library and workshop area
    'library_junction': { lat: 18.060200, lng: 83.405900 },
    'workshop_road': { lat: 18.060300, lng: 83.406000 },
    
    // Cafeteria area
    'cafeteria_road': { lat: 18.059800, lng: 83.405500 },
    'cafeteria_junction': { lat: 18.059900, lng: 83.405400 },
    
    // Hostel area roads
    'hostel_road_south_1': { lat: 18.059200, lng: 83.405000 },
    'hostel_road_south_2': { lat: 18.059100, lng: 83.405300 },
    'hostel_road_south_3': { lat: 18.059000, lng: 83.405500 },
    'hostel_main_road': { lat: 18.060000, lng: 83.405000 },
    'hostel_road_north_1': { lat: 18.061000, lng: 83.405000 },
    'hostel_road_north_2': { lat: 18.061100, lng: 83.405300 },
    'hostel_road_north_3': { lat: 18.061200, lng: 83.405500 },
    
    // Sports and north area
    'sports_road': { lat: 18.060800, lng: 83.406200 },
    'sports_junction': { lat: 18.060700, lng: 83.405900 },
    'north_gate_road': { lat: 18.061300, lng: 83.405300 },
    'north_gate': { lat: 18.061400, lng: 83.405300 },
    
    // Student center area
    'student_center_road': { lat: 18.060600, lng: 83.405400 },
    'student_junction': { lat: 18.060500, lng: 83.405300 }
  },

  // Connections between nodes (bidirectional roads/paths)
  edges: [
    // Main entrance roads
    ['main_gate', 'gate_junction'],
    ['gate_junction', 'parking_junction'],
    ['parking_junction', 'admin_junction'],
    ['admin_junction', 'medical_junction'],
    
    // Central main road (north-south)
    ['admin_junction', 'main_road_south'],
    ['main_road_south', 'central_plaza'],
    ['central_plaza', 'main_road_north'],
    ['main_road_north', 'student_center_road'],
    
    // East-west roads through campus
    ['medical_junction', 'main_road_south'],
    ['main_road_south', 'cafeteria_junction'],
    ['cafeteria_junction', 'cafeteria_road'],
    
    ['central_plaza', 'cafeteria_junction'],
    ['central_plaza', 'eng_road_west'],
    ['eng_road_west', 'eng_junction'],
    ['eng_junction', 'eng_road_east'],
    ['eng_road_east', 'library_junction'],
    
    // Science block roads
    ['science_junction', 'science_road'],
    ['science_junction', 'main_road_north'],
    ['science_junction', 'admin_junction'],
    
    // Library and workshop area
    ['library_junction', 'workshop_road'],
    ['workshop_road', 'sports_junction'],
    ['sports_junction', 'sports_road'],
    
    // Student center connections
    ['student_center_road', 'student_junction'],
    ['student_junction', 'main_road_north'],
    ['student_junction', 'hostel_road_north_1'],
    
    // Hostel area roads (south)
    ['main_road_south', 'hostel_main_road'],
    ['hostel_main_road', 'hostel_road_south_1'],
    ['hostel_road_south_1', 'hostel_road_south_2'],
    ['hostel_road_south_2', 'hostel_road_south_3'],
    ['cafeteria_junction', 'hostel_road_south_2'],
    
    // Hostel area roads (north)
    ['hostel_main_road', 'hostel_road_north_1'],
    ['hostel_road_north_1', 'hostel_road_north_2'],
    ['hostel_road_north_2', 'hostel_road_north_3'],
    ['hostel_road_north_2', 'north_gate_road'],
    ['north_gate_road', 'north_gate'],
    
    // Sports complex connections
    ['hostel_road_north_2', 'sports_junction'],
    ['student_center_road', 'sports_junction'],
    
    // Cross connections
    ['eng_road_west', 'cafeteria_junction'],
    ['library_junction', 'eng_road_east'],
    ['sports_junction', 'library_junction']
  ]
};

// Building to nearest road node mapping
const buildingToNode = {
  'Main Academic Block': 'central_plaza',
  'Engineering Block A': 'eng_junction',
  'Engineering Block B': 'eng_road_west',
  'Science Block': 'science_road',
  'Central Library': 'library_junction',
  'Administration Building': 'admin_junction',
  'Student Center': 'student_center_road',
  'Cafeteria & Food Court': 'cafeteria_road',
  'Boys Hostel Block 1': 'hostel_road_north_1',
  'Boys Hostel Block 2': 'hostel_road_north_3',
  'Girls Hostel Block 1': 'hostel_road_south_1',
  'Girls Hostel Block 2': 'hostel_road_south_3',
  'Sports Complex': 'sports_road',
  'Auditorium': 'gate_junction',
  'Workshop Building': 'workshop_road',
  'Main Gate': 'main_gate',
  'North Gate': 'north_gate',
  'Medical Center': 'medical_junction',
  'Parking Area A': 'parking_junction'
};

// Dijkstra's algorithm for shortest path
function findShortestPath(graph, startNode, endNode) {
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
  // Try to use building names first
  let startNode = startBuilding && buildingToNode[startBuilding] 
    ? buildingToNode[startBuilding] 
    : findNearestNode(startLat, startLng);
    
  let endNode = endBuilding && buildingToNode[endBuilding]
    ? buildingToNode[endBuilding]
    : findNearestNode(endLat, endLng);

  console.log(`🗺️  Pathfinding: ${startNode} → ${endNode}`);

  // Find path through walkway network
  const pathNodes = findShortestPath(campusWalkways, startNode, endNode);

  if (!pathNodes || pathNodes.length === 0) {
    console.log('⚠️  No path found, using direct route');
    // Fallback to direct path if no route found
    return {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          [startLng, startLat],
          [endLng, endLat]
        ]
      },
      properties: {
        distance: Math.round(calculateDistance(startLat, startLng, endLat, endLng)),
        pathType: 'direct'
      }
    };
  }

  console.log(`✅ Path found with ${pathNodes.length} waypoints:`, pathNodes.join(' → '));

  // Build coordinates array
  const coordinates = [];
  
  // Add start point
  coordinates.push([startLng, startLat]);
  
  // Add first road node if start point is not at the node
  const firstNodeCoords = campusWalkways.nodes[pathNodes[0]];
  const distToFirstNode = calculateDistance(startLat, startLng, firstNodeCoords.lat, firstNodeCoords.lng);
  if (distToFirstNode > 5) { // Only add if more than 5 meters away
    coordinates.push([firstNodeCoords.lng, firstNodeCoords.lat]);
  }
  
  // Add all intermediate road nodes
  for (let i = 1; i < pathNodes.length; i++) {
    const coords = campusWalkways.nodes[pathNodes[i]];
    coordinates.push([coords.lng, coords.lat]);
  }
  
  // Add last road node if end point is not at the node
  const lastNodeCoords = campusWalkways.nodes[pathNodes[pathNodes.length - 1]];
  const distToLastNode = calculateDistance(endLat, endLng, lastNodeCoords.lat, lastNodeCoords.lng);
  if (distToLastNode > 5) { // Only add if more than 5 meters away
    coordinates.push([lastNodeCoords.lng, lastNodeCoords.lat]);
  }
  
  // Add end point
  coordinates.push([endLng, endLat]);

  // Calculate total distance
  let totalDistance = 0;
  for (let i = 0; i < coordinates.length - 1; i++) {
    totalDistance += calculateDistance(
      coordinates[i][1], coordinates[i][0],
      coordinates[i + 1][1], coordinates[i + 1][0]
    );
  }

  console.log(`📏 Total distance: ${Math.round(totalDistance)}m`);

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
