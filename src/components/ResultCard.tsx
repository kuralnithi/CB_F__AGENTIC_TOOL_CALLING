import { useEffect, useState, type FC } from 'react';
import { motion } from 'framer-motion';

interface Props {
  content: string;
}

const ResultCard: FC<Props> = ({ content }) => {
  const [displayedContent, setDisplayedContent] = useState('');

  // Typing effect
  useEffect(() => {
    let i = 0;
    setDisplayedContent('');
    const timer = setInterval(() => {
      setDisplayedContent((prev) => prev + (content[i] || ''));
      i++;
      if (i >= content.length) clearInterval(timer);
    }, 15);
    return () => clearInterval(timer);
  }, [content]);

  // Convert markdown-like bullets to simple elements for nice rendering
  const renderContent = () => {
    return displayedContent.split('\n').map((line, idx) => {
      const cleanLine = line.trim();
      if (!cleanLine) return <br key={idx} />;
      if (cleanLine.startsWith('**') || cleanLine.startsWith('#')) {
        return <h4 key={idx} className="text-light mt-3 mb-2 fw-bold">{cleanLine.replace(/[*#]/g, '').trim()}</h4>;
      } else if (cleanLine.startsWith('-')) {
        let contentPart = cleanLine.substring(1).trim();
        // If it contains boldness
        const parts = contentPart.split('**');
        return (
          <div key={idx} className="d-flex align-items-start mb-2">
            <span className="text-primary me-2 mt-1">•</span>
            <span className="text-light">
              {parts.map((part, i) => (i % 2 === 1 ? <strong key={i} className="text-white">{part}</strong> : part))}
            </span>
          </div>
        );
      }
      return <p key={idx} className="text-light text-opacity-75 mb-2">{cleanLine}</p>;
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="result-card p-4 rounded-4 glass-panel h-100 d-flex flex-column"
    >
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom border-secondary border-opacity-25 pb-3">
        <h3 className="text-light m-0 d-flex align-items-center gap-2">
          <span className="text-primary">✨</span> Analysis Report
        </h3>
        <button 
          className="btn btn-sm text-light px-3 fw-medium border border-secondary border-opacity-50 hover-bg-light"
          onClick={() => navigator.clipboard.writeText(content)}
        >
          Copy
        </button>
      </div>
      
      <div className="result-content flex-grow-1 overflow-auto pe-2" style={{ maxHeight: '60vh' }}>
        {renderContent()}
      </div>
    </motion.div>
  );
};

export default ResultCard;
