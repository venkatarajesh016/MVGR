import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { calculateDistance } from '../utils/location';

export default function NavigationPanel({
  destination,
  waypoints,
  userLocation,
  onClear,
}) {
  const [currentWaypoint, setCurrentWaypoint] = useState(0);
  const [distanceToNext, setDistanceToNext] = useState(0);

  useEffect(() => {
    if (userLocation && waypoints.length > 0) {
      const nextWaypoint = waypoints[currentWaypoint];
      const distance = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        nextWaypoint.latitude,
        nextWaypoint.longitude
      );
      setDistanceToNext(distance);

      // Update waypoint if user is close enough
      if (distance < 0.05 && currentWaypoint < waypoints.length - 1) {
        setCurrentWaypoint(currentWaypoint + 1);
      }
    }
  }, [userLocation, waypoints, currentWaypoint]);

  const nextWaypoint = waypoints[currentWaypoint];
  const progress = ((currentWaypoint + 1) / waypoints.length) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.destinationName}>{destination.name}</Text>
          <Text style={styles.distance}>
            {distanceToNext.toFixed(2)} km away
          </Text>
        </View>
        <TouchableOpacity onPress={onClear}>
          <MaterialIcons name="close" size={24} color="#6B7280" />
        </TouchableOpacity>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[styles.progressFill, { width: `${progress}%` }]}
          />
        </View>
        <Text style={styles.progressText}>
          {currentWaypoint + 1} of {waypoints.length} waypoints
        </Text>
      </View>

      {nextWaypoint && (
        <View style={styles.instructionContainer}>
          <MaterialIcons name="directions" size={24} color="#2563EB" />
          <View style={styles.instructionContent}>
            <Text style={styles.instructionTitle}>{nextWaypoint.name}</Text>
            <Text style={styles.instructionText}>
              {nextWaypoint.instruction}
            </Text>
          </View>
        </View>
      )}

      <ScrollView style={styles.waypointsList}>
        {waypoints.map((waypoint, index) => (
          <View
            key={index}
            style={[
              styles.waypointItem,
              index === currentWaypoint && styles.waypointItemActive,
            ]}
          >
            <View
              style={[
                styles.waypointDot,
                index === currentWaypoint && styles.waypointDotActive,
              ]}
            >
              <Text style={styles.waypointNumber}>{index + 1}</Text>
            </View>
            <View style={styles.waypointInfo}>
              <Text style={styles.waypointName}>{waypoint.name}</Text>
              <Text style={styles.waypointDescription}>
                {waypoint.instruction}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '50%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerContent: {
    flex: 1,
  },
  destinationName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  distance: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  progressContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2563EB',
  },
  progressText: {
    fontSize: 12,
    color: '#6B7280',
  },
  instructionContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#EFF6FF',
    marginHorizontal: 16,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'flex-start',
    gap: 12,
  },
  instructionContent: {
    flex: 1,
  },
  instructionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  instructionText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  waypointsList: {
    paddingHorizontal: 16,
    maxHeight: 200,
  },
  waypointItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  waypointItemActive: {
    backgroundColor: '#F0F9FF',
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  waypointDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  waypointDotActive: {
    backgroundColor: '#2563EB',
  },
  waypointNumber: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  waypointInfo: {
    flex: 1,
  },
  waypointName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  waypointDescription: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
});
