const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'] }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Make io accessible to routes
app.set('io', io);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/campus', require('./routes/campus'));
app.use('/api/rooms', require('./routes/rooms'));
app.use('/api/search', require('./routes/search'));
app.use('/api/triggers', require('./routes/triggers'));
app.use('/api/timetable', require('./routes/timetable'));
app.use('/api/csv', require('./routes/csv'));

// Socket.io
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join-campus', (campusId) => {
        socket.join(`campus-${campusId}`);
        console.log(`Socket ${socket.id} joined campus-${campusId}`);
    });

    socket.on('join-student', (studentId) => {
        socket.join(`student-${studentId}`);
        console.log(`Socket ${socket.id} joined student-${studentId}`);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// MongoDB Connection
const { MongoMemoryServer } = require('mongodb-memory-server');

async function connectDB() {
    const atlasUri = process.env.MONGODB_URI;
    const useAtlas = atlasUri && !atlasUri.includes('cluster0.mongodb.net/ekkada');

    if (useAtlas) {
        // Use real Atlas if a valid custom URI is provided
        try {
            await mongoose.connect(atlasUri, { serverSelectionTimeoutMS: 5000 });
            console.log('✅ MongoDB Atlas connected');
            return;
        } catch (err) {
            console.warn('⚠️  Atlas connection failed, falling back to in-memory DB');
        }
    }

    // Use in-memory MongoDB (works offline, no signup needed)
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri);
    console.log('✅ In-memory MongoDB started at', uri);
    console.log('ℹ️  Data resets on server restart. Set MONGODB_URI in .env for persistence.');
}

connectDB();

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`🚀 Ekkada server running on port ${PORT}`);
});

module.exports = { app, io };
