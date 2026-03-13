import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Eye, EyeOff, Mail, Lock, User, Phone, Building2, 
  GraduationCap, Shield, UserCircle, CreditCard, BookOpen,
  Calendar, Loader2, MapPin
} from 'lucide-react';

function AuthPage() {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    username: '',
    studentId: '',
    employeeId: '',
    college: '',
    year: '',
    department: '',
    subject: '',
    phone: '',
    avatar: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedRole(null);
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        // Registration
        const registrationData = {
          email: formData.email,
          password: formData.password,
          role: selectedRole
        };

        if (selectedRole === 'student') {
          registrationData.name = formData.name;
          registrationData.studentId = formData.studentId;
          registrationData.college = formData.college;
          registrationData.year = formData.year;
          registrationData.phone = formData.phone;
        } else if (selectedRole === 'guest') {
          registrationData.username = formData.username;
        } else if (selectedRole === 'admin') {
          registrationData.name = formData.name;
          registrationData.employeeId = formData.employeeId;
          registrationData.college = formData.college;
          registrationData.department = formData.department;
          registrationData.phone = formData.phone;
        } else if (selectedRole === 'teacher') {
          registrationData.name = formData.name;
          registrationData.employeeId = formData.employeeId;
          registrationData.college = formData.college;
          registrationData.department = formData.department;
          registrationData.subject = formData.subject;
          registrationData.phone = formData.phone;
        }

        if (formData.avatar) {
          registrationData.avatar = formData.avatar;
        }

        const result = await register(registrationData);
        
        if (result.success) {
          navigate('/');
        } else {
          setError(result.message);
        }
      } else {
        // Login
        const result = await login(formData.email, formData.password);
        
        if (result.success) {
          navigate('/');
        } else {
          setError(result.message);
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedCategory(null);
    setSelectedRole(null);
    setFormData({
      email: '',
      password: '',
      name: '',
      username: '',
      studentId: '',
      employeeId: '',
      college: '',
      year: '',
      department: '',
      subject: '',
      phone: '',
      avatar: ''
    });
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-4 overflow-y-auto">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl relative z-10 my-8"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-block"
          >
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl transform hover:rotate-12 transition-transform">
              <MapPin className="w-12 h-12 text-indigo-600" />
            </div>
          </motion.div>
          <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">Campus Navigator</h1>
          <p className="text-white/90 text-lg">Your journey starts here</p>
        </div>

        {/* Auth Container */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          {/* Tabs */}
          <div className="flex bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
            <button
              onClick={() => {
                setIsSignUp(false);
                resetForm();
              }}
              className={`flex-1 py-5 font-bold text-lg transition-all relative ${
                !isSignUp
                  ? 'text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Sign In
              {!isSignUp && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 to-purple-600"
                />
              )}
            </button>
            <button
              onClick={() => {
                setIsSignUp(true);
                resetForm();
              }}
              className={`flex-1 py-5 font-bold text-lg transition-all relative ${
                isSignUp
                  ? 'text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Sign Up
              {isSignUp && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 to-purple-600"
                />
              )}
            </button>
          </div>

          <div className="p-8 md:p-12 max-h-[calc(100vh-300px)] overflow-y-auto">
            <AnimatePresence mode="wait">
              {!isSignUp ? (
                <SignInForm
                  key="signin"
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleSubmit={handleSubmit}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  loading={loading}
                  error={error}
                />
              ) : (
                <SignUpForm
                  key="signup"
                  selectedCategory={selectedCategory}
                  selectedRole={selectedRole}
                  handleCategorySelect={handleCategorySelect}
                  handleRoleSelect={handleRoleSelect}
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleSubmit={handleSubmit}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  loading={loading}
                  error={error}
                />
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-white/80 mt-6 text-sm">
          © 2024 Campus Navigator. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
}

// Sign In Form Component
function SignInForm({ formData, handleInputChange, handleSubmit, showPassword, setShowPassword, loading, error }) {
  return (
    <motion.form
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      onSubmit={handleSubmit}
      className="space-y-6 max-w-md mx-auto py-4"
    >
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg"
        >
          <p className="font-medium">Error</p>
          <p className="text-sm">{error}</p>
        </motion.div>
      )}

      <div>
        <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">Password</label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Signing In...
          </>
        ) : (
          'Sign In'
        )}
      </button>
    </motion.form>
  );
}

// Sign Up Form Component
function SignUpForm({ 
  selectedCategory, 
  selectedRole, 
  handleCategorySelect, 
  handleRoleSelect,
  formData,
  handleInputChange,
  handleSubmit,
  showPassword,
  setShowPassword,
  loading,
  error
}) {
  if (!selectedCategory) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="space-y-8 py-4"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Choose Your Category
          </h2>
          <p className="text-gray-600">Select the category that best describes you</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Admin/Teacher Category */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.03, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleCategorySelect('staff')}
            className="group relative bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-8 hover:border-red-400 hover:shadow-2xl transition-all"
          >
            <div className="absolute top-4 right-4">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <Shield className="w-12 h-12 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">Admin / Teacher</h3>
                <p className="text-gray-600 text-sm">
                  For faculty members and administrative staff
                </p>
              </div>
              <div className="flex gap-2 mt-2">
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">Admin</span>
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">Teacher</span>
              </div>
            </div>
          </motion.button>

          {/* Student/Guest Category */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.03, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleCategorySelect('student')}
            className="group relative bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-8 hover:border-blue-400 hover:shadow-2xl transition-all"
          >
            <div className="absolute top-4 right-4">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <GraduationCap className="w-12 h-12 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">Student / Guest</h3>
                <p className="text-gray-600 text-sm">
                  For students and campus visitors
                </p>
              </div>
              <div className="flex gap-2 mt-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">Student</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">Guest</span>
              </div>
            </div>
          </motion.button>
        </div>
      </motion.div>
    );
  }

  if (!selectedRole) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="space-y-6 py-4"
      >
        <button
          type="button"
          onClick={() => handleCategorySelect(null)}
          className="text-gray-600 hover:text-gray-900 mb-4 flex items-center gap-2 font-medium"
        >
          ← Back to categories
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Select Your Role
          </h2>
          <p className="text-gray-600">Choose the role that applies to you</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {selectedCategory === 'staff' ? (
            <>
              <RoleCard
                icon={Shield}
                title="Admin"
                description="Administrative staff"
                onClick={() => handleRoleSelect('admin')}
                color="red"
              />
              <RoleCard
                icon={BookOpen}
                title="Teacher"
                description="Faculty member"
                onClick={() => handleRoleSelect('teacher')}
                color="green"
              />
            </>
          ) : (
            <>
              <RoleCard
                icon={User}
                title="Student"
                description="Enrolled student"
                onClick={() => handleRoleSelect('student')}
                color="blue"
              />
              <RoleCard
                icon={UserCircle}
                title="Guest"
                description="Campus visitor"
                onClick={() => handleRoleSelect('guest')}
                color="gray"
              />
            </>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6 max-w-3xl mx-auto py-4"
    >
      <button
        type="button"
        onClick={() => handleRoleSelect(null)}
        className="text-gray-600 hover:text-gray-900 mb-4 flex items-center gap-2 font-medium"
      >
        ← Back to roles
      </button>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg"
        >
          <p className="font-medium">Error</p>
          <p className="text-sm">{error}</p>
        </motion.div>
      )}

      <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 shadow-sm">
        <RoleFormFields
          role={selectedRole}
          formData={formData}
          handleInputChange={handleInputChange}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Creating Account...
          </>
        ) : (
          'Create Account'
        )}
      </button>
    </motion.form>
  );
}

