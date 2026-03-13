import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MapView from '../components/MapView';
import SearchBar from '../components/SearchBar';
import NavigationPanel from '../components/NavigationPanel';
import InfoDrawer from '../components/InfoDrawer';
import TopNavBar from '../components/TopNavBar';
import FloatingActionButtons from '../components/FloatingActionButtons';
import LocationPicker from '../components/LocationPicker';
import WaypointGallery from '../components/WaypointGallery';
import ProfileSidebar from '../components/ProfileSidebar';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Building2, DoorOpen, MapPin, Loader2 } from 'lucide-react';

function Home() {
  const { user } = useAuth();
  const [buildings, setBuildings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [landmarks, setLandmarks] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [route, setRoute] = useState(null);
  const [distance, setDistance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showLayerPanel, setShowLayerPanel] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [showWaypointGallery, setShowWaypointGallery] = useState(false);
  const [waypointImages, setWaypointImages] = useState([]);
  const [showProfileSidebar, setShowProfileSidebar] = useState(false);

  useEffect(() => {
    loadData();
    getUserLocation();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [buildingsData, roomsData, landmarksData] = await Promise.all([
        api.getBuildings(),
        api.getRooms(),
        api.getLandmarks()
      ]);
      
      setBuildings(buildingsData);
      setRooms(roomsData);
      setLandmarks(landmarksData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          // Set default location to campus center if geolocation fails
          setUserLocation({
            lat: 18.05997021737144,
            lng: 83.40515640049136
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      // Geolocation not supported, use campus center
      setUserLocation({
        lat: 18.05997021737144,
        lng: 83.40515640049136
      });
    }
  };

  const handleSearch = async (query) => {
    return await api.search(query);
  };

  const handleResultSelect = (item, type) => {
    setSelectedLocation({
      ...item.coordinates,
      name: item.name || `Room ${item.roomNumber}`,
      description: item.description || ''
    });
    setSelectedItem(item);
    setSelectedType(type);
    setShowDrawer(true);
    setRoute(null);
    setDistance(null);
  };

  const handleNavigate = async () => {
    if (!selectedLocation) {
      alert('Please select a destination first.');
      return;
    }

    // If no user location, use campus center as starting point
    const startLocation = userLocation || {
      lat: 18.05997021737144,
      lng: 83.40515640049136
    };

    try {
      const routeData = await api.getRoute(
        startLocation.lat,
        startLocation.lng,
        selectedLocation.lat,
        selectedLocation.lng,
        null, // Start building (user location)
        selectedLocation.name // End building name
      );
      
      console.log('Route data received:', routeData);
      console.log('Waypoint images:', routeData.properties?.waypointImages);
      
      setRoute(routeData);
      setDistance(routeData.properties.distance);
      
      // Store waypoint images if available
      if (routeData.properties && routeData.properties.waypointImages) {
        console.log('Setting waypoint images:', routeData.properties.waypointImages);
        setWaypointImages(routeData.properties.waypointImages);
      } else {
        console.log('No waypoint images found in route data');
        setWaypointImages([]);
      }
      
      setShowDrawer(false);
    } catch (error) {
      console.error('Error getting route:', error);
      alert('Failed to calculate route. Please try again.');
    }
  };

  const handleClear = () => {
    setSelectedLocation(null);
    setSelectedItem(null);
    setSelectedType(null);
    setRoute(null);
    setDistance(null);
    setShowDrawer(false);
    setWaypointImages([]);
    setShowWaypointGallery(false);
  };

  const handleLocate = () => {
    setShowLocationPicker(true);
  };

  const handleLayersToggle = () => {
    setShowLayerPanel(!showLayerPanel);
  };

  const handleSelectUserLocation = (location) => {
    setUserLocation(location);
  };

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 mx-auto mb-4"
          >
            <Loader2 className="w-16 h-16 text-blue-600" />
          </motion.div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Loading Campus Map</h2>
          <p className="text-gray-600">Please wait...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gray-100">
      <TopNavBar 
        campusName="Campus Navigator" 
        onMenuClick={() => setShowProfileSidebar(true)}
      />
      
      <MapView
        buildings={buildings}
        rooms={rooms}
        landmarks={landmarks}
        selectedLocation={selectedLocation}
        userLocation={userLocation}
        route={route}
        showLayerPanel={showLayerPanel}
        onLayerChange={() => setShowLayerPanel(false)}
      />
      
      <SearchBar
        onSearch={handleSearch}
        onResultSelect={handleResultSelect}
      />

      <FloatingActionButtons
        onLocate={handleLocate}
        onLayersToggle={handleLayersToggle}
      />

      <AnimatePresence>
        {showDrawer && selectedItem && (
          <InfoDrawer
            item={selectedItem}
            type={selectedType}
            onClose={handleClear}
            onNavigate={handleNavigate}
          />
        )}
      </AnimatePresence>

      <LocationPicker
        isOpen={showLocationPicker}
        onClose={() => setShowLocationPicker(false)}
        onSelectLocation={handleSelectUserLocation}
      />

      {!showDrawer && selectedLocation && (
        <NavigationPanel
          destination={selectedLocation}
          distance={distance}
          onNavigate={handleNavigate}
          onClear={handleClear}
        />
      )}

      {/* Waypoint Images Button */}
      {waypointImages.length > 0 && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => setShowWaypointGallery(true)}
          className="absolute bottom-24 left-4 z-20 bg-blue-600 text-white px-4 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
        >
          <MapPin className="w-5 h-5" />
          <span>View Route Images ({waypointImages.length})</span>
        </motion.button>
      )}

      {/* Waypoint Gallery Modal */}
      {showWaypointGallery && (
        <WaypointGallery
          waypointImages={waypointImages}
          onClose={() => setShowWaypointGallery(false)}
        />
      )}

      {/* Profile Sidebar */}
      <ProfileSidebar
        isOpen={showProfileSidebar}
        onClose={() => setShowProfileSidebar(false)}
      />

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-24 right-4 z-10 glass-effect rounded-xl shadow-lg p-4 hidden md:block"
      >
        <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">Map Legend</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-xs">
              🏢
            </div>
            <span className="text-sm text-gray-700">Buildings</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-green-600 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-xs">
              🚪
            </div>
            <span className="text-sm text-gray-700">Rooms</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-amber-600 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-xs">
              📍
            </div>
            <span className="text-sm text-gray-700">Landmarks</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-600 rounded-full border-2 border-white shadow-sm pulse-marker"></div>
            <span className="text-sm text-gray-700">Your Location</span>
          </div>
        </div>
      </motion.div>

      {/* Location Status Indicator */}
      {userLocation && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-20 left-4 z-10 glass-effect rounded-lg shadow-lg px-3 py-2 flex items-center gap-2"
        >
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-medium text-gray-700">Location Set</span>
        </motion.div>
      )}
    </div>
  );
}

export default Home;
