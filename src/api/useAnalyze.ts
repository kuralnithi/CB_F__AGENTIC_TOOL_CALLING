import { useMutation } from '@tanstack/react-query';
import { useAuth, useUser } from '@clerk/clerk-react';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

interface AnalyzeParams {
  query: string;
}

export const useAnalyzeStock = () => {
  const { getToken } = useAuth();
  const { user } = useUser();

  return useMutation({
    mutationFn: async ({ query }: AnalyzeParams) => {
      // Fetch the fresh Clerk JWT token
      const token = await getToken();

      // If the user is logged in, use their Clerk ID as the LangGraph thread_id,
      // which firmly ties their conversational history to their account forever!
      const thread_id = user ? `user_${user.id}` :
        `anonymous_${typeof crypto !== 'undefined' ? crypto.randomUUID() : Date.now()}`;

      const response = await api.post('/api/analyze',
        { query, thread_id },
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
