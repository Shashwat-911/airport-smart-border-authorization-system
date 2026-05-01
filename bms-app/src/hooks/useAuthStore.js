import { create } from 'zustand';
import api from '../services/api';

const useAuthStore = create((set) => ({
  token: localStorage.getItem('officer_token') || null,
  user: JSON.parse(localStorage.getItem('officer_info')) || null,
  isLoading: false,
  error: null,

  login: async (username, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/api-token-auth/', { username, password });
      const { token } = response.data;
      
      const userInfo = { username }; // Could extract more if backend returned it

      localStorage.setItem('officer_token', token);
      localStorage.setItem('officer_info', JSON.stringify(userInfo));

      set({ token, user: userInfo, isLoading: false });
      return true;
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error.response?.data?.non_field_errors?.[0] || 'Authentication failed. Verify credentials.' 
      });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('officer_token');
    localStorage.removeItem('officer_info');
    set({ token: null, user: null });
  }
}));

export default useAuthStore;
