const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRE = '7d';

// Helper function to generate JWT
const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRE });
};

// Helper function to validate email
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// POST /api/auth/register - Register new user
router.post('/register', async (req, res) => {
  try {
    const { email, password, role, ...otherFields } = req.body;

    // Validate required fields
    if (!email || !password || !role) {
      return res.status(400).json({ message: 'Email, password, and role are required' });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Validate role
    if (!['student', 'guest', 'admin', 'teacher'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Role-specific validation
    if (role === 'student') {
      if (!otherFields.name || !otherFields.studentId || !otherFields.college || 
          !otherFields.year || !otherFields.phone) {
        return res.status(400).json({ 
          message: 'Student requires: name, studentId, college, year, phone' 
        });
      }
      // Check unique studentId
      const existingStudent = await User.findOne({ studentId: otherFields.studentId });
      if (existingStudent) {
        return res.status(400).json({ message: 'Student ID already exists' });
      }
    }

    if (role === 'guest') {
      if (!otherFields.username) {
        return res.status(400).json({ message: 'Guest requires: username' });
      }
    }

    if (role === 'admin') {
      if (!otherFields.name || !otherFields.employeeId || !otherFields.college || 
          !otherFields.department || !otherFields.phone) {
        return res.status(400).json({ 
          message: 'Admin requires: name, employeeId, college, department, phone' 
        });
      }
      const existingAdmin = await User.findOne({ employeeId: otherFields.employeeId });
      if (existingAdmin) {
        return res.status(400).json({ message: 'Employee ID already exists' });
      }
    }

    if (role === 'teacher') {
      if (!otherFields.name || !otherFields.employeeId || !otherFields.college || 
          !otherFields.department || !otherFields.subject || !otherFields.phone) {
        return res.status(400).json({ 
          message: 'Teacher requires: name, employeeId, college, department, subject, phone' 
        });
      }
      const existingTeacher = await User.findOne({ employeeId: otherFields.employeeId });
      if (existingTeacher) {
        return res.status(400).json({ message: 'Employee ID already exists' });
      }
    }

    // Create user
    const user = new User({
      email,
      password,
      role,
      ...otherFields
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: user.toJSON()
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// POST /api/auth/login - Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      message: 'Login successful',
      token,
      user: user.toJSON()
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// GET /api/auth/me - Get current user profile
router.get('/me', auth, async (req, res) => {
  try {
    res.json({ user: req.user });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/auth/update-profile - Update user profile
router.put('/update-profile', auth, async (req, res) => {
  try {
    const updates = req.body;
    
    // Remove fields that shouldn't be updated
    delete updates.password;
    delete updates.email;
    delete updates.role;
    delete updates._id;

    // Update user
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error during profile update' });
  }
});

// POST /api/auth/logout - Logout (client-side token removal)
router.post('/logout', auth, (req, res) => {
  res.json({ message: 'Logout successful' });
});

module.exports = router;
