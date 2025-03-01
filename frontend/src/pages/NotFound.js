import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container">
      <div className="panel text-center" style={{ marginTop: '50px' }}>
        <h1 className="heading">404</h1>
        <p className="mb-20">Oops! The page you're looking for doesn't exist.</p>
        <button 
          className="button primary" 
          onClick={() => navigate('/')}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
