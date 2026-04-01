import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { QueryClientProvider } from '@tanstack/react-query'
import { ClerkProvider } from '@clerk/clerk-react'
import { store } from './store'
import { queryClient } from './api/queryClient'
import './index.css'
import App from './App.tsx'

// Import Clerk publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  console.warn("Missing Publishable Key: Please set VITE_CLERK_PUBLISHABLE_KEY in your .env")
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY || "missing_key"}>
          <App />
        </ClerkProvider>
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
)
