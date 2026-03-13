import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, MapPin } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function StreetViewPanel({ isOpen, onClose, route, startLocation, endLocation }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [osmUrl, setOsmUrl] = useState('');

  // Initialize map with route
  useEffect(() => {
    if (!isOpen || !mapRef.current || !route) return;

    // Initialize Leaflet map
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView(
        [18.05997021737144, 83.40515640049136],
        16
      );

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 20,
        minZoom: 14
      }).addTo(mapInstanceRef.current);
    }

    // Add route to map
    if (route.geometry && route.geometry.coordinates) {
      // Remove existing route layer
      mapInstanceRef.current.eachLayer((layer) => {
        if (layer instanceof L.Polyline && layer !== mapInstanceRef.current) {
          mapInstanceRef.current.removeLayer(layer);
        }
      });

      // Add route polyline
      const routeCoordinates = route.geometry.coordinates.map(coord => [coord[1], coord[0]]);
      L.polyline(routeCoordinates, {
        color: '#3B82F6',
        weight: 5,
        opacity: 0.9,
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(mapInstanceRef.current);

      // Add start marker
      if (startLocation) {
        L.marker([startLocation.lat, startLocation.lng], {
          icon: L.divIcon({
            html: `
              <div style="
                width: 30px;
                height: 30px;
                background: #10B981;
                border: 3px solid white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
              ">
                📍
              </div>
            `,
            iconSize: [30, 30]
          })
        }).bindPopup('Start Location').addTo(mapInstanceRef.current);
      }

      // Add end marker
      if (endLocation) {
        L.marker([endLocation.lat, endLocation.lng], {
          icon: L.divIcon({
            html: `
              <div style="
                width: 30px;
                height: 30px;
                background: #EF4444;
                border: 3px solid white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
              ">
                🎯
              </div>
            `,
            iconSize: [30, 30]
          })
        }).bindPopup('Destination').addTo(mapInstanceRef.current);
      }

      // Fit bounds to route
      const bounds = L.latLngBounds(routeCoordinates);
      mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] });
    }

    // Generate OpenStreetMap directions URL
    if (startLocation && endLocation) {
      const url = `https://www.openstreetmap.org/directions?engine=fossgis_osrm_foot&route=${startLocation.lat},${startLocation.lng};${endLocation.lat},${endLocation.lng}`;
      setOsmUrl(url);
    }

    return () => {
      // Don't destroy map on unmount, just hide it
    };
  }, [isOpen, route, startLocation, endLocation]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MapPin className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Route Map</h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Map Container */}
        <div className="flex-1 relative w-full min-h-[500px] bg-gray-200">
          <div ref={mapRef} className="w-full h-full" />
        </div>

        {/* Route Info and Actions */}
        <div className="p-6 bg-gray-50 border-t border-gray-100 space-y-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                From
              </p>
              <p className="text-sm font-medium text-gray-900">
                {startLocation?.name || 'Start Location'}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                To
              </p>
              <p className="text-sm font-medium text-gray-900">
                {endLocation?.name || 'End Location'}
              </p>
            </div>
          </div>

          {route && (
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">Distance</p>
                <p className="text-lg font-bold text-blue-600">
                  {(route.properties.distance / 1000).toFixed(2)} km
                </p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">Estimated Time</p>
                <p className="text-lg font-bold text-green-600">
                  {route.properties.time} min
                </p>
              </div>
            </div>
          )}

          {/* Open in OSM Button */}
          {osmUrl && (
            <a
              href={osmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
            >
              <ExternalLink className="w-5 h-5" />
              Open Full Route in OpenStreetMap
            </a>
          )}

          {/* Turn-by-turn Directions */}
          {route && route.properties.instructions && route.properties.instructions.length > 0 && (
            <div className="bg-white rounded-lg p-4 max-h-[200px] overflow-y-auto">
              <h3 className="font-semibold text-gray-900 mb-3">Directions</h3>
              <div className="space-y-2">
                {route.properties.instructions.slice(0, 5).map((instruction, index) => (
                  <div key={index} className="flex gap-3 text-sm">
                    <span className="font-bold text-blue-600 min-w-[24px]">{index + 1}.</span>
                    <div>
                      <p className="text-gray-900">{instruction.text}</p>
                      <p className="text-xs text-gray-500">
                        {instruction.distance}m • {Math.round(instruction.duration / 60)}s
                      </p>
                    </div>
                  </div>
                ))}
                {route.properties.instructions.length > 5 && (
                  <p className="text-xs text-gray-500 italic">
                    +{route.properties.instructions.length - 5} more steps
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default StreetViewPanel;
