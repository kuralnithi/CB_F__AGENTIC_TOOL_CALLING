import { Fragment } from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="loader-container d-flex flex-column align-items-center justify-content-center py-5 h-100">
      <div className="flow-diagram d-flex align-items-center gap-2 flex-wrap justify-content-center">
        {['Input', 'Tools', 'LLM', 'Output'].map((step, index) => (
          <Fragment key={step}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: index * 0.4, duration: 0.4 }}
              className="flow-node px-4 py-2 rounded-3 text-light fw-medium border border-secondary border-opacity-50"
              style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)' }}
            >
              {step}
            </motion.div>
            {index < 3 && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 30, opacity: 1 }}
                transition={{ delay: index * 0.4 + 0.3, duration: 0.3 }}
                className="flow-arrow border-bottom border-2 border-primary"
                style={{ height: 2, filter: 'drop-shadow(0 0 5px rgba(59, 130, 246, 0.5))' }}
              />
            )}
          </Fragment>
        ))}
      </div>
      <motion.p 
        animate={{ opacity: [0.5, 1, 0.5] }} 
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="text-info mt-5 fw-medium tracking-wide"
      >
        Compiling analyst intelligence...
      </motion.p>
    </div>
  );
};

export default Loader;
