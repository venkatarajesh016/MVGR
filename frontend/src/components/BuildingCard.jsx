import React from 'react';
import { motion } from 'framer-motion';
import { Building2, MapPin, Navigation } from 'lucide-react';

function BuildingCard({ building, onNavigate, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-white rounded-t-3xl shadow-2xl overflow-hidden"
    >
      {building.image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={building.image}
            alt={building.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
          >
            ✕
          </button>
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-5 h-5 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">{building.name}</h2>
            </div>
            {building.description && (
              <p className="text-gray-600 text-sm leading-relaxed">{building.description}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <MapPin className="w-4 h-4" />
          <span>Lat: {building.coordinates?.lat.toFixed(4)}, Lng: {building.coordinates?.lng.toFixed(4)}</span>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNavigate}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
        >
          <Navigation className="w-5 h-5" />
          Navigate Here
        </motion.button>
      </div>
    </motion.div>
  );
}

export default BuildingCard;
