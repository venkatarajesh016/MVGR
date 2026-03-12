require('dotenv').config();
const mongoose = require('mongoose');
const Building = require('./models/Building');
const Room = require('./models/Room');
const Landmark = require('./models/Landmark');

// Base coordinates: 18.060005, 83.405167
// Creating realistic campus layout within ~500m radius

const buildings = [
  {
    name: 'Main Academic Block',
    coordinates: { lat: 18.060005, lng: 83.405167 },
    description: 'Central academic building with lecture halls and laboratories'
  },
  {
    name: 'Engineering Block A',
    coordinates: { lat: 18.060450, lng: 83.405800 },
    description: 'Computer Science and Electronics departments'
  },
  {
    name: 'Engineering Block B',
    coordinates: { lat: 18.059550, lng: 83.405800 },
    description: 'Mechanical and Civil Engineering departments'
  },
  {
    name: 'Science Block',
    coordinates: { lat: 18.060450, lng: 83.404500 },
    description: 'Physics, Chemistry, and Biology laboratories'
  },
  {
    name: 'Central Library',
    coordinates: { lat: 18.060200, lng: 83.405900 },
    description: 'Three-floor library with digital resources and study areas'
  },
  {
    name: 'Administration Building',
    coordinates: { lat: 18.059700, lng: 83.404800 },
    description: 'Administrative offices, registrar, and accounts department'
  },
  {
    name: 'Student Center',
    coordinates: { lat: 18.060600, lng: 83.405400 },
    description: 'Student activities, clubs, and recreation facilities'
  },
  {
    name: 'Cafeteria & Food Court',
    coordinates: { lat: 18.059800, lng: 83.405500 },
    description: 'Main dining hall with multiple food outlets'
  },
  {
    name: 'Boys Hostel Block 1',
    coordinates: { lat: 18.061000, lng: 83.405000 },
    description: 'Residential accommodation for male students'
  },
  {
    name: 'Boys Hostel Block 2',
    coordinates: { lat: 18.061200, lng: 83.405500 },
    description: 'Additional residential accommodation for male students'
  },
  {
    name: 'Girls Hostel Block 1',
    coordinates: { lat: 18.059200, lng: 83.405000 },
    description: 'Residential accommodation for female students'
  },
  {
    name: 'Girls Hostel Block 2',
    coordinates: { lat: 18.059000, lng: 83.405500 },
    description: 'Additional residential accommodation for female students'
  },
  {
    name: 'Sports Complex',
    coordinates: { lat: 18.060800, lng: 83.406200 },
    description: 'Indoor sports facilities including gymnasium and courts'
  },
  {
    name: 'Auditorium',
    coordinates: { lat: 18.059500, lng: 83.404400 },
    description: 'Main auditorium with 500-seat capacity for events'
  },
  {
    name: 'Workshop Building',
    coordinates: { lat: 18.060300, lng: 83.406000 },
    description: 'Engineering workshops and practical training facilities'
  }
];

