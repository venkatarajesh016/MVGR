import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom marker icons
const createCustomIcon = (emoji, color) => {
  return L.divIcon({
    html: `
      <div style="
        width: 32px;
        height: 32px;
        background: ${color};
        border: 3px solid white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        cursor: pointer;
        transition: transform 0.3s;
      " class="custom-marker">
        ${emoji}
      </div>
    `,
    className: 'custom-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
};

const buildingIcon = createCustomIcon('🏢', '#2563EB');
const roomIcon = createCustomIcon('🚪', '#10B981');
const landmarkIcon = createCustomIcon('📍', '#F59E0B');

const userLocationIcon = L.divIcon({
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
  className: 'user-location-icon',
  iconSize: [20, 20],
  iconAnchor: [10, 10]
});

// Component to handle map updates
function MapUpdater({ center, zoom, bounds }) {
  const map = useMap();

  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, { padding: [50, 50] });
    } else if (center) {
      map.flyTo(center, zoom || map.getZoom(), {
        duration: 1.5
      });
    }
  }, [center, zoom, bounds, map]);

  return null;
}

function MapView({ buildings, rooms, landmarks, selectedLocation, userLocation, route, showLayerPanel, onLayerChange }) {
  const [mapCenter, setMapCenter] = useState([18.060005, 83.405167]);
  const [mapZoom, setMapZoom] = useState(17);
  const [mapBounds, setMapBounds] = useState(null);
  const [tileError, setTileError] = useState(false);
  const [currentLayer, setCurrentLayer] = useState('street'); // street, satellite, terrain, dark

  useEffect(() => {
    if (userLocation) {
      setMapCenter([userLocation.lat, userLocation.lng]);
      setMapZoom(18);
      setMapBounds(null);
    }
  }, [userLocation]);

  useEffect(() => {
    if (selectedLocation) {
      setMapCenter([selectedLocation.lat, selectedLocation.lng]);
      setMapZoom(18);
      setMapBounds(null);
    }
  }, [selectedLocation]);

  useEffect(() => {
    if (route && route.geometry && route.geometry.coordinates) {
      const coords = route.geometry.coordinates;
      const bounds = L.latLngBounds(
        coords.map(coord => [coord[1], coord[0]])
      );
      setMapBounds(bounds);
    }
  }, [route]);

  const routeCoordinates = route && route.geometry && route.geometry.coordinates
    ? route.geometry.coordinates.map(coord => [coord[1], coord[0]])
    : [];

  // Map layer configurations
  const mapLayers = {
    street: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      name: 'Street Map',
      icon: '🗺️',
      maxZoom: 19
    },
    satellite: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: '&copy; Esri',
      name: 'Satellite',
      icon: '🛰️',
      maxZoom: 19
    },
    terrain: {
      url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://opentopomap.org">OpenTopoMap</a>',
      name: 'Terrain',
      icon: '⛰️',
      maxZoom: 17
    },
    dark: {
      url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
      name: 'Dark Mode',
      icon: '🌙',
      maxZoom: 19
    }
  };

  const handleLayerChange = (layerKey) => {
    setCurrentLayer(layerKey);
    if (onLayerChange) {
      onLayerChange();
    }
  };

  return (
    <div className="relative w-full h-full">
      {tileError && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-50 bg-amber-100 border border-amber-400 text-amber-800 px-4 py-3 rounded-lg shadow-lg max-w-md">
          <p className="text-sm font-medium">⚠️ Map tiles unavailable (offline mode)</p>
          <p className="text-xs mt-1">Navigation still works! Markers show building locations.</p>
        </div>
      )}

      {/* Map Layer Selector - Only show when showLayerPanel is true */}
      <AnimatePresence>
        {showLayerPanel && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute top-20 right-4 z-50 glass-effect rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-3">
              <p className="text-xs font-semibold text-gray-700 px-2 mb-2">Map Style</p>
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
      
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        minZoom={10}
        maxZoom={19}
        style={{ width: '100%', height: '100%', background: '#f0f0f0' }}
        zoomControl={true}
      >
        {/* Dynamic tile layer based on selection */}
        <TileLayer
          key={currentLayer}
          attribution={mapLayers[currentLayer].attribution}
          url={mapLayers[currentLayer].url}
          maxNativeZoom={mapLayers[currentLayer].maxZoom}
          maxZoom={19}
          errorTileUrl="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Crect width='256' height='256' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999' font-size='14'%3EOffline%3C/text%3E%3C/svg%3E"
          eventHandlers={{
            tileerror: () => setTileError(true),
            tileload: () => setTileError(false)
          }}
        />

        <MapUpdater center={mapCenter} zoom={mapZoom} bounds={mapBounds} />

        {/* Building Markers */}
        {buildings.map((building) => (
          <Marker
            key={building._id}
            position={[building.coordinates.lat, building.coordinates.lng]}
            icon={buildingIcon}
          >
            <Popup>
              <div style={{ padding: '12px', minWidth: '200px' }}>
                {building.image && (
                  <img
                    src={building.image}
                    alt={building.name}
                    style={{
                      width: '100%',
                      height: '120px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      marginBottom: '8px'
                    }}
                  />
                )}
                <h3 style={{ fontWeight: 700, fontSize: '16px', marginBottom: '4px', color: '#1F2937' }}>
                  {building.name}
                </h3>
                <p style={{ fontSize: '13px', color: '#6B7280', margin: 0 }}>
                  {building.description || ''}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Room Markers */}
        {rooms.map((room) => (
          <Marker
            key={room._id}
            position={[room.coordinates.lat, room.coordinates.lng]}
            icon={roomIcon}
          >
            <Popup>
              <div style={{ padding: '12px', minWidth: '180px' }}>
                <h3 style={{ fontWeight: 700, fontSize: '16px', marginBottom: '4px', color: '#1F2937' }}>
                  Room {room.roomNumber}
                </h3>
                <p style={{ fontSize: '13px', color: '#6B7280', margin: '2px 0' }}>
                  {room.buildingId?.name || ''}
                </p>
                <p style={{ fontSize: '12px', color: '#9CA3AF', margin: '2px 0' }}>
                  Floor {room.floor} • {room.department}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Landmark Markers */}
        {landmarks.map((landmark) => (
          <Marker
            key={landmark._id}
            position={[landmark.coordinates.lat, landmark.coordinates.lng]}
            icon={landmarkIcon}
          >
            <Popup>
              <div style={{ padding: '12px', minWidth: '200px' }}>
                {landmark.image && (
                  <img
                    src={landmark.image}
                    alt={landmark.name}
                    style={{
                      width: '100%',
                      height: '120px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      marginBottom: '8px'
                    }}
                  />
                )}
                <h3 style={{ fontWeight: 700, fontSize: '16px', marginBottom: '4px', color: '#1F2937' }}>
                  {landmark.name}
                </h3>
                <p style={{ fontSize: '13px', color: '#6B7280', margin: 0 }}>
                  {landmark.description || ''}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* User Location Marker */}
        {userLocation && (
          <Marker
            position={[userLocation.lat, userLocation.lng]}
            icon={userLocationIcon}
          >
            <Popup>
              <div style={{ padding: '8px' }}>
                <p style={{ fontWeight: 600, margin: 0 }}>Your Location</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Route Line */}
        {routeCoordinates.length > 0 && (
          <>
            <Polyline
              positions={routeCoordinates}
              color="#1E40AF"
              weight={8}
              opacity={0.4}
            />
            <Polyline
              positions={routeCoordinates}
              color="#3B82F6"
              weight={5}
              opacity={0.9}
            />
          </>
        )}
      </MapContainer>
    </div>
  );
}

export default MapView;
