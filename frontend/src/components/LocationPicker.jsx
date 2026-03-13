import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X, Navigation, Map } from 'lucide-react';

function LocationPicker({ isOpen, onClose, onSelectLocation, onSelectOnMap }) {
  const [selectedCoords, setSelectedCoords] = useState(null);
  
  const commonLocations = [
    { name: 'Main Gate', lat: 18.05997021737144 - 0.00045, lng: 83.40515640049136 - 0.0003 },
    { name: 'Main Academic Block', lat: 18.05997021737144, lng: 83.40515640049136 },
    { name: 'Library Building', lat: 18.05997021737144 + 0.0002, lng: 83.40515640049136 - 0.0003 },
    { name: 'Cafeteria', lat: 18.05997021737144, lng: 83.40515640049136 + 0.00035 },
    { name: 'Sports Complex', lat: 18.05997021737144 + 0.0003, lng: 83.40515640049136 + 0.0004 }
  ];

  const handleSelectOnMap = () => {
    if (onSelectOnMap) {
      onSelectOnMap();
      onClose();
    }
  };

  const handleLocationSelected = (location) => {
    setSelectedCoords(location);
    onSelectLocation(location);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[70vh] overflow-hidden"
      >
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MapPin className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Set Your Location</h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(70vh-80px)] p-6">
          <p className="text-sm text-gray-600 mb-4">
            Choose your location or select manually on the map
          </p>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                  (position) => {
                    handleLocationSelected({
                      lat: position.coords.latitude,
                      lng: position.coords.longitude
                    });
                  },
                  () => {
                    alert('Unable to get your location. Please select manually.');
                  }
                );
              }
            }}
            className="w-full mb-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
          >
            <Navigation className="w-5 h-5" />
            Use My Current Location
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSelectOnMap}
            className="w-full mb-4 bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
          >
            <Map className="w-5 h-5" />
            Select Location on Map
          </motion.button>

          <div className="mb-3">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Common Locations</h3>
          </div>

          <div className="space-y-2">
            {commonLocations.map((location, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleLocationSelected(location)}
                className="w-full p-4 bg-gray-50 hover:bg-blue-50 rounded-xl transition-colors text-left flex items-center gap-3 group"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{location.name}</p>
                  <p className="text-xs text-gray-500">
                    {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default LocationPicker;
