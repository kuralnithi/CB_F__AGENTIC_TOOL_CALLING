import { useState, type FC, type FormEvent } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  onAnalyze: (query: string, modelId: string) => void;
  isLoading: boolean;
}

const MODELS = [
  { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B', icon: '🧠' },
  { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B', icon: '⚡' },
  { id: 'mixtral-8x7b-32768', name: 'Mixtral 8x7B', icon: '⚖️' },
];

const InputBox: FC<Props> = ({ onAnalyze, isLoading }) => {
  const [query, setQuery] = useState('');
  const [modelId, setModelId] = useState(MODELS[0].id);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onAnalyze(query.trim(), modelId);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="search-box-container p-4 rounded-4 glass-panel h-100 d-flex flex-column justify-content-center"
    >
      <h2 className="text-light mb-2 fw-bold">Analyze Any Asset</h2>
      <p className="text-secondary mb-4 opacity-75 small">Get instant AI-powered financial intelligence via our agentic pipeline.</p>

      {/* Model Selection Pills */}
      <div className="mb-4">
        <p className="text-muted small mb-2">Select Model:</p>
        <div className="d-flex gap-2 flex-wrap">
          {MODELS.map((m) => (
            <motion.div
              key={m.id}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`px-3 py-2 rounded-4 border custom-cursor-pointer d-flex align-items-center gap-2 transition-all ${
                modelId === m.id 
                  ? 'border-primary bg-primary bg-opacity-10 text-primary fw-semibold shadow-sm' 
                  : 'border-secondary border-opacity-25 text-secondary small'
              }`}
              onClick={() => !isLoading && setModelId(m.id)}
              style={{ cursor: 'pointer', fontSize: modelId === m.id ? '0.85rem' : '0.75rem' }}
            >
               <span>{m.icon}</span> {m.name}
            </motion.div>
          ))}
        </div>
      </div>
      
      <Form onSubmit={handleSubmit}>
        <InputGroup className="input-group-custom p-1 rounded-pill bg-dark border border-secondary border-opacity-25 shadow-sm">
          <InputGroup.Text className="bg-transparent border-0 text-muted ps-3">
            <Search size={20} />
          </InputGroup.Text>
          <Form.Control
            placeholder="e.g. NVDA or Apple..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isLoading}
            className="search-input bg-transparent border-0 text-light shadow-none"
          />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              type="submit" 
              disabled={isLoading || !query.trim()}
              className="analyze-btn rounded-pill px-4 fw-semibold border-0"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', color: '#fff' }}
            >
              Analyze
            </Button>
          </motion.div>
        </InputGroup>
      </Form>
      
      <div className="mt-4 pt-3 border-top border-secondary border-opacity-25">
        <p className="text-muted small mb-2">Try examples:</p>
        <div className="d-flex gap-2 flex-wrap">
          {['NVDA', 'AAPL', 'Compare AMD & INTC'].map((ex, i) => (
            <span 
              key={i} 
              className="badge bg-secondary bg-opacity-25 text-light px-3 py-2 rounded-pill custom-cursor-pointer border border-secondary border-opacity-50"
              onClick={() => { if(!isLoading) { setQuery(ex); onAnalyze(ex, modelId); } }}
              style={{ cursor: 'pointer' }}
            >
              {ex}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default InputBox;
