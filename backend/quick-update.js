require('dotenv').config();
const mongoose = require('mongoose');
const Building = require('./models/Building');
const Landmark = require('./models/Landmark');

async function quickUpdate() {
  await mongoose.connect(process.env.MONGO_URI);
  
  // Update all buildings
  await Building.updateMany(
    { name: 'Main Academic Block' },
    { $set: { image: 'https://picsum.photos/seed/academic-main/600/400' } }
  );
  await Building.updateMany(
    { name: 'Computer Science Block' },
    { $set: { image: 'https://picsum.photos/seed/cs-block/600/400' } }
  );
  await Building.updateMany(
    { name: 'Engineering Block A' },
    { $set: { image: 'https://picsum.photos/seed/eng-block-a/600/400' } }
  );
  await Building.updateMany(
    { name: 'Engineering Block B' },
    { $set: { image: 'https://picsum.photos/seed/eng-block-b/600/400' } }
  );
  await Building.updateMany(
    { name: 'Library Building' },
    { $set: { image: 'https://picsum.photos/seed/library/600/400' } }
  );
  await Building.updateMany(
    { name: 'Administration Office' },
    { $set: { image: 'https://picsum.photos/seed/admin/600/400' } }
  );
  await Building.updateMany(
    { name: 'Student Center' },
    { $set: { image: 'https://picsum.photos/seed/student-center/600/400' } }
  );
  await Building.updateMany(
    { name: 'Cafeteria' },
    { $set: { image: 'https://picsum.photos/seed/cafeteria/600/400' } }
  );
  await Building.updateMany(
    { name: 'Hostel Block A' },
    { $set: { image: 'https://picsum.photos/seed/hostel-a/600/400' } }
  );
  await Building.updateMany(
    { name: 'Hostel Block B' },
    { $set: { image: 'https://picsum.photos/seed/hostel-b/600/400' } }
  );
  await Building.updateMany(
    { name: 'Hostel Block C' },
    { $set: { image: 'https://picsum.photos/seed/hostel-c/600/400' } }
  );
  await Building.updateMany(
    { name: 'Sports Complex' },
    { $set: { image: 'https://picsum.photos/seed/sports/600/400' } }
  );
  await Building.updateMany(
    { name: 'Auditorium' },
    { $set: { image: 'https://picsum.photos/seed/auditorium/600/400' } }
  );
  await Building.updateMany(
    { name: 'Science Lab Block' },
    { $set: { image: 'https://picsum.photos/seed/science-lab/600/400' } }
  );
  await Building.updateMany(
    { name: 'Workshop Building' },
    { $set: { image: 'https://picsum.photos/seed/workshop/600/400' } }
  );
  await Building.updateMany(
    { name: 'Medical Center' },
    { $set: { image: 'https://picsum.photos/seed/medical/600/400' } }
  );

  // Update all landmarks
  await Landmark.updateMany(
    { name: 'Main Gate' },
    { $set: { image: 'https://picsum.photos/seed/main-gate/600/400' } }
  );
  await Landmark.updateMany(
    { name: 'North Gate' },
    { $set: { image: 'https://picsum.photos/seed/north-gate/600/400' } }
  );
  await Landmark.updateMany(
    { name: 'Central Garden' },
    { $set: { image: 'https://picsum.photos/seed/garden/600/400' } }
  );
  await Landmark.updateMany(
    { name: 'Parking Area A' },
    { $set: { image: 'https://picsum.photos/seed/parking-a/600/400' } }
  );
  await Landmark.updateMany(
    { name: 'Parking Area B' },
    { $set: { image: 'https://picsum.photos/seed/parking-b/600/400' } }
  );
  await Landmark.updateMany(
    { name: 'ATM & Bank' },
    { $set: { image: 'https://picsum.photos/seed/atm-bank/600/400' } }
  );
  await Landmark.updateMany(
    { name: 'Stationary Shop' },
    { $set: { image: 'https://picsum.photos/seed/stationary/600/400' } }
  );
  await Landmark.updateMany(
    { name: 'Basketball Court' },
    { $set: { image: 'https://picsum.photos/seed/basketball/600/400' } }
  );
  await Landmark.updateMany(
    { name: 'Football Ground' },
    { $set: { image: 'https://picsum.photos/seed/football/600/400' } }
  );
  await Landmark.updateMany(
    { name: 'Fountain Plaza' },
    { $set: { image: 'https://picsum.photos/seed/fountain/600/400' } }
  );
  await Landmark.updateMany(
    { name: 'Cycle Stand' },
    { $set: { image: 'https://picsum.photos/seed/cycle-stand/600/400' } }
  );
  await Landmark.updateMany(
    { name: 'Bus Stop' },
    { $set: { image: 'https://picsum.photos/seed/bus-stop/600/400' } }
  );

  console.log('Done!');
  process.exit(0);
}

quickUpdate().catch(console.error);
