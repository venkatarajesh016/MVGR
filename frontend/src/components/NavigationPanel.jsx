import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation, Clock, TrendingUp, X, GripVertical, Minimize2, Maximize2 } from 'lucide-react';

function NavigationPanel({ destination, distance, onNavigate, onClear }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const dragRef = useRef(null);
  const startPos = useRef({ x: 0, y: 0 });

  if (!destination) return null;

  const estimatedTime = distance ? Math.ceil(distance / 80) : 0;

  const handleMouseDown = (e) => {
    if (e.target.closest('.no-drag')) return;
    setIsDragging(true);
    startPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const newX = e.clientX - startPos.current.x;
    const newY = e.clientY - startPos.current.y;
    
    // Keep panel within viewport
    const maxX = window.innerWidth - 320;
    const maxY = window.innerHeight - 200;
    
    setPosition({
      x: Math.max(-150, Math.min(newX, maxX)),
      y: Math.max(-100, Math.min(newY, maxY))
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  return (
    <AnimatePresence>
      <motion.div
        ref={dragRef}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        style={{
          x: position.x,
          y: position.y,
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
        className="fixed bottom-4 right-4 z-30 w-80"
        onMouseDown={handleMouseDown}
      >
        <div className="glass-effect rounded-xl shadow-2xl overflow-hidden border border-gray-200">
          {/* Drag Handle */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-3 py-2 flex items-center justify-between cursor-grab active:cursor-grabbing">
            <div className="flex items-center gap-2">
              <GripVertical className="w-4 h-4 text-white/70" />
              <span className="text-white text-sm font-semibold">Navigation</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMinimized(!isMinimized);
                }}
                className="no-drag w-6 h-6 flex items-center justify-center rounded hover:bg-white/20 transition-colors"
              >
                {isMinimized ? (
                  <Maximize2 className="w-3 h-3 text-white" />
                ) : (
                  <Minimize2 className="w-3 h-3 text-white" />
                )}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClear();
                }}
                className="no-drag w-6 h-6 flex items-center justify-center rounded hover:bg-white/20 transition-colors"
              >
                <X className="w-3 h-3 text-white" />
              </button>
            </div>
          </div>

          {/* Content */}
          {!isMinimized && (
            <div className="p-4">
              <h3 className="text-base font-bold text-gray-900 mb-1 truncate">
                {destination.name}
              </h3>
              {destination.description && (
                <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                  {destination.description}
                </p>
              )}

              {distance && (
                <div className="flex items-center gap-3 mb-3 p-2 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-1.5 flex-1">
                    <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                    <div>
                      <p className="text-xs text-gray-600">Distance</p>
                      <p className="text-sm font-bold text-gray-900">{distance}m</p>
                    </div>
                  </div>
                  <div className="w-px h-8 bg-gray-300" />
                  <div className="flex items-center gap-1.5 flex-1">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    <div>
                      <p className="text-xs text-gray-600">Time</p>
                      <p className="text-sm font-bold text-gray-900">{estimatedTime} min</p>
                    </div>
                  </div>
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate();
                }}
                className="no-drag w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-shadow text-sm"
              >
                <Navigation className="w-4 h-4" />
                Start Navigation
              </motion.button>
            </div>
          )}

          {/* Minimized State */}
          {isMinimized && (
            <div className="px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-900 truncate max-w-[180px]">
                  {destination.name}
                </span>
              </div>
              {distance && (
                <span className="text-xs font-bold text-blue-600">{distance}m</span>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default NavigationPanel;