// Role Card Component
function RoleCard({ icon: Icon, title, description, onClick, color }) {
  const colorClasses = {
    red: {
      bg: 'from-red-50 to-pink-50',
      border: 'border-red-200 hover:border-red-400',
      icon: 'from-red-500 to-pink-500',
      badge: 'bg-red-100 text-red-700'
    },
    green: {
      bg: 'from-green-50 to-emerald-50',
      border: 'border-green-200 hover:border-green-400',
      icon: 'from-green-500 to-emerald-500',
      badge: 'bg-green-100 text-green-700'
    },
    blue: {
      bg: 'from-blue-50 to-cyan-50',
      border: 'border-blue-200 hover:border-blue-400',
      icon: 'from-blue-500 to-cyan-500',
      badge: 'bg-blue-100 text-blue-700'
    },
    gray: {
      bg: 'from-gray-50 to-slate-50',
      border: 'border-gray-200 hover:border-gray-400',
      icon: 'from-gray-500 to-slate-500',
      badge: 'bg-gray-100 text-gray-700'
    }
  };

  const colors = colorClasses[color];

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`bg-gradient-to-br ${colors.bg} border-2 ${colors.border} rounded-xl p-6 hover:shadow-xl transition-all`}
    >
      <div className="flex flex-col items-center gap-3">
        <div className={`w-16 h-16 bg-gradient-to-br ${colors.icon} rounded-xl flex items-center justify-center shadow-lg`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
        <span className={`${colors.badge} px-3 py-1 rounded-full text-xs font-semibold mt-1`}>
          Select
        </span>
      </div>
    </motion.button>
  );
}

