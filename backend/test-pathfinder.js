// Test script for pathfinding
const { generateWalkablePath } = require('./utils/pathfinder');

console.log('🧪 Testing Campus Pathfinding\n');

// Test 1: Main Academic Block to Engineering Block A
console.log('Test 1: Main Academic Block → Engineering Block A');
const route1 = generateWalkablePath(
  18.060005, 83.405167, // Main Academic Block
  18.060450, 83.405800, // Engineering Block A
  'Main Academic Block',
  'Engineering Block A'
);
console.log(`Distance: ${route1.properties.distance}m`);
console.log(`Path type: ${route1.properties.pathType}`);
console.log(`Waypoints: ${route1.properties.waypoints?.join(' → ') || 'none'}`);
console.log('');

// Test 2: Central Library to Cafeteria
console.log('Test 2: Central Library → Cafeteria & Food Court');
const route2 = generateWalkablePath(
  18.060200, 83.405900, // Central Library
  18.059800, 83.405500, // Cafeteria
  'Central Library',
  'Cafeteria & Food Court'
);
console.log(`Distance: ${route2.properties.distance}m`);
console.log(`Path type: ${route2.properties.pathType}`);
console.log(`Waypoints: ${route2.properties.waypoints?.join(' → ') || 'none'}`);
console.log('');

// Test 3: Boys Hostel Block 1 to Science Block
console.log('Test 3: Boys Hostel Block 1 → Science Block');
const route3 = generateWalkablePath(
  18.061000, 83.405000, // Boys Hostel Block 1
  18.060450, 83.404500, // Science Block
  'Boys Hostel Block 1',
  'Science Block'
);
console.log(`Distance: ${route3.properties.distance}m`);
console.log(`Path type: ${route3.properties.pathType}`);
console.log(`Waypoints: ${route3.properties.waypoints?.join(' → ') || 'none'}`);
console.log('');

// Test 4: User location (campus center) to Sports Complex
console.log('Test 4: User Location (18.060005, 83.405167) → Sports Complex');
const route4 = generateWalkablePath(
  18.060005, 83.405167, // User location
  18.060800, 83.406200, // Sports Complex
  null,
  'Sports Complex'
);
console.log(`Distance: ${route4.properties.distance}m`);
console.log(`Path type: ${route4.properties.pathType}`);
console.log(`Waypoints: ${route4.properties.waypoints?.join(' → ') || 'none'}`);
console.log('');

console.log('✅ All tests completed!');
