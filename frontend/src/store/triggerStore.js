import { create } from 'zustand';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const useTriggerStore = create((set, get) => ({
  triggers: [],
  dismissedTriggers: JSON.parse(localStorage.getItem('dismissedTriggers') || '[]'),
  loading: false,
  error: null,

  // Fetch active triggers
  fetchTriggers: async () => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/triggers`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      set({ triggers: response.data.triggers, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      console.error('Fetch triggers error:', error);
    }
  },

  // Create trigger (admin/teacher only)
  createTrigger: async (triggerData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_BASE_URL}/triggers`, triggerData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      set(state => ({
        triggers: [response.data.trigger, ...state.triggers]
      }));
      return { success: true, trigger: response.data.trigger };
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      set({ error: message });
      return { success: false, message };
    }
  },

  // Update trigger
  updateTrigger: async (id, triggerData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_BASE_URL}/triggers/${id}`, triggerData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      set(state => ({
        triggers: state.triggers.map(t => t._id === id ? response.data.trigger : t)
      }));
      return { success: true, trigger: response.data.trigger };
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      set({ error: message });
      return { success: false, message };
    }
  },

  // Deactivate trigger
  deactivateTrigger: async (id) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/triggers/${id}/deactivate`);
      set(state => ({
        triggers: state.triggers.filter(t => t._id !== id)
      }));
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      set({ error: message });
      return { success: false, message };
    }
  },

  // Delete trigger (admin only)
  deleteTrigger: async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/triggers/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      set(state => ({
        triggers: state.triggers.filter(t => t._id !== id)
      }));
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      set({ error: message });
      return { success: false, message };
    }
  },

  // Dismiss trigger (session-based)
  dismissTrigger: (triggerId) => {
    set(state => {
      const dismissed = [...state.dismissedTriggers, triggerId];
      localStorage.setItem('dismissedTriggers', JSON.stringify(dismissed));
      return { dismissedTriggers: dismissed };
    });
  },

  // Get active, non-dismissed triggers
  getActiveTriggers: () => {
    const { triggers, dismissedTriggers } = get();
    return triggers.filter(t => !dismissedTriggers.includes(t._id)).slice(0, 3);
  },

  // Add new trigger from Socket.io
  addTrigger: (trigger) => {
    set(state => ({
      triggers: [trigger, ...state.triggers]
    }));
  },

  // Clear dismissed triggers
  clearDismissed: () => {
    localStorage.removeItem('dismissedTriggers');
    set({ dismissedTriggers: [] });
  }
}));
