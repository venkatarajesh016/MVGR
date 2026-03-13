require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/buildings', require('./routes/buildings'));
app.use('/api/rooms', require('./routes/rooms'));
app.use('/api/landmarks', require('./routes/landmarks'));
app.use('/api', require('./routes/navigation'));
app.use('/api', require('./routes/csv'));
app.use('/api/triggers', require('./routes/triggers'));
app.use('/api/timetable', require('./routes/timetable'));

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Join campus room
  socket.on('join-campus', (campusId) => {
    socket.join(`campus-${campusId}`);
    console.log(`Socket ${socket.id} joined campus-${campusId}`);
  });

  // Join student room
  socket.on('join-student', (userId) => {
    socket.join(`student-${userId}`);
    console.log(`Socket ${socket.id} joined student-${userId}`);
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Make io accessible to routes
app.set('io', io);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
