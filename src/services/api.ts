import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const analyzeStock = async (query: string) => {
  const response = await api.post('/analyze', { query });
  return response.data.result;
};
