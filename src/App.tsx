import { useDispatch } from 'react-redux';
import { UserButton, useUser } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import Home from './pages/Home';
import { AuthModal } from './features/auth/AuthModal';
import { openAuthModal } from './store/slices/uiSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

function App() {
  const dispatch = useDispatch();
  const { isSignedIn, isLoaded } = useUser();

  return (
    <div className="app-container bg-dark text-light min-vh-100 position-relative pb-5" style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(30, 58, 138, 0.15) 0%, rgba(15, 23, 42, 1) 70%)' }}>
      
      {/* Global Header */}
      <div className="d-flex justify-content-end p-4 position-absolute top-0 end-0 w-100" style={{ zIndex: 50 }}>
        {isLoaded && (
          isSignedIn ? (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
              <UserButton appearance={{ elements: { userButtonAvatarBox: 'shadow border border-secondary' } }} />
            </motion.div>
          ) : (
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              onClick={() => dispatch(openAuthModal())}
              className="btn btn-primary d-flex align-items-center gap-2 rounded-pill px-4 shadow shadow-sm"
            >
              <LogIn size={18} /> Sign In
            </motion.button>
          )
        )}
      </div>

      <Home />
      <AuthModal />
    </div>
  );
}

export default App;
