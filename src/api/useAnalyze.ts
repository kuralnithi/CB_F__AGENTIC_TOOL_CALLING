import { useMutation } from '@tanstack/react-query';
import { useAuth, useUser } from '@clerk/clerk-react';
import axios from 'axios';

const rawUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
// Guard: Ensure the URL has a protocol, otherwise Axios treats it as a relative path (causing 404s)
const normalizedUrl = (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) 
  ? rawUrl 
  : `https://${rawUrl}`;

const api = axios.create({
  baseURL: normalizedUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface AnalyzeParams {
  query: string;
  modelId?: string;
}

export const useAnalyzeStock = () => {
  const { getToken } = useAuth();
  const { user } = useUser();

  return useMutation({
    mutationFn: async ({ query, modelId }: AnalyzeParams) => {
      // Fetch the fresh Clerk JWT token
      const token = await getToken();

      // If the user is logged in, use their Clerk ID as the LangGraph thread_id,
      // which firmly ties their conversational history to their account forever!
      const thread_id = user ? `user_${user.id}` :
        `anonymous_${typeof crypto !== 'undefined' ? crypto.randomUUID() : Date.now()}`;

      const response = await api.post('/api/analyze',
        { 
          query, 
          thread_id, 
          model_id: modelId || 'llama-3.3-70b-versatile' 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Will be empty if not logged in
          }
        }
      );

      return response.data.result;
    }
  });
};
