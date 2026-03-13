import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

function MapView({ buildings, rooms, landmarks, selectedLocation, userLocation, route, showLayerPanel, onLayerChange }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markersRef = useRef([]);
  const [currentStyle, setCurrentStyle] = useState('streets-v12');
  const [mapboxToken, setMapboxToken] = useState('');
  const [mapReady, setMapReady] = useState(false);

  // Map styles
  const mapStyles = {
    'streets-v12': { name: 'Street Map', icon: '🗺️' },
    'satellite-streets-v12': { name: 'Satellite', icon: '🛰️' },
    'outdoors-v12': { name: 'Terrain', icon: '⛰️' },
    'dark-v11': { name: 'Dark Mode', icon: '🌙' }
  };

  // Fetch Mapbox token from backend
  useEffect(() => {
    fetch('/api/mapbox-token')
      .then(res => res.json())
      .then(data => {
        if (data.token) {
          mapboxgl.accessToken = data.token;
          setMapboxToken(data.token);
        }
      })
      .catch(err => console.error('Error fetching Mapbox token:', err));
  }, []);

  // Initialize map
  useEffect(() => {
    if (map.current || !mapboxToken) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: `mapbox://styles/mapbox/${currentStyle}`,
      center: [83.40515640049136, 18.05997021737144],
      zoom: 17,
      minZoom: 14,
      maxZoom: 20,
      pitch: 0,
      bearing: 0
    });

    map.current.addControl(new mapboxgl.NavigationControl({
      showCompass: true,
      showZoom: true,
      visualizePitch: true
    }), 'bottom-right');
    
    map.current.addControl(new mapboxgl.ScaleControl({
      maxWidth: 100,
      unit: 'metric'
    }), 'bottom-left');

    map.current.on('load', () => {
      setMapReady(true);
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapboxToken]);

  const handleStyleChange = (styleKey) => {
    if (map.current) {
      map.current.setStyle(`mapbox://styles/mapbox/${styleKey}`);
      setCurrentStyle(styleKey);
      
      map.current.once('style.load', () => {
        addAllMarkers();
        if (route) {
          addRouteToMap(route);
        }
      });
    }
    if (onLayerChange) {
      onLayerChange();
    }
  };

  const clearMarkers = () => {
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
  };

  const createMarkerElement = (emoji, color) => {
    const el = document.createElement('div');
    el.className = 'custom-marker';
    el.innerHTML = `
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
        transition: transform 0.2s ease;
        pointer-events: auto;
      ">
        ${emoji}
      </div>
    `;
    
    const innerDiv = el.querySelector('div');
    el.addEventListener('mouseenter', () => {
      if (innerDiv) {
        innerDiv.style.transform = 'scale(1.15)';
      }
    });
    el.addEventListener('mouseleave', () => {
      if (innerDiv) {
        innerDiv.style.transform = 'scale(1)';
      }
    });
    
    return el;
  };

  const addAllMarkers = () => {
    if (!map.current) return;
    clearMarkers();

    buildings.forEach((building) => {
      const el = createMarkerElement('🏢', '#2563EB');
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div style="padding: 12px; min-width: 200px;">
          ${building.image ? `<img src="${building.image}" alt="${building.name}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;" />` : ''}
          <h3 style="font-weight: 700; font-size: 16px; margin-bottom: 4px; color: #1F2937;">${building.name}</h3>
          <p style="font-size: 13px; color: #6B7280; margin: 0;">${building.description || ''}</p>
        </div>
      `);
      
      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([building.coordinates.lng, building.coordinates.lat])
        .setPopup(popup)
        .addTo(map.current);
      
      markersRef.current.push(marker);
    });

    rooms.forEach((room) => {
      const el = createMarkerElement('🚪', '#10B981');
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div style="padding: 12px; min-width: 180px;">
          <h3 style="font-weight: 700; font-size: 16px; margin-bottom: 4px; color: #1F2937;">Room ${room.roomNumber}</h3>
          <p style="font-size: 13px; color: #6B7280; margin: 2px 0;">${room.buildingId?.name || ''}</p>
          <p style="font-size: 12px; color: #9CA3AF; margin: 2px 0;">Floor ${room.floor} • ${room.department}</p>
        </div>
      `);
      
      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([room.coordinates.lng, room.coordinates.lat])
        .setPopup(popup)
        .addTo(map.current);
      
      markersRef.current.push(marker);
    });

    landmarks.forEach((landmark) => {
      const el = createMarkerElement('📍', '#F59E0B');
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div style="padding: 12px; min-width: 200px;">
          ${landmark.image ? `<img src="${landmark.image}" alt="${landmark.name}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;" />` : ''}
          <h3 style="font-weight: 700; font-size: 16px; margin-bottom: 4px; color: #1F2937;">${landmark.name}</h3>
          <p style="font-size: 13px; color: #6B7280; margin: 0;">${landmark.description || ''}</p>
        </div>
      `);
      
      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([landmark.coordinates.lng, landmark.coordinates.lat])
        .setPopup(popup)
        .addTo(map.current);
      
      markersRef.current.push(marker);
    });

    if (userLocation) {
      const userEl = document.createElement('div');
      userEl.className = 'user-location-marker';
      userEl.innerHTML = `
        <div style="
          width: 20px;
          height: 20px;
          background: #EF4444;
          border: 4px solid white;
          border-radius: 50%;
          box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
          animation: pulse 2s infinite;
        "></div>
      `;
      
      const popup = new mapboxgl.Popup({ offset: 15 }).setHTML(`
        <div style="padding: 8px;">
          <p style="font-weight: 600; margin: 0;">Your Location</p>
        </div>
      `);
      
      const marker = new mapboxgl.Marker({ element: userEl })
        .setLngLat([userLocation.lng, userLocation.lat])
        .setPopup(popup)
        .addTo(map.current);
      
      markersRef.current.push(marker);
    }
  };

  useEffect(() => {
    if (map.current && mapReady) {
      addAllMarkers();
    }
  }, [buildings, rooms, landmarks, userLocation, mapReady]);

  useEffect(() => {
    if (map.current && userLocation && mapReady) {
      map.current.flyTo({
        center: [userLocation.lng, userLocation.lat],
        zoom: 18,
        duration: 2000
      });
    }
  }, [userLocation, mapReady]);

  useEffect(() => {
    if (map.current && selectedLocation && mapReady) {
      map.current.flyTo({
        center: [selectedLocation.lng, selectedLocation.lat],
        zoom: 18,
        duration: 2000
      });
    }
  }, [selectedLocation, mapReady]);

  const addRouteToMap = (routeData) => {
    if (!map.current || !routeData || !routeData.geometry) return;

    if (map.current.getLayer('route')) {
      map.current.removeLayer('route');
    }
    if (map.current.getLayer('route-outline')) {
      map.current.removeLayer('route-outline');
    }
    if (map.current.getSource('route')) {
      map.current.removeSource('route');
    }

    map.current.addSource('route', {
      type: 'geojson',
      data: routeData
    });

    map.current.addLayer({
      id: 'route-outline',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#1E40AF',
        'line-width': 8,
        'line-opacity': 0.4
      }
    });

    map.current.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#3B82F6',
        'line-width': 5,
        'line-opacity': 0.9
      }
    });

    const coordinates = routeData.geometry.coordinates;
    const bounds = coordinates.reduce((bounds, coord) => {
      return bounds.extend(coord);
    }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

    map.current.fitBounds(bounds, {
      padding: { top: 100, bottom: 100, left: 100, right: 100 },
      duration: 2000
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
              <p className="text-xs font-semibold text-gray-700 px-2 mb-2">Map Style</p>
              <div className="space-y-1">
                {Object.entries(mapStyles).map(([key, style]) => (
                  <motion.button
                    key={key}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleStyleChange(key)}
                    className={`w-full px-3 py-2.5 text-left text-sm rounded-lg transition-colors flex items-center gap-2 ${
                      currentStyle === key
                        ? 'bg-blue-600 text-white font-medium shadow-md'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-base">{style.icon}</span>
                    <span>{style.name}</span>
                    {currentStyle === key && (
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
      `}</style>
    </div>
  );
}

export default MapView;
