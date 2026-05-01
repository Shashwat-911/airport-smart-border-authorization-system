import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // Mock backend URL
  timeout: 5000,
});

// Mock interceptors for demo without real backend
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Mock successful responses for verification flow
    if (error.config.url === '/api/verify-traveler/') {
      return Promise.resolve({
        data: {
          id: 'traveler_' + Date.now(),
          name: 'John Doe',
          passport: 'AB1234567',
          nationality: 'USA',
          visa_status: 'VALID',
          risk_score: 0.12,
          watchlist: false
        }
      });
    }
    if (error.config.url === '/api/entry/') {
      console.log('✅ Mock API: Entry decision recorded successfully');
      return Promise.resolve({ data: { status: 'recorded' } });
    }
    return Promise.reject(error);
  }
);

export default api;

