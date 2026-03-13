import { create } from 'zustand';

const useStore = create((set, get) => ({
    // Auth
    user: null,
    token: localStorage.getItem('ekkada_token') || null,
    isAuthenticated: !!localStorage.getItem('ekkada_token'),

    setUser: (user, token) => {
        if (token) localStorage.setItem('ekkada_token', token);
        if (user) localStorage.setItem('ekkada_user', JSON.stringify(user));
        set({ user, token, isAuthenticated: true });
    },

    logout: () => {
        localStorage.removeItem('ekkada_token');
        localStorage.removeItem('ekkada_user');
        set({ user: null, token: null, isAuthenticated: false });
    },

    loadUser: () => {
        const saved = localStorage.getItem('ekkada_user');
        if (saved) {
            set({ user: JSON.parse(saved), isAuthenticated: true });
        }
    },

    // Campus
    selectedCampus: null,
    setSelectedCampus: (campus) => set({ selectedCampus: campus }),

    // Map
    mapCenter: [18.2351, 83.4126], // Default: MVGR
    mapZoom: 17,
    setMapCenter: (center) => set({ mapCenter: center }),
    setMapZoom: (zoom) => set({ mapZoom: zoom }),

    // Search
    searchResults: [],
    setSearchResults: (results) => set({ searchResults: results }),

    // Route
    routeInfo: null,
    setRouteInfo: (info) => set({ routeInfo: info }),

    // Triggers
    triggers: [],
    setTriggers: (triggers) => set({ triggers }),
    addTrigger: (trigger) => set({ triggers: [trigger, ...get().triggers] }),

    // Today's schedule (hotspot)
    todaySchedule: [],
    setTodaySchedule: (schedule) => set({ todaySchedule: schedule }),
}));

export default useStore;
