import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// Backend URL - Update this based on your environment
// Development (Android Emulator): http://10.0.2.2:5000
// Development (iOS Simulator): http://localhost:5000
// Development (Physical Device): http://192.168.x.x:5000 (your machine IP)
// Production: https://your-production-url.com
const API_BASE_URL = 'http://10.0.2.2:5000'; // Android Emulator

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Add token to requests
api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('userToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const buildingsAPI = {
  getAll: () => api.get('/buildings'),
  getById: (id) => api.get(`/buildings/${id}`),
};

export const roomsAPI = {
  getAll: () => api.get('/rooms'),
  getByBuildingId: (buildingId) => api.get(`/rooms?building=${buildingId}`),
};

export const landmarksAPI = {
  getAll: () => api.get('/landmarks'),
};

export const navigationAPI = {
  getRoute: (startLat, startLng, endLat, endLng) =>
    api.get('/route', {
      params: {
        startLat,
        startLng,
        endLat,
        endLng,
      },
    }),
  getWaypoints: (routeId) => api.get(`/waypoints/${routeId}`),
};

export default api;
