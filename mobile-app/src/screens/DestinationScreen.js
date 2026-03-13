import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { buildingsAPI, roomsAPI } from '../services/api';

export default function DestinationScreen({ navigation }) {
  const [buildings, setBuildings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBuildings();
  }, []);

  const fetchBuildings = async () => {
    setLoading(true);
    try {
      const response = await buildingsAPI.getAll();
      setBuildings(response.data);
    } catch (error) {
      console.error('Error fetching buildings:', error);
      Alert.alert('Error', 'Failed to load buildings');
    } finally {
      setLoading(false);
    }
  };

  const handleBuildingSelect = async (building) => {
    setSelectedBuilding(building);
    try {
      const response = await roomsAPI.getByBuildingId(building._id);
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      Alert.alert('Error', 'Failed to load rooms');
    }
  };

  const handleDestinationSelect = (destination) => {
    navigation.navigate('Map', { destination });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!selectedBuilding ? (
        <>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Select Building</Text>
          </View>
          <FlatList
            data={buildings}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.buildingCard}
                onPress={() => handleBuildingSelect(item)}
              >
                <View style={styles.cardContent}>
                  <Text style={styles.buildingName}>{item.name}</Text>
                  <Text style={styles.buildingDescription}>
                    {item.description}
                  </Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#2563EB" />
              </TouchableOpacity>
            )}
          />
        </>
      ) : (
        <>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setSelectedBuilding(null)}>
              <MaterialIcons name="arrow-back" size={24} color="#2563EB" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{selectedBuilding.name}</Text>
            <View style={{ width: 24 }} />
          </View>
          <FlatList
            data={rooms}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.roomCard}
                onPress={() => handleDestinationSelect(item)}
              >
                <View style={styles.cardContent}>
                  <Text style={styles.roomName}>{item.name}</Text>
                  <Text style={styles.roomType}>{item.type}</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#2563EB" />
              </TouchableOpacity>
            )}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  buildingCard: {
    backgroundColor: 'white',
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  roomCard: {
    backgroundColor: 'white',
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardContent: {
    flex: 1,
  },
  buildingName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  buildingDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  roomName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  roomType: {
    fontSize: 14,
    color: '#6B7280',
  },
});
