import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
} from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';
import { requestLocationPermission, getCurrentLocation, watchUserLocation } from '../utils/location';
import { navigationAPI, buildingsAPI } from '../services/api';
import NavigationPanel from '../components/NavigationPanel';
import DestinationSelector from '../components/DestinationSelector';

const CAMPUS_CENTER = {
  latitude: 17.3853,
  longitude: 78.4867,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

export default function MapScreen({ navigation }) {
  const mapRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const [buildings, setBuildings] = useState([]);
  const [route, setRoute] = useState(null);
  const [waypoints, setWaypoints] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDestinationSelector, setShowDestinationSelector] = useState(false);
  const locationWatcherRef = useRef(null);

  useEffect(() => {
    initializeLocation();
    fetchBuildings();
  }, []);

  const initializeLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Location permission is required for navigation.');
      return;
    }

    const location = await getCurrentLocation();
    if (location) {
      setUserLocation(location);
      mapRef.current?.animateToRegion({
        ...location,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }

    locationWatcherRef.current = await watchUserLocation((location) => {
      setUserLocation(location);
    });
  };

  const fetchBuildings = async () => {
    try {
      const response = await buildingsAPI.getAll();
      setBuildings(response.data);
    } catch (error) {
      console.error('Error fetching buildings:', error);
      Alert.alert('Error', 'Failed to load buildings');
    }
  };

  const handleDestinationSelect = async (destination) => {
    setSelectedDestination(destination);
    setShowDestinationSelector(false);

    if (!userLocation) {
      Alert.alert('Error', 'User location not available');
      return;
    }

    setLoading(true);
    try {
      const response = await navigationAPI.getRoute(
        userLocation.latitude,
        userLocation.longitude,
        destination.latitude,
        destination.longitude
      );

      if (response.data.routes && response.data.routes.length > 0) {
        const routeCoordinates = response.data.routes[0].geometry.coordinates.map(
          ([lng, lat]) => ({
            latitude: lat,
            longitude: lng,
          })
        );
        setRoute(routeCoordinates);
        setWaypoints(response.data.waypoints || []);

        // Animate to show entire route
        if (routeCoordinates.length > 0) {
          mapRef.current?.fitToCoordinates(routeCoordinates, {
            edgePadding: { top: 100, right: 50, bottom: 200, left: 50 },
            animated: true,
          });
        }
      }
    } catch (error) {
      console.error('Error fetching route:', error);
      Alert.alert('Error', 'Failed to calculate route');
    } finally {
      setLoading(false);
    }
  };

  const handleClearRoute = () => {
    setRoute(null);
    setWaypoints([]);
    setSelectedDestination(null);
  };

  useEffect(() => {
    return () => {
      if (locationWatcherRef.current) {
        locationWatcherRef.current.remove();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={CAMPUS_CENTER}
        showsUserLocation={true}
        followsUserLocation={false}
      >
        {/* User Location Marker */}
        {userLocation && (
          <Marker
            coordinate={userLocation}
            title="Your Location"
            pinColor="blue"
          />
        )}

        {/* Building Markers */}
        {buildings.map((building) => (
          <Marker
            key={building._id}
            coordinate={{
              latitude: building.latitude,
              longitude: building.longitude,
            }}
            title={building.name}
            description={building.description}
            onPress={() => handleDestinationSelect(building)}
          />
        ))}

        {/* Route Polyline */}
        {route && (
          <Polyline
            coordinates={route}
            strokeColor="#2563EB"
            strokeWidth={4}
            lineDashPattern={[0]}
          />
        )}

        {/* Waypoint Markers */}
        {waypoints.map((waypoint, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: waypoint.latitude,
              longitude: waypoint.longitude,
            }}
            title={waypoint.name}
            description={waypoint.instruction}
            pinColor="green"
          />
        ))}

        {/* Destination Marker */}
        {selectedDestination && (
          <Marker
            coordinate={{
              latitude: selectedDestination.latitude,
              longitude: selectedDestination.longitude,
            }}
            title={selectedDestination.name}
            pinColor="red"
          />
        )}
      </MapView>

      {/* Navigation Panel */}
      {selectedDestination && (
        <NavigationPanel
          destination={selectedDestination}
          waypoints={waypoints}
          userLocation={userLocation}
          onClear={handleClearRoute}
        />
      )}

      {/* Destination Selector Button */}
      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => setShowDestinationSelector(true)}
      >
        <MaterialIcons name="location-on" size={24} color="white" />
        <Text style={styles.selectButtonText}>Select Destination</Text>
      </TouchableOpacity>

      {/* Destination Selector Modal */}
      {showDestinationSelector && (
        <DestinationSelector
          buildings={buildings}
          onSelect={handleDestinationSelect}
          onClose={() => setShowDestinationSelector(false)}
        />
      )}

      {/* Loading Indicator */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2563EB" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  selectButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: '#2563EB',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
});
