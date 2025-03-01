import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { registerUser } from '../services/api';

const Welcome = () => {
  const { user, registerUser: setUserInContext } = useGame();
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleStartGame = async (e) => {
    e.preventDefault();
    
    if (!username && !user) {
      setError('Please enter a username to continue');
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      
      if (!user && username) {
        // Register new user
        const userData = await registerUser(username);
        setUserInContext(userData);
      }
      
      navigate('/quiz');
    } catch (error) {
      console.error('Error starting game:', error);
      setError('Failed to start game. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container">
      <div className="panel" style={{ marginTop: '50px' }}>
        <h1 className="heading">🧩 GLOBETROTTER</h1>
        <p className="text-center mb-20">The Ultimate Travel Guessing Game!</p>
        
        {!user ? (
          <form onSubmit={handleStartGame} className="username-form">
            <input
              type="text"
              className="input-field"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            {error && <p className="error-text">{error}</p>}
            <button 
              type="submit" 
              className="button primary"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'START'}
            </button>
          </form>
        ) : (
          <>
            <p className="text-center mb-20">Welcome back, <strong>{user.username}</strong>!</p>
            <button 
              onClick={handleStartGame} 
              className="button primary"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'START'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Welcome;
