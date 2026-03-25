import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Generate a unique session ID when the app loads so the agent remembers the history perfectly
// for the duration of this specific browser tab, without colliding with old corrupted threads!
const sessionId = typeof crypto !== 'undefined' && crypto.randomUUID
  ? crypto.randomUUID()
  : `session-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

export const analyzeStock = async (query: string) => {
  const response = await api.post('/api/analyze', { 
    query: query,
    thread_id: sessionId
  });
  return response.data.result;
};
