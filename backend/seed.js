require('dotenv').config();
const mongoose = require('mongoose');
const Building = require('./models/Building');
const Room = require('./models/Room');
const Landmark = require('./models/Landmark');

// Base coordinates: 18.05997021737144, 83.40515640049136
// Creating realistic campus layout within 100m radius
// 1 degree latitude ≈ 111km, so 100m ≈ 0.0009 degrees
// 1 degree longitude ≈ 111km * cos(latitude), so 100m ≈ 0.0009 degrees

const centerLat = 18.05997021737144;
const centerLng = 83.40515640049136;

const buildings = [
  {
    name: 'Main Academic Block',
    coordinates: { lat: centerLat, lng: centerLng },
    description: 'Central academic building with lecture halls and laboratories',
    image: 'https://picsum.photos/seed/academic-main/600/400'
  },
  {
    name: 'Computer Science Block',
    coordinates: { lat: centerLat + 0.0006, lng: centerLng + 0.0004 },
    description: 'Computer labs and CS department offices',
    image: 'https://picsum.photos/seed/cs-block/600/400'
  },
  {
    name: 'Engineering Block A',
    coordinates: { lat: centerLat - 0.0004, lng: centerLng + 0.0006 },
    description: 'Mechanical and Electronics Engineering departments',
    image: 'https://picsum.photos/seed/eng-block-a/600/400'
  },
  {
    name: 'Engineering Block B',
    coordinates: { lat: centerLat + 0.0005, lng: centerLng - 0.0005 },
    description: 'Civil and Electrical Engineering departments',
    image: 'https://picsum.photos/seed/eng-block-b/600/400'
  },
  {
    name: 'Library Building',
    coordinates: { lat: centerLat + 0.0004, lng: centerLng - 0.0006 },
    description: 'Central library with digital resources',
    image: 'https://picsum.photos/seed/library/600/400'
  },
  {
    name: 'Administration Office',
    coordinates: { lat: centerLat - 0.0006, lng: centerLng - 0.0004 },
    description: 'Administrative offices and registrar',
    image: 'https://picsum.photos/seed/admin/600/400'
  },
  {
    name: 'Student Center',
    coordinates: { lat: centerLat + 0.0007, lng: centerLng },
    description: 'Student activities and recreation',
    image: 'https://picsum.photos/seed/student-center/600/400'
  },
  {
    name: 'Cafeteria',
    coordinates: { lat: centerLat, lng: centerLng + 0.0007 },
    description: 'Main dining hall and food court',
    image: 'https://picsum.photos/seed/cafeteria/600/400'
  },
  {
    name: 'Hostel Block A',
    coordinates: { lat: centerLat + 0.0008, lng: centerLng + 0.0006 },
    description: 'Student residential accommodation',
    image: 'https://picsum.photos/seed/hostel-a/600/400'
  },
  {
    name: 'Hostel Block B',
    coordinates: { lat: centerLat - 0.0008, lng: centerLng + 0.0004 },
    description: 'Student residential accommodation',
    image: 'https://picsum.photos/seed/hostel-b/600/400'
  },
  {
    name: 'Hostel Block C',
    coordinates: { lat: centerLat + 0.0006, lng: centerLng - 0.0007 },
    description: 'Student residential accommodation',
    image: 'https://picsum.photos/seed/hostel-c/600/400'
  },
  {
    name: 'Sports Complex',
    coordinates: { lat: centerLat + 0.0006, lng: centerLng + 0.0008 },
    description: 'Indoor sports facilities and gymnasium',
    image: 'https://picsum.photos/seed/sports/600/400'
  },
  {
    name: 'Auditorium',
    coordinates: { lat: centerLat - 0.0007, lng: centerLng },
    description: 'Main auditorium for events and seminars',
    image: 'https://picsum.photos/seed/auditorium/600/400'
  },
  {
    name: 'Science Lab Block',
    coordinates: { lat: centerLat + 0.0004, lng: centerLng + 0.0006 },
    description: 'Physics, Chemistry, and Biology laboratories',
    image: 'https://picsum.photos/seed/science-lab/600/400'
  },
  {
    name: 'Workshop Building',
    coordinates: { lat: centerLat - 0.0005, lng: centerLng + 0.0007 },
    description: 'Engineering workshops and practical training',
    image: 'https://picsum.photos/seed/workshop/600/400'
  },
  {
    name: 'Medical Center',
    coordinates: { lat: centerLat - 0.0002, lng: centerLng - 0.0006 },
    description: 'Campus health center with medical facilities',
    image: 'https://picsum.photos/seed/medical/600/400'
  }
];

