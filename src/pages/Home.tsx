import { FC } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { useUser } from '@clerk/clerk-react';
import InputBox from '../components/InputBox';
import Loader from '../components/Loader';
import ResultCard from '../components/ResultCard';
import { useAnalyzeStock } from '../api/useAnalyze';
import { openAuthModal } from '../store/slices/uiSlice';

const Home: FC = () => {
  const mutation = useAnalyzeStock();
  const { isSignedIn, isLoaded } = useUser();
  const dispatch = useDispatch();

  const handleAnalyze = (query: string) => {
    if (isLoaded && !isSignedIn) {
      // Require the user to sign in before allowing analysis
      dispatch(openAuthModal());
      return;
    }
    mutation.mutate({ query });
  };

  const isLoading = mutation.isPending;
  const result = mutation.data;
  const errorMsg = mutation.error ? (mutation.error as any).response?.data?.detail || mutation.error.message : null;

  return (
    <Container className="py-5 min-vh-100 d-flex flex-column justify-content-center">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-5"
      >
        <h1 className="fw-bolder display-4 mb-2" style={{ background: 'linear-gradient(to right, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          FinBot AI
        </h1>
        <p className="text-secondary fs-5">Enterprise-grade autonomous equity research</p>
      </motion.div>

      <Row className="g-4 align-items-stretch" style={{ minHeight: '500px' }}>
        <Col lg={5} className="d-flex flex-column">
          <InputBox onAnalyze={handleAnalyze} isLoading={isLoading} />
        </Col>
        
        <Col lg={7} className="d-flex flex-column">
          <AnimatePresence mode="wait">
            {isLoading && (
               <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-100">
                 <Loader />
               </motion.div>
            )}
            {!isLoading && result && (
               <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-100">
                 <ResultCard content={result} />
               </motion.div>
            )}
            {!isLoading && !result && !errorMsg && (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-100 d-flex flex-column align-items-center justify-content-center glass-panel rounded-4 p-4 text-center opacity-75 border-dashed">
                <div className="text-secondary mb-3" style={{ fontSize: '3rem' }}>📈</div>
                <h4 className="text-secondary fw-semibold">Awaiting Request</h4>
                <p className="text-muted small">Enter an asset on the left to begin the autonomous LLM pipeline execution.</p>
              </motion.div>
            )}
            {!isLoading && errorMsg && (
              <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-100 d-flex flex-column align-items-center justify-content-center border border-danger border-opacity-50 rounded-4 p-4 text-center" style={{ background: 'rgba(239, 68, 68, 0.05)', backdropFilter: 'blur(10px)' }}>
                <div className="text-danger mb-3" style={{ fontSize: '3rem' }}>⚠️</div>
                <h4 className="text-danger fw-semibold">Analysis Failed</h4>
                <p className="text-danger opacity-75 small">{errorMsg}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