// Input Field Component
function InputField({ icon: Icon, label, type = 'text', name, value, onChange, required = true, placeholder }) {
  return (
    <div>
      <label className="block text-gray-700 font-semibold mb-2">{label}</label>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

// Role-specific Form Fields
function RoleFormFields({ role, formData, handleInputChange, showPassword, setShowPassword }) {
  const commonFields = (
    <>
      <InputField
        icon={Mail}
        label="Email Address"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="you@example.com"
      />
      
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Password</label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            minLength={6}
            className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            placeholder="Minimum 6 characters"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </>
  );

  if (role === 'student') {
    return (
      <div className="grid md:grid-cols-2 gap-6">
        <InputField icon={User} label="Full Name" name="name" value={formData.name} onChange={handleInputChange} placeholder="John Doe" />
        <InputField icon={CreditCard} label="Student ID" name="studentId" value={formData.studentId} onChange={handleInputChange} placeholder="CS21B1001" />
        <InputField icon={Building2} label="College Name" name="college" value={formData.college} onChange={handleInputChange} placeholder="MVGR College of Engineering" />
        <InputField icon={Calendar} label="Year & Branch" name="year" value={formData.year} onChange={handleInputChange} placeholder="3rd Year, Computer Science" />
        <InputField icon={Phone} label="Phone Number" type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+91 98765 43210" />
        {commonFields}
      </div>
    );
  }

  if (role === 'guest') {
    return (
      <div className="grid md:grid-cols-2 gap-6">
        <InputField icon={User} label="Username" name="username" value={formData.username} onChange={handleInputChange} placeholder="johndoe" />
        {commonFields}
      </div>
    );
  }

  if (role === 'admin') {
    return (
      <div className="grid md:grid-cols-2 gap-6">
        <InputField icon={User} label="Full Name" name="name" value={formData.name} onChange={handleInputChange} placeholder="John Doe" />
        <InputField icon={CreditCard} label="Employee ID" name="employeeId" value={formData.employeeId} onChange={handleInputChange} placeholder="EMP001" />
        <InputField icon={Building2} label="College Name" name="college" value={formData.college} onChange={handleInputChange} placeholder="MVGR College of Engineering" />
        <InputField icon={BookOpen} label="Department" name="department" value={formData.department} onChange={handleInputChange} placeholder="Administration" />
        <InputField icon={Phone} label="Phone Number" type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+91 98765 43210" />
        {commonFields}
      </div>
    );
  }

  if (role === 'teacher') {
    return (
      <div className="grid md:grid-cols-2 gap-6">
        <InputField icon={User} label="Full Name" name="name" value={formData.name} onChange={handleInputChange} placeholder="John Doe" />
        <InputField icon={CreditCard} label="Employee ID" name="employeeId" value={formData.employeeId} onChange={handleInputChange} placeholder="EMP001" />
        <InputField icon={Building2} label="College Name" name="college" value={formData.college} onChange={handleInputChange} placeholder="MVGR College of Engineering" />
        <InputField icon={BookOpen} label="Department" name="department" value={formData.department} onChange={handleInputChange} placeholder="Computer Science" />
        <InputField icon={GraduationCap} label="Subject/Specialization" name="subject" value={formData.subject} onChange={handleInputChange} placeholder="Data Structures & Algorithms" />
        <InputField icon={Phone} label="Phone Number" type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+91 98765 43210" />
        {commonFields}
      </div>
    );
  }

  return null;
}

export default AuthPage;
