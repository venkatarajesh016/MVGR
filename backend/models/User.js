const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Common fields for all roles
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['student', 'guest', 'admin', 'teacher'],
    required: true
  },
  avatar: {
    type: String,
    default: null
  },
  
  // Student fields
  name: {
    type: String,
    required: function() {
      return ['student', 'admin', 'teacher'].includes(this.role);
    }
  },
  studentId: {
    type: String,
    unique: true,
    sparse: true,
    required: function() {
      return this.role === 'student';
    }
  },
  
  // Guest fields
  username: {
    type: String,
    required: function() {
      return this.role === 'guest';
    }
  },
  
  // Admin & Teacher fields
  employeeId: {
    type: String,
    unique: true,
    sparse: true,
    required: function() {
      return ['admin', 'teacher'].includes(this.role);
    }
  },
  
  // Common for Student, Admin, Teacher
  college: {
    type: String,
    required: function() {
      return ['student', 'admin', 'teacher'].includes(this.role);
    }
  },
  year: {
    type: String,
    required: function() {
      return this.role === 'student';
    }
  },
  phone: {
    type: String,
    required: function() {
      return ['student', 'admin', 'teacher'].includes(this.role);
    }
  },
  
  // Admin & Teacher specific
  department: {
    type: String,
    required: function() {
      return ['admin', 'teacher'].includes(this.role);
    }
  },
  
  // Teacher specific
  subject: {
    type: String,
    required: function() {
      return this.role === 'teacher';
    }
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to get public profile (exclude password)
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('User', userSchema);
