import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Navigation } from 'lucide-react';

function WaypointGallery({ waypointImages, onClose }) {
  if (!waypointImages || waypointImages.length === 0) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Navigation className="w-6 h-6" />
              <div>
                <h2 className="text-2xl font-bold">Route Waypoints</h2>
                <p className="text-blue-100 text-sm">{waypointImages.length} checkpoints along your route</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Waypoint List */}
          <div className="overflow-y-auto max-h-[calc(90vh-100px)] p-6">
            <div className="space-y-6">
              {waypointImages.map((waypoint, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4 bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors"
                >
                  {/* Step Number */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md">
                      {index + 1}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {waypoint.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <MapPin className="w-4 h-4" />
                      <span className="capitalize">{waypoint.type}</span>
                    </div>
                    {waypoint.coordinates && (
                      <p className="text-xs text-gray-500">
                        {waypoint.coordinates.lat.toFixed(6)}, {waypoint.coordinates.lng.toFixed(6)}
                      </p>
                    )}
                  </div>

                  {/* Arrow */}
                  {index < waypointImages.length - 1 && (
                    <div className="flex-shrink-0 flex items-center">
                      <div className="text-blue-600 text-2xl">→</div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 p-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Follow these waypoints to reach your destination</span>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default WaypointGallery;
