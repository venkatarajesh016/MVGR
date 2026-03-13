import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function MapView({ buildings, rooms, landmarks, selectedLocation, userLocation, route, showLayerPanel, onLayerChange }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markersRef = useRef([]);
  const routeLayerRef = useRef(null);
  const [currentLayer, setCurrentLayer] = useState('osm');
  const [mapReady, setMapReady] = useState(false);

  // Map tile layers
  const mapLayers = {
    osm: {
      name: 'OpenStreetMap',
      icon: '🗺️',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '© OpenStreetMap contributors'
    },
    satellite: {
      name: 'Satellite',
      icon: '🛰️',
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: '© Esri'
    },
    terrain: {
      name: 'Terrain',
      icon: '⛰️',
      url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      attribution: '© OpenTopoMap'
    },
    dark: {
      name: 'Dark Mode',
      icon: '🌙',
      url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      attribution: '© CartoDB'
    }
  };

  // Initialize map
  useEffect(() => {
    if (map.current) return;

    map.current = L.map(mapContainer.current).setView(
      [18.05997021737144, 83.40515640049136],
      17
    );

    // Add initial tile layer
    L.tileLayer(mapLayers.osm.url, {
      attribution: mapLayers.osm.attribution,
      maxZoom: 20,
      minZoom: 14
    }).addTo(map.current);

    // Add scale control
    L.control.scale({ metric: true }).addTo(map.current);

    // Add zoom control
    L.control.zoom({ position: 'bottomright' }).addTo(map.current);

    setMapReady(true);

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  const handleLayerChange = (layerKey) => {
    if (!map.current) return;

    const layer = mapLayers[layerKey];
    
    // Remove all existing tile layers
    map.current.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.current.removeLayer(layer);
      }
    });

    // Add new tile layer
    L.tileLayer(layer.url, {
      attribution: layer.attribution,
      maxZoom: 20,
      minZoom: 14
    }).addTo(map.current);

    setCurrentLayer(layerKey);
    
    if (onLayerChange) {
      onLayerChange();
    }
  };

  const clearMarkers = () => {
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
  };

  const createCustomIcon = (emoji, color) => {
    return L.divIcon({
      html: `
        <div style="
          width: 40px;
          height: 40px;
          background: ${color};
          border: 3px solid white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          cursor: pointer;
        ">
          ${emoji}
        </div>
      `,
      iconSize: [40, 40],
      className: 'custom-marker'
    });
  };

  const addAllMarkers = () => {
    if (!map.current) return;
    clearMarkers();

    // Add buildings
    buildings.forEach((building) => {
      const marker = L.marker(
        [building.coordinates.latitude, building.coordinates.longitude],
        { icon: createCustomIcon('🏢', '#2563EB') }
      ).addTo(map.current);

      const popupContent = `
        <div style="padding: 12px; min-width: 200px;">
          ${building.image ? `<img src="${building.image}" alt="${building.name}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;" />` : ''}
          <h3 style="font-weight: 700; font-size: 16px; margin-bottom: 4px; color: #1F2937;">${building.name}</h3>
          <p style="font-size: 13px; color: #6B7280; margin: 0;">${building.description || ''}</p>
        </div>
      `;

      marker.bindPopup(popupContent);
      markersRef.current.push(marker);
    });

    // Add rooms
    rooms.forEach((room) => {
      const marker = L.marker(
        [room.coordinates.latitude, room.coordinates.longitude],
        { icon: createCustomIcon('🚪', '#10B981') }
      ).addTo(map.current);

      const popupContent = `
        <div style="padding: 12px; min-width: 180px;">
          <h3 style="font-weight: 700; font-size: 16px; margin-bottom: 4px; color: #1F2937;">Room ${room.roomNumber}</h3>
          <p style="font-size: 13px; color: #6B7280; margin: 2px 0;">${room.buildingId?.name || ''}</p>
          <p style="font-size: 12px; color: #9CA3AF; margin: 2px 0;">Floor ${room.floor} • ${room.department}</p>
        </div>
      `;

      marker.bindPopup(popupContent);
      markersRef.current.push(marker);
    });

    // Add landmarks
    landmarks.forEach((landmark) => {
      const marker = L.marker(
        [landmark.coordinates.latitude, landmark.coordinates.longitude],
        { icon: createCustomIcon('📍', '#F59E0B') }
      ).addTo(map.current);

      const popupContent = `
        <div style="padding: 12px; min-width: 200px;">
          ${landmark.image ? `<img src="${landmark.image}" alt="${landmark.name}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;" />` : ''}
          <h3 style="font-weight: 700; font-size: 16px; margin-bottom: 4px; color: #1F2937;">${landmark.name}</h3>
          <p style="font-size: 13px; color: #6B7280; margin: 0;">${landmark.description || ''}</p>
        </div>
      `;

      marker.bindPopup(popupContent);
      markersRef.current.push(marker);
    });

    // Add user location
    if (userLocation) {
      const userMarker = L.marker(
        [userLocation.lat, userLocation.lng],
        {
          icon: L.divIcon({
            html: `
              <div style="
                width: 20px;
                height: 20px;
                background: #EF4444;
                border: 4px solid white;
                border-radius: 50%;
                box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
                animation: pulse 2s infinite;
              "></div>
            `,
            iconSize: [20, 20],
            className: 'user-location-marker'
          })
        }
      ).addTo(map.current);

      userMarker.bindPopup('<div style="padding: 8px;"><p style="font-weight: 600; margin: 0;">Your Location</p></div>');
      markersRef.current.push(userMarker);
    }
  };

  useEffect(() => {
    if (map.current && mapReady) {
      addAllMarkers();
    }
  }, [buildings, rooms, landmarks, userLocation, mapReady]);

  useEffect(() => {
    if (map.current && userLocation && mapReady) {
      map.current.flyTo([userLocation.lat, userLocation.lng], 18, {
        duration: 2
      });
    }
  }, [userLocation, mapReady]);

  useEffect(() => {
    if (map.current && selectedLocation && mapReady) {
      map.current.flyTo([selectedLocation.lat, selectedLocation.lng], 18, {
        duration: 2
      });
    }
  }, [selectedLocation, mapReady]);

  const addRouteToMap = (routeData) => {
    if (!map.current || !routeData || !routeData.geometry) return;

    // Remove existing route
    if (routeLayerRef.current) {
      map.current.removeLayer(routeLayerRef.current);
    }

    // Create GeoJSON feature from route
    const geoJsonFeature = {
      type: 'Feature',
      geometry: routeData.geometry,
      properties: routeData.properties || {}
    };

    // Add route as polyline
    routeLayerRef.current = L.geoJSON(geoJsonFeature, {
      style: {
        color: '#3B82F6',
        weight: 5,
        opacity: 0.9,
        lineCap: 'round',
        lineJoin: 'round'
      }
    }).addTo(map.current);

    // Fit bounds to route
    const bounds = routeLayerRef.current.getBounds();
    map.current.fitBounds(bounds, {
      padding: [100, 100],
      duration: 2
    });
  };

  useEffect(() => {
    if (map.current && route && mapReady) {
      addRouteToMap(route);
    }
  }, [route, mapReady]);

  return (
    <div className="relative w-full h-full">
      <AnimatePresence>
        {showLayerPanel && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute top-20 right-4 z-50 glass-effect rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-3">
              <p className="text-xs font-semibold text-gray-700 px-2 mb-2">Map Layer</p>
              <div className="space-y-1">
                {Object.entries(mapLayers).map(([key, layer]) => (
                  <motion.button
                    key={key}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleLayerChange(key)}
                    className={`w-full px-3 py-2.5 text-left text-sm rounded-lg transition-colors flex items-center gap-2 ${
                      currentLayer === key
                        ? 'bg-blue-600 text-white font-medium shadow-md'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-base">{layer.icon}</span>
                    <span>{layer.name}</span>
                    {currentLayer === key && (
                      <span className="ml-auto text-xs">✓</span>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={mapContainer} className="w-full h-full" />

      <style>{`
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
          }
        }
        
        .leaflet-popup-content {
          margin: 0;
          padding: 0;
        }
      `}</style>
    </div>
  );
}

export default MapView;
