import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { GripHorizontal, X } from 'lucide-react';

function MapLegend() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const legendRef = useRef(null);

  const handleMouseDown = (e) => {
    if (e.target.closest('button')) return; // Don't drag if clicking button
    
    setIsDragging(true);
    const rect = legendRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;

    // Keep legend within viewport bounds
    const maxX = window.innerWidth - 250;
    const maxY = window.innerHeight - 300;

    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  if (!isVisible) return null;

  return (
    <motion.div
      ref={legendRef}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 40,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      onMouseDown={handleMouseDown}
      className="glass-effect rounded-xl shadow-lg p-4 hidden md:block w-64 select-none"
    >
      {/* Header with drag handle */}
      <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/20">
        <div className="flex items-center gap-2">
          <GripHorizontal className="w-4 h-4 text-gray-600" />
          <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Map Legend</h3>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Legend Items */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-blue-600 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-xs">
            🏢
          </div>
          <span className="text-sm text-gray-700 font-medium">Buildings</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-5 h-5 bg-green-600 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-xs">
            🚪
          </div>
          <span className="text-sm text-gray-700 font-medium">Rooms</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-5 h-5 bg-amber-600 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-xs">
            📍
          </div>
          <span className="text-sm text-gray-700 font-medium">Landmarks</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-4 h-4 bg-red-600 rounded-full border-2 border-white shadow-sm animate-pulse"></div>
          <span className="text-sm text-gray-700 font-medium">Your Location</span>
        </div>

        <div className="flex items-center gap-3 pt-2 border-t border-white/20">
          <div className="w-4 h-1 bg-blue-500 rounded-full"></div>
          <span className="text-sm text-gray-700 font-medium">Route Path</span>
        </div>
      </div>

      {/* Drag Hint */}
      <p className="text-xs text-gray-500 mt-3 pt-3 border-t border-white/20">
        💡 Drag to move legend
      </p>
    </motion.div>
  );
}

export default MapLegend;
