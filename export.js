const fs = require('fs');
const path = require('path');

const SOURCE_DIR = 'C:\\Users\\STUDENT\\.gemini\\antigravity\\scratch\\ekkada';
const DEST_DIR = 'C:\\Users\\STUDENT\\.gemini\\antigravity\\scratch\\ekkada-feature-export';

const filesToExport = [
    // --- BACKEND ---
    { src: 'backend/models/User.js', dest: 'backend/models/User.js' },
    { src: 'backend/models/Trigger.js', dest: 'backend/models/Trigger.js' },
    { src: 'backend/models/Timetable.js', dest: 'backend/models/Timetable.js' },

    { src: 'backend/routes/auth.js', dest: 'backend/routes/auth.js' },
    { src: 'backend/routes/triggers.js', dest: 'backend/routes/triggers.js' },
    { src: 'backend/routes/timetable.js', dest: 'backend/routes/timetable.js' },

    { src: 'backend/middleware/auth.js', dest: 'backend/middleware/auth.js' },
    { src: 'backend/server.js', dest: 'backend/server-example.js' }, // Copy as an example so they can see Socket.io & MongoDB setup

    // --- FRONTEND ---
    { src: 'frontend/src/context/AuthContext.js', dest: 'frontend/context/AuthContext.js' },
    { src: 'frontend/src/store/useStore.js', dest: 'frontend/store/useStore.js' },
    { src: 'frontend/src/services/api.js', dest: 'frontend/services/api.js' },
    { src: 'frontend/src/pages/MainPanel.js', dest: 'frontend/pages/MainPanel.js' }
];

function ensureDirectoryExists(filePath) {
    const dirname = path.dirname(filePath);
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true });
    }
}

try {
    for (const file of filesToExport) {
        const sourcePath = path.join(SOURCE_DIR, file.src);
        const destPath = path.join(DEST_DIR, file.dest);

        if (fs.existsSync(sourcePath)) {
            ensureDirectoryExists(destPath);
            fs.copyFileSync(sourcePath, destPath);
            console.log(`✅ Copied: ${file.src}`);
        } else {
            console.error(`❌ Source missing: ${file.src}`);
        }
    }
    console.log('\n🎉 Export complete! Your module is ready in the ekkada-feature-export folder.');
} catch (err) {
    console.error('Error during export:', err);
}
