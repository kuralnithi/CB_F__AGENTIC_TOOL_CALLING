import React from 'react';
import { SignIn } from '@clerk/clerk-react';
import { Modal } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store';
import { closeAuthModal } from '../../store/slices/uiSlice';

export const AuthModal: React.FC = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.ui.isAuthModalOpen);

  return (
    <AnimatePresence>
      {isOpen && (
        <Modal 
          show={isOpen} 
          onHide={() => dispatch(closeAuthModal())} 
          centered 
          contentClassName="bg-transparent border-0"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="d-flex justify-content-center"
          >
            <SignIn 
              routing="hash" 
              appearance={{
                variables: {
                  colorPrimary: '#4f46e5',
                  colorBackground: 'rgba(15, 23, 42, 0.9)',
                  colorInputBackground: 'rgba(255, 255, 255, 0.05)',
                  colorInputText: '#fff',
                  colorText: '#e2e8f0',
                },
                elements: {
                  card: 'border border-secondary rounded-4 shadow-lg',
                  headerTitle: 'text-light',
                  headerSubtitle: 'text-secondary',
                  formButtonPrimary: 'bg-primary border-0',
                  dividerLine: 'bg-secondary',
                  dividerText: 'text-secondary',
                  footerActionText: 'text-secondary',
                  footerActionLink: 'text-primary',
                }
              }}
            />
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
};