const landmarks = [
  {
    name: 'Main Gate',
    coordinates: { lat: centerLat - 0.0009, lng: centerLng - 0.0006 },
    description: 'Primary entrance to campus',
    image: 'https://picsum.photos/seed/main-gate/600/400'
  },
  {
    name: 'North Gate',
    coordinates: { lat: centerLat + 0.0009, lng: centerLng + 0.0003 },
    description: 'Secondary entrance near hostels',
    image: 'https://picsum.photos/seed/north-gate/600/400'
  },
  {
    name: 'Central Garden',
    coordinates: { lat: centerLat + 0.0002, lng: centerLng + 0.0002 },
    description: 'Landscaped garden with seating',
    image: 'https://picsum.photos/seed/garden/600/400'
  },
  {
    name: 'Parking Area A',
    coordinates: { lat: centerLat - 0.0006, lng: centerLng + 0.0007 },
    description: 'Main parking facility',
    image: 'https://picsum.photos/seed/parking-a/600/400'
  },
  {
    name: 'Parking Area B',
    coordinates: { lat: centerLat + 0.0007, lng: centerLng - 0.0004 },
    description: 'Additional parking near academic blocks',
    image: 'https://picsum.photos/seed/parking-b/600/400'
  },
  {
    name: 'ATM & Bank',
    coordinates: { lat: centerLat + 0.0003, lng: centerLng - 0.0004 },
    description: 'Banking services and ATM',
    image: 'https://picsum.photos/seed/atm-bank/600/400'
  },
  {
    name: 'Stationary Shop',
    coordinates: { lat: centerLat - 0.0003, lng: centerLng + 0.0004 },
    description: 'Books and stationery supplies',
    image: 'https://picsum.photos/seed/stationary/600/400'
  },
  {
    name: 'Basketball Court',
    coordinates: { lat: centerLat + 0.0005, lng: centerLng + 0.0007 },
    description: 'Outdoor basketball court',
    image: 'https://picsum.photos/seed/basketball/600/400'
  },
  {
    name: 'Football Ground',
    coordinates: { lat: centerLat + 0.0008, lng: centerLng + 0.0008 },
    description: 'Full-size football field',
    image: 'https://picsum.photos/seed/football/600/400'
  },
  {
    name: 'Fountain Plaza',
    coordinates: { lat: centerLat, lng: centerLng - 0.0003 },
    description: 'Central fountain and meeting point',
    image: 'https://picsum.photos/seed/fountain/600/400'
  },
  {
    name: 'Cycle Stand',
    coordinates: { lat: centerLat - 0.0004, lng: centerLng - 0.0003 },
    description: 'Bicycle parking area',
    image: 'https://picsum.photos/seed/cycle-stand/600/400'
  },
  {
    name: 'Bus Stop',
    coordinates: { lat: centerLat - 0.0008, lng: centerLng - 0.0005 },
    description: 'Campus bus stop',
    image: 'https://picsum.photos/seed/bus-stop/600/400'
  }
];

