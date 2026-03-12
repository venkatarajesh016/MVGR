import React from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Heart, HelpCircle } from 'lucide-react';

function BottomNav({ activeTab = 'search', onTabChange }) {
  const tabs = [
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'nearby', icon: MapPin, label: 'Nearby' },
    { id: 'favorites', icon: Heart, label: 'Favorites' },
    { id: 'help', icon: HelpCircle, label: 'Help' }
  ];

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-20 md:hidden glass-effect border-t border-gray-200 safe-area-bottom"
    >
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <motion.button
              key={tab.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center px-4 py-2 rounded-xl transition-colors ${
                isActive ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              <div className={`relative ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                <Icon className="w-6 h-6" />
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"
                  />
                )}
              </div>
              <span className={`text-xs mt-1 font-medium ${
                isActive ? 'text-blue-600' : 'text-gray-500'
              }`}>
                {tab.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

export default BottomNav;
