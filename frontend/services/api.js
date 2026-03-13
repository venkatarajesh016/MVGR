import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('ekkada_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth
export const register = (data) => api.post('/auth/register', data);
export const login = (data) => api.post('/auth/login', data);
export const getMe = () => api.get('/auth/me');

// Campus
export const getCampuses = () => api.get('/campus');
export const getCampus = (id) => api.get(`/campus/${id}`);
export const createCampus = (data) => api.post('/campus', data);
export const updateCampus = (id, data) => api.put(`/campus/${id}`, data);

// Rooms
export const getRooms = (campusId) => api.get(`/rooms/${campusId}`);
export const getRoomsByBuilding = (campusId, buildingCode) => api.get(`/rooms/${campusId}/building/${buildingCode}`);
export const addRoom = (data) => api.post('/rooms', data);
export const updateRoom = (id, data) => api.put(`/rooms/${id}`, data);
export const deleteRoom = (id) => api.delete(`/rooms/${id}`);
export const bulkAddRooms = (data) => api.post('/rooms/bulk', data);

// Search
export const searchRooms = (q, campusId) => api.get('/search', { params: { q, campusId } });
export const getRoute = (campusId, fromRoom, toRoom) => api.get('/search/route', { params: { campusId, fromRoom, toRoom } });

// Triggers
export const getTriggers = (campusId) => api.get(`/triggers/${campusId}`);
export const createTrigger = (data) => api.post('/triggers', data);
export const dismissTrigger = (id) => api.put(`/triggers/${id}/dismiss`);

// Timetable
export const getTimetable = () => api.get('/timetable');
export const getTodaySchedule = () => api.get('/timetable/today');
export const saveTimetable = (data) => api.post('/timetable', data);

// CSV
export const importCSV = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/csv/import', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
};
export const exportCSV = (campusId) => api.get(`/csv/export/${campusId}`, { responseType: 'blob' });

export default api;
