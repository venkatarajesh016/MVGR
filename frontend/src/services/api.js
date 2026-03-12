import axios from 'axios';

const API_BASE_URL = '/api';

export const api = {
  // Buildings
  getBuildings: async () => {
    const response = await axios.get(`${API_BASE_URL}/buildings`);
    return response.data;
  },

  createBuilding: async (formData) => {
    const response = await axios.post(`${API_BASE_URL}/buildings`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  // Rooms
  getRooms: async () => {
    const response = await axios.get(`${API_BASE_URL}/rooms`);
    return response.data;
  },

  createRoom: async (roomData) => {
    const response = await axios.post(`${API_BASE_URL}/rooms`, roomData);
    return response.data;
  },

  // Landmarks
  getLandmarks: async () => {
    const response = await axios.get(`${API_BASE_URL}/landmarks`);
    return response.data;
  },

  createLandmark: async (formData) => {
    const response = await axios.post(`${API_BASE_URL}/landmarks`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  // Search
  search: async (query) => {
    const response = await axios.get(`${API_BASE_URL}/search`, {
      params: { query }
    });
    return response.data;
  },

  // Route
  getRoute: async (startLat, startLng, endLat, endLng, startBuilding = null, endBuilding = null) => {
    const response = await axios.get(`${API_BASE_URL}/route`, {
      params: { 
        startLat, 
        startLng, 
        endLat, 
        endLng,
        startBuilding,
        endBuilding
      }
    });
    return response.data;
  },

  // CSV Upload
  uploadCSV: async (file) => {
    const formData = new FormData();
    formData.append('csv', file);
    const response = await axios.post(`${API_BASE_URL}/upload-csv`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  }
};
