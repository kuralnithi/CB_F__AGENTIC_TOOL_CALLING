import React from 'react';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

function App() {
  return (
    <div className="app-container bg-dark text-light min-vh-100" style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(30, 58, 138, 0.15) 0%, rgba(15, 23, 42, 1) 70%)' }}>
      <Home />
    </div>
  );
}

export default App;
