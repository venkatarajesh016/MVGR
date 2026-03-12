import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Building2, DoorOpen, MapPin } from 'lucide-react';

function InfoDrawer({ item, type, onClose, onNavigate }) {
  if (!item) return null;

  const getIcon = () => {
    switch (type) {
      case 'building':
        return <Building2 className="w-6 h-6 text-blue-600" />;
      case 'room':
        return <DoorOpen className="w-6 h-6 text-green-600" />;
      case 'landmark':
        return <MapPin className="w-6 h-6 text-amber-600" />;
      default:
        return <Building2 className="w-6 h-6 text-gray-600" />;
    }
  };

  const getName = () => {
    if (type === 'room') {
      return `Room ${item.roomNumber}`;
    }
    return item.name;
  };

  const getDetails = () => {
    if (type === 'room') {
      return (
        <div className="space-y-2 text-sm text-gray-600">
          <p>Building: {item.buildingId?.name || 'N/A'}</p>
          <p>Floor: {item.floor}</p>
          <p>Department: {item.department}</p>
        </div>
      );
    }
    return <p className="text-gray-600">{item.description}</p>;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[80vh] overflow-hidden"
      >
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getIcon()}
            <h2 className="text-xl font-bold text-gray-900">{getName()}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(80vh-80px)]">
          {item.image && (
            <div className="relative h-56 overflow-hidden">
              <img
                src={item.image}
                alt={getName()}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-6 space-y-6">
            {getDetails()}

            <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
              <MapPin className="w-4 h-4" />
              <span>
                {item.coordinates?.lat.toFixed(5)}, {item.coordinates?.lng.toFixed(5)}
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onNavigate}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              Navigate Here
            </motion.button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default InfoDrawer;
