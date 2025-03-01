import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { getChallengeById, registerUser } from '../services/api';

const Challenge = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, registerUser: setUserInContext, setInviter } = useGame();
  
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [challengeData, setChallengeData] = useState(null);
  
  // Fetch challenge data
  useEffect(() => {
    const fetchChallengeData = async () => {
      try {
        setIsLoading(true);
        const data = await getChallengeById(id);
        setChallengeData(data);
        setInviter(data.user);
      } catch (error) {
        console.error('Error fetching challenge:', error);
        setError('Challenge not found or has expired.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchChallengeData();
  }, [id, setInviter]);
  
  const handleStartChallenge = async (e) => {
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
      console.error('Error starting challenge:', error);
      setError('Failed to start challenge. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="container">
        <div className="panel text-center" style={{ marginTop: '50px' }}>
          <h2>Loading challenge...</h2>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container">
        <div className="panel text-center" style={{ marginTop: '50px' }}>
          <h2>Error</h2>
          <p>{error}</p>
          <button 
            className="button primary mt-20" 
            onClick={() => navigate('/')}
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container">
      <div className="panel" style={{ marginTop: '50px' }}>
        <h1 className="heading">🧩 GLOBETROTTER</h1>
        <p className="text-center mb-20">Challenge Accepted!</p>
        
        {challengeData && (
          <div className="inviter-info">
            <p>You've been challenged by <strong>{challengeData.user.username}</strong></p>
            <p>Their score: <strong>{challengeData.user.score}</strong></p>
            <p>Can you beat it?</p>
          </div>
        )}
        
        {!user ? (
          <form onSubmit={handleStartChallenge} className="username-form">
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
              {isLoading ? 'Loading...' : 'ACCEPT CHALLENGE'}
            </button>
          </form>
        ) : (
          <>
            <p className="text-center mb-20">Ready, <strong>{user.username}</strong>?</p>
            <button 
              onClick={handleStartChallenge} 
              className="button primary"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'ACCEPT CHALLENGE'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Challenge;
