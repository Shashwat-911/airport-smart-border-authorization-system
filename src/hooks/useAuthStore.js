import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: { username: 'OFFICER_001', role: 'border_officer' }, // Mock logged-in officer
  login: (credentials) => set({ user: { username: credentials.username, role: 'border_officer' } }),
  logout: () => set({ user: null }),
}));

export default useAuthStore;

