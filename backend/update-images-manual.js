require('dotenv').config();
const mongoose = require('mongoose');
const Building = require('./models/Building');
const Landmark = require('./models/Landmark');

// Picsum image URLs for buildings
const buildingImages = {
  'Main Academic Block': 'https://picsum.photos/seed/academic-main/600/400',
  'Computer Science Block': 'https://picsum.photos/seed/cs-block/600/400',
  'Engineering Block A': 'https://picsum.photos/seed/eng-block-a/600/400',
  'Engineering Block B': 'https://picsum.photos/seed/eng-block-b/600/400',
  'Library Building': 'https://picsum.photos/seed/library/600/400',
  'Administration Office': 'https://picsum.photos/seed/admin/600/400',
  'Student Center': 'https://picsum.photos/seed/student-center/600/400',
  'Cafeteria': 'https://picsum.photos/seed/cafeteria/600/400',
  'Hostel Block A': 'https://picsum.photos/seed/hostel-a/600/400',
  'Hostel Block B': 'https://picsum.photos/seed/hostel-b/600/400',
  'Hostel Block C': 'https://picsum.photos/seed/hostel-c/600/400',
  'Sports Complex': 'https://picsum.photos/seed/sports/600/400',
  'Auditorium': 'https://picsum.photos/seed/auditorium/600/400',
  'Science Lab Block': 'https://picsum.photos/seed/science-lab/600/400',
  'Workshop Building': 'https://picsum.photos/seed/workshop/600/400',
  'Medical Center': 'https://picsum.photos/seed/medical/600/400'
};

// Picsum image URLs for landmarks
const landmarkImages = {
  'Main Gate': 'https://picsum.photos/seed/main-gate/600/400',
  'North Gate': 'https://picsum.photos/seed/north-gate/600/400',
  'Central Garden': 'https://picsum.photos/seed/garden/600/400',
  'Parking Area A': 'https://picsum.photos/seed/parking-a/600/400',
  'Parking Area B': 'https://picsum.photos/seed/parking-b/600/400',
  'ATM & Bank': 'https://picsum.photos/seed/atm-bank/600/400',
  'Stationary Shop': 'https://picsum.photos/seed/stationary/600/400',
  'Basketball Court': 'https://picsum.photos/seed/basketball/600/400',
  'Football Ground': 'https://picsum.photos/seed/football/600/400',
  'Fountain Plaza': 'https://picsum.photos/seed/fountain/600/400',
  'Cycle Stand': 'https://picsum.photos/seed/cycle-stand/600/400',
  'Bus Stop': 'https://picsum.photos/seed/bus-stop/600/400'
};

async function updateImages() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    console.log('📝 Updating building images...');
    let buildingCount = 0;
    for (const [name, imageUrl] of Object.entries(buildingImages)) {
      const result = await Building.updateOne(
        { name: name },
        { $set: { image: imageUrl } }
      );
      if (result.modifiedCount > 0) {
        console.log(`✅ Updated: ${name}`);
        buildingCount++;
      } else {
        console.log(`⚠️  Not found or already updated: ${name}`);
      }
    }

    console.log('\n📝 Updating landmark images...');
    let landmarkCount = 0;
    for (const [name, imageUrl] of Object.entries(landmarkImages)) {
      const result = await Landmark.updateOne(
        { name: name },
        { $set: { image: imageUrl } }
      );
      if (result.modifiedCount > 0) {
        console.log(`✅ Updated: ${name}`);
        landmarkCount++;
      } else {
        console.log(`⚠️  Not found or already updated: ${name}`);
      }
    }

    console.log('\n✅ Update complete!');
    console.log(`📊 Summary:`);
    console.log(`   Buildings updated: ${buildingCount}/${Object.keys(buildingImages).length}`);
    console.log(`   Landmarks updated: ${landmarkCount}/${Object.keys(landmarkImages).length}`);
    console.log(`   Total: ${buildingCount + landmarkCount} records updated`);
    console.log('\n🎉 All images now use Picsum URLs!');
    console.log('💡 Restart your backend server to see changes.');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

updateImages();
