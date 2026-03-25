import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const analyzeStock = async (query: string) => {
  const response = await api.post('/api/analyze', { query });
  return response.data.result;
};
