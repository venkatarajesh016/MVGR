import React from 'react';
import { motion } from 'framer-motion';
import { Navigation, Layers, Plus, Map } from 'lucide-react';

function FloatingActionButtons({ onLocate, onLayersToggle, onAddLocation }) {
  return (
    <div className="absolute right-4 bottom-24 md:bottom-8 z-10 flex flex-col gap-3">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onLocate}
        className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-50 transition-colors group"
        title="My Location"
      >
        <Navigation className="w-5 h-5 text-blue-600 group-hover:text-blue-700" />
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onLayersToggle}
        className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-50 transition-colors group"
        title="Map Layers"
      >
        <Layers className="w-5 h-5 text-gray-700 group-hover:text-blue-600" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
        title="Zoom In"
        onClick={() => {
          const map = document.querySelector('.leaflet-container');
          if (map && map._leaflet_map) {
            map._leaflet_map.zoomIn();
          }
        }}
      >
        <Plus className="w-5 h-5 text-white" />
      </motion.button>
    </div>
  );
}

export default FloatingActionButtons;
