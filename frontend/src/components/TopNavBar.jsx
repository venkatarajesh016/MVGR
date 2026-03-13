import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function TopNavBar({ campusName = "Campus Navigator", onMenuClick }) {
  const { user } = useAuth();

  const getRoleBadgeColor = (role) => {
    const colors = {
      student: 'bg-blue-500',
      guest: 'bg-gray-500',
      admin: 'bg-red-500',
      teacher: 'bg-green-500'
    };
    return colors[role] || 'bg-blue-500';
  };

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="absolute top-0 left-0 right-0 z-20 glass-effect border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Hamburger + Logo */}
          <div className="flex items-center space-x-3">
            <motion.button 
              onClick={onMenuClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </motion.button>
            
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-gray-900">{campusName}</h1>
              <p className="text-xs text-gray-500">Find your way around campus</p>
            </div>
          </div>
          
          {/* Right: User Info (Desktop) */}
          {user && (
            <div className="hidden md:flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">
                  {user.name || user.username}
                </p>
                <p className="text-xs text-gray-500">
                  {user.studentId || user.employeeId || 'Guest'}
                </p>
              </div>
              <span className={`${getRoleBadgeColor(user.role)} text-white text-xs px-3 py-1 rounded-full font-medium`}>
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default TopNavBar;
