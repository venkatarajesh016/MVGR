import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Menu } from 'lucide-react';

function TopNavBar({ campusName = "Campus Navigator" }) {
  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="absolute top-0 left-0 right-0 z-20 glass-effect border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">{campusName}</h1>
              <p className="text-xs text-gray-500">Find your way around campus</p>
            </div>
          </div>
          
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default TopNavBar;