async function seedDatabase() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('\n🗑️  Clearing existing data...');
    await Building.deleteMany({});
    await Room.deleteMany({});
    await Landmark.deleteMany({});
    console.log('✅ Cleared existing data');

    // Insert buildings
    console.log('\n🏢 Inserting buildings...');
    const insertedBuildings = await Building.insertMany(buildings);
    console.log(`✅ Inserted ${insertedBuildings.length} buildings`);

    // Insert landmarks
    console.log('\n📍 Inserting landmarks...');
    const insertedLandmarks = await Landmark.insertMany(landmarks);
    console.log(`✅ Inserted ${insertedLandmarks.length} landmarks`);

    // Create rooms for academic buildings
    console.log('\n🚪 Inserting rooms...');
    
    const mainAcademic = insertedBuildings.find(b => b.name === 'Main Academic Block');
    const csBlock = insertedBuildings.find(b => b.name === 'Computer Science Block');
    const engBlockA = insertedBuildings.find(b => b.name === 'Engineering Block A');
    const engBlockB = insertedBuildings.find(b => b.name === 'Engineering Block B');
    const scienceBlock = insertedBuildings.find(b => b.name === 'Science Lab Block');

    const rooms = [
      // Main Academic Block
      { roomNumber: '101', buildingId: mainAcademic._id, floor: 1, department: 'General', coordinates: { lat: centerLat + 0.00002, lng: centerLng + 0.00002 } },
      { roomNumber: '102', buildingId: mainAcademic._id, floor: 1, department: 'General', coordinates: { lat: centerLat + 0.00003, lng: centerLng + 0.00003 } },
      { roomNumber: '201', buildingId: mainAcademic._id, floor: 2, department: 'General', coordinates: { lat: centerLat + 0.00002, lng: centerLng + 0.00002 } },
      { roomNumber: '202', buildingId: mainAcademic._id, floor: 2, department: 'General', coordinates: { lat: centerLat + 0.00003, lng: centerLng + 0.00003 } },
      { roomNumber: '301', buildingId: mainAcademic._id, floor: 3, department: 'General', coordinates: { lat: centerLat + 0.00002, lng: centerLng + 0.00002 } },
      
      // Computer Science Block
      { roomNumber: 'CS101', buildingId: csBlock._id, floor: 1, department: 'Computer Science', coordinates: { lat: centerLat + 0.0006, lng: centerLng + 0.00042 } },
      { roomNumber: 'CS102', buildingId: csBlock._id, floor: 1, department: 'Computer Lab', coordinates: { lat: centerLat + 0.00061, lng: centerLng + 0.00043 } },
      { roomNumber: 'CS201', buildingId: csBlock._id, floor: 2, department: 'Computer Science', coordinates: { lat: centerLat + 0.0006, lng: centerLng + 0.00042 } },
      { roomNumber: 'CS202', buildingId: csBlock._id, floor: 2, department: 'AI Lab', coordinates: { lat: centerLat + 0.00061, lng: centerLng + 0.00043 } },
      
      // Engineering Block A
      { roomNumber: 'EA101', buildingId: engBlockA._id, floor: 1, department: 'Mechanical', coordinates: { lat: centerLat - 0.00039, lng: centerLng + 0.0006 } },
      { roomNumber: 'EA102', buildingId: engBlockA._id, floor: 1, department: 'Electronics', coordinates: { lat: centerLat - 0.0004, lng: centerLng + 0.00061 } },
      { roomNumber: 'EA201', buildingId: engBlockA._id, floor: 2, department: 'Mechanical', coordinates: { lat: centerLat - 0.00039, lng: centerLng + 0.0006 } },
      { roomNumber: 'EA202', buildingId: engBlockA._id, floor: 2, department: 'Electronics Lab', coordinates: { lat: centerLat - 0.0004, lng: centerLng + 0.00061 } },
      
      // Engineering Block B
      { roomNumber: 'EB101', buildingId: engBlockB._id, floor: 1, department: 'Civil', coordinates: { lat: centerLat + 0.00051, lng: centerLng - 0.0005 } },
      { roomNumber: 'EB102', buildingId: engBlockB._id, floor: 1, department: 'Electrical', coordinates: { lat: centerLat + 0.00052, lng: centerLng - 0.00049 } },
      { roomNumber: 'EB201', buildingId: engBlockB._id, floor: 2, department: 'Civil', coordinates: { lat: centerLat + 0.00051, lng: centerLng - 0.0005 } },
      { roomNumber: 'EB202', buildingId: engBlockB._id, floor: 2, department: 'Electrical Lab', coordinates: { lat: centerLat + 0.00052, lng: centerLng - 0.00049 } },
      
      // Science Lab Block
      { roomNumber: 'S101', buildingId: scienceBlock._id, floor: 1, department: 'Physics', coordinates: { lat: centerLat + 0.00041, lng: centerLng + 0.0006 } },
      { roomNumber: 'S102', buildingId: scienceBlock._id, floor: 1, department: 'Chemistry', coordinates: { lat: centerLat + 0.00042, lng: centerLng + 0.00061 } },
      { roomNumber: 'S201', buildingId: scienceBlock._id, floor: 2, department: 'Biology', coordinates: { lat: centerLat + 0.00041, lng: centerLng + 0.0006 } },
      { roomNumber: 'S202', buildingId: scienceBlock._id, floor: 2, department: 'Chemistry Lab', coordinates: { lat: centerLat + 0.00042, lng: centerLng + 0.00061 } }
    ];

    const insertedRooms = await Room.insertMany(rooms);
    console.log(`✅ Inserted ${insertedRooms.length} rooms`);

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Buildings: ${insertedBuildings.length}`);
    console.log(`   Rooms: ${insertedRooms.length}`);
    console.log(`   Landmarks: ${insertedLandmarks.length}`);
    console.log(`   Total: ${insertedBuildings.length + insertedRooms.length + insertedLandmarks.length} records`);
    console.log(`\n📍 Campus Center: ${centerLat}, ${centerLng}`);
    console.log('🗺️  Coverage: 100m radius');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