const landmarks = [
  {
    name: 'Main Gate',
    coordinates: { lat: 18.059400, lng: 83.404200 },
    description: 'Primary entrance to campus with security checkpoint'
  },
  {
    name: 'North Gate',
    coordinates: { lat: 18.061400, lng: 83.405300 },
    description: 'Secondary entrance near hostel blocks'
  },
  {
    name: 'Central Garden',
    coordinates: { lat: 18.060100, lng: 83.405300 },
    description: 'Beautiful landscaped garden with seating areas'
  },
  {
    name: 'Parking Area A',
    coordinates: { lat: 18.059600, lng: 83.404600 },
    description: 'Main parking facility for students and staff'
  },
  {
    name: 'Parking Area B',
    coordinates: { lat: 18.060700, lng: 83.405700 },
    description: 'Additional parking near academic blocks'
  },
  {
    name: 'Medical Center',
    coordinates: { lat: 18.059900, lng: 83.404700 },
    description: 'Campus health center with first aid and medical services'
  },
  {
    name: 'ATM & Bank',
    coordinates: { lat: 18.060000, lng: 83.405000 },
    description: 'Banking services and ATM facilities'
  },
  {
    name: 'Stationary Shop',
    coordinates: { lat: 18.059850, lng: 83.405200 },
    description: 'Books, stationery, and academic supplies'
  },
  {
    name: 'Basketball Court',
    coordinates: { lat: 18.060900, lng: 83.406000 },
    description: 'Outdoor basketball court'
  },
  {
    name: 'Football Ground',
    coordinates: { lat: 18.061100, lng: 83.406400 },
    description: 'Full-size football field with running track'
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
    const engBlockA = insertedBuildings.find(b => b.name === 'Engineering Block A');
    const engBlockB = insertedBuildings.find(b => b.name === 'Engineering Block B');
    const scienceBlock = insertedBuildings.find(b => b.name === 'Science Block');

    const rooms = [
      // Main Academic Block
      { roomNumber: '101', buildingId: mainAcademic._id, floor: 1, department: 'General', coordinates: { lat: 18.060020, lng: 83.405180 } },
      { roomNumber: '102', buildingId: mainAcademic._id, floor: 1, department: 'General', coordinates: { lat: 18.060030, lng: 83.405190 } },
      { roomNumber: '103', buildingId: mainAcademic._id, floor: 1, department: 'General', coordinates: { lat: 18.060040, lng: 83.405200 } },
      { roomNumber: '201', buildingId: mainAcademic._id, floor: 2, department: 'General', coordinates: { lat: 18.060020, lng: 83.405180 } },
      { roomNumber: '202', buildingId: mainAcademic._id, floor: 2, department: 'General', coordinates: { lat: 18.060030, lng: 83.405190 } },
      { roomNumber: '301', buildingId: mainAcademic._id, floor: 3, department: 'General', coordinates: { lat: 18.060020, lng: 83.405180 } },
      
      // Engineering Block A
      { roomNumber: 'A101', buildingId: engBlockA._id, floor: 1, department: 'Computer Science', coordinates: { lat: 18.060460, lng: 83.405820 } },
      { roomNumber: 'A102', buildingId: engBlockA._id, floor: 1, department: 'Computer Science', coordinates: { lat: 18.060470, lng: 83.405830 } },
      { roomNumber: 'A103', buildingId: engBlockA._id, floor: 1, department: 'Computer Lab', coordinates: { lat: 18.060480, lng: 83.405840 } },
      { roomNumber: 'A201', buildingId: engBlockA._id, floor: 2, department: 'Electronics', coordinates: { lat: 18.060460, lng: 83.405820 } },
      { roomNumber: 'A202', buildingId: engBlockA._id, floor: 2, department: 'Electronics', coordinates: { lat: 18.060470, lng: 83.405830 } },
      { roomNumber: 'A203', buildingId: engBlockA._id, floor: 2, department: 'Electronics Lab', coordinates: { lat: 18.060480, lng: 83.405840 } },
      
      // Engineering Block B
      { roomNumber: 'B101', buildingId: engBlockB._id, floor: 1, department: 'Mechanical', coordinates: { lat: 18.059560, lng: 83.405820 } },
      { roomNumber: 'B102', buildingId: engBlockB._id, floor: 1, department: 'Mechanical', coordinates: { lat: 18.059570, lng: 83.405830 } },
      { roomNumber: 'B103', buildingId: engBlockB._id, floor: 1, department: 'Workshop', coordinates: { lat: 18.059580, lng: 83.405840 } },
      { roomNumber: 'B201', buildingId: engBlockB._id, floor: 2, department: 'Civil', coordinates: { lat: 18.059560, lng: 83.405820 } },
      { roomNumber: 'B202', buildingId: engBlockB._id, floor: 2, department: 'Civil', coordinates: { lat: 18.059570, lng: 83.405830 } },
      
      // Science Block
      { roomNumber: 'S101', buildingId: scienceBlock._id, floor: 1, department: 'Physics', coordinates: { lat: 18.060460, lng: 83.404520 } },
      { roomNumber: 'S102', buildingId: scienceBlock._id, floor: 1, department: 'Physics Lab', coordinates: { lat: 18.060470, lng: 83.404530 } },
      { roomNumber: 'S201', buildingId: scienceBlock._id, floor: 2, department: 'Chemistry', coordinates: { lat: 18.060460, lng: 83.404520 } },
      { roomNumber: 'S202', buildingId: scienceBlock._id, floor: 2, department: 'Chemistry Lab', coordinates: { lat: 18.060470, lng: 83.404530 } },
      { roomNumber: 'S301', buildingId: scienceBlock._id, floor: 3, department: 'Biology', coordinates: { lat: 18.060460, lng: 83.404520 } },
      { roomNumber: 'S302', buildingId: scienceBlock._id, floor: 3, department: 'Biology Lab', coordinates: { lat: 18.060470, lng: 83.404530 } }
    ];

    const insertedRooms = await Room.insertMany(rooms);
    console.log(`✅ Inserted ${insertedRooms.length} rooms`);

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Buildings: ${insertedBuildings.length}`);
    console.log(`   Rooms: ${insertedRooms.length}`);
    console.log(`   Landmarks: ${insertedLandmarks.length}`);
    console.log(`   Total: ${insertedBuildings.length + insertedRooms.length + insertedLandmarks.length} records`);
    console.log('\n📍 Campus Center: 18.060005, 83.405167');
    console.log('🗺️  Coverage: ~500m radius');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
