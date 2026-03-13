require('dotenv').config();
const https = require('https');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Building = require('./models/Building');
const Landmark = require('./models/Landmark');

// Create directories if they don't exist
const buildingsDir = path.join(__dirname, 'uploads', 'buildings');
const landmarksDir = path.join(__dirname, 'uploads', 'landmarks');

if (!fs.existsSync(buildingsDir)) {
  fs.mkdirSync(buildingsDir, { recursive: true });
}
if (!fs.existsSync(landmarksDir)) {
  fs.mkdirSync(landmarksDir, { recursive: true });
}

// Function to download image
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

// Building images with colors
const buildingImages = [
  { name: 'Main Academic Block', color: '2563EB', filename: 'main-academic-block.png' },
  { name: 'Computer Science Block', color: '3B82F6', filename: 'computer-science-block.png' },
  { name: 'Engineering Block A', color: '1E40AF', filename: 'engineering-block-a.png' },
  { name: 'Engineering Block B', color: '1D4ED8', filename: 'engineering-block-b.png' },
  { name: 'Library Building', color: '7C3AED', filename: 'library-building.png' },
  { name: 'Administration Office', color: 'DC2626', filename: 'administration-office.png' },
  { name: 'Student Center', color: '10B981', filename: 'student-center.png' },
  { name: 'Cafeteria', color: 'F59E0B', filename: 'cafeteria.png' },
  { name: 'Hostel Block A', color: '8B5CF6', filename: 'hostel-block-a.png' },
  { name: 'Hostel Block B', color: 'A855F7', filename: 'hostel-block-b.png' },
  { name: 'Hostel Block C', color: 'C084FC', filename: 'hostel-block-c.png' },
  { name: 'Sports Complex', color: '14B8A6', filename: 'sports-complex.png' },
  { name: 'Auditorium', color: 'EF4444', filename: 'auditorium.png' },
  { name: 'Science Lab Block', color: '06B6D4', filename: 'science-lab-block.png' },
  { name: 'Workshop Building', color: 'F97316', filename: 'workshop-building.png' },
  { name: 'Medical Center', color: 'EC4899', filename: 'medical-center.png' }
];

const landmarkImages = [
  { name: 'Main Gate', color: '059669', filename: 'main-gate.png' },
  { name: 'North Gate', color: '0D9488', filename: 'north-gate.png' },
  { name: 'Central Garden', color: '16A34A', filename: 'central-garden.png' },
  { name: 'Parking Area A', color: '64748B', filename: 'parking-area-a.png' },
  { name: 'Parking Area B', color: '475569', filename: 'parking-area-b.png' },
  { name: 'ATM & Bank', color: '0891B2', filename: 'atm-bank.png' },
  { name: 'Stationary Shop', color: 'D97706', filename: 'stationary-shop.png' },
  { name: 'Basketball Court', color: 'EA580C', filename: 'basketball-court.png' },
  { name: 'Football Ground', color: '15803D', filename: 'football-ground.png' },
  { name: 'Fountain Plaza', color: '0EA5E9', filename: 'fountain-plaza.png' },
  { name: 'Cycle Stand', color: '84CC16', filename: 'cycle-stand.png' },
  { name: 'Bus Stop', color: 'F43F5E', filename: 'bus-stop.png' }
];

async function downloadAllImages() {
  try {
    console.log('📥 Downloading building images...');
    
    // Download building images
    for (const building of buildingImages) {
      const url = `https://via.placeholder.com/600x400/${building.color}/ffffff?text=${encodeURIComponent(building.name)}`;
      const filepath = path.join(buildingsDir, building.filename);
      
      try {
        await downloadImage(url, filepath);
        console.log(`✅ Downloaded: ${building.name}`);
      } catch (error) {
        console.error(`❌ Failed to download ${building.name}:`, error.message);
      }
    }

    console.log('\n📥 Downloading landmark images...');
    
    // Download landmark images
    for (const landmark of landmarkImages) {
      const url = `https://via.placeholder.com/600x400/${landmark.color}/ffffff?text=${encodeURIComponent(landmark.name)}`;
      const filepath = path.join(landmarksDir, landmark.filename);
      
      try {
        await downloadImage(url, filepath);
        console.log(`✅ Downloaded: ${landmark.name}`);
      } catch (error) {
        console.error(`❌ Failed to download ${landmark.name}:`, error.message);
      }
    }

    console.log('\n✅ All images downloaded successfully!');
    console.log('\n📝 Updating database...');
    
    // Connect to database
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Update buildings
    for (const building of buildingImages) {
      await Building.updateOne(
        { name: building.name },
        { $set: { image: `/uploads/buildings/${building.filename}` } }
      );
      console.log(`✅ Updated database: ${building.name}`);
    }

    // Update landmarks
    for (const landmark of landmarkImages) {
      await Landmark.updateOne(
        { name: landmark.name },
        { $set: { image: `/uploads/landmarks/${landmark.filename}` } }
      );
      console.log(`✅ Updated database: ${landmark.name}`);
    }

    console.log('\n✅ Database updated successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Building images: ${buildingImages.length}`);
    console.log(`   Landmark images: ${landmarkImages.length}`);
    console.log(`   Total: ${buildingImages.length + landmarkImages.length} images`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

downloadAllImages();
