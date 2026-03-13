import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Home, Map, Settings, LogOut, ChevronRight, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProfileCard from './ProfileCard';

function ProfileSidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Map, label: 'Campus Map', path: '/' },
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: Edit, label: 'Edit Profile', path: '/profile' },
  ];

  const handleMenuClick = (path) => {
    console.log('Navigate to:', path);
    onClose();
    if (path === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLogout = () => {
    logout();
    onClose();
    navigate('/auth');
  };

  // Close on Escape key
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-full w-[300px] bg-white shadow-2xl z-50 overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
              aria-label="Close sidebar"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            {/* Content */}
            <div className="p-6">
              {/* Profile Card */}
              {user && <ProfileCard user={user} />}

              {/* Navigation Menu */}
              <nav className="mt-8 space-y-2">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleMenuClick(item.path)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-blue-50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                      <span className="text-gray-700 font-medium group-hover:text-blue-600 transition-colors">
                        {item.label}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </motion.button>
                ))}

                {/* Logout Button */}
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: menuItems.length * 0.1 }}
                  onClick={handleLogout}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-red-50 transition-colors group mt-4"
                >
                  <div className="flex items-center gap-3">
                    <LogOut className="w-5 h-5 text-gray-600 group-hover:text-red-600 transition-colors" />
                    <span className="text-gray-700 font-medium group-hover:text-red-600 transition-colors">
                      Logout
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-red-600 transition-colors" />
                </motion.button>
              </nav>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  Campus Navigator v1.0
                </p>
                <p className="text-xs text-gray-400 text-center mt-1">
                  © 2024 All rights reserved
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default ProfileSidebar;
