import React, { createContext, useState, useContext, useEffect } from 'react';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [currentDestination, setCurrentDestination] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [gameResult, setGameResult] = useState(null); // 'correct', 'incorrect', or null
  const [inviter, setInviter] = useState(null);
  
  // Load user data from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('globetrotter_user');
    const storedScore = localStorage.getItem('globetrotter_score');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    if (storedScore) {
      setScore(JSON.parse(storedScore));
    }
  }, []);
  
  // Update localStorage when user or score changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('globetrotter_user', JSON.stringify(user));
    }
    
    localStorage.setItem('globetrotter_score', JSON.stringify(score));
  }, [user, score]);
  
  // Handle correct answer
  const handleCorrectAnswer = () => {
    setScore(prev => ({
      ...prev,
      correct: prev.correct + 1
    }));
    setGameResult('correct');
  };
  
  // Handle incorrect answer
  const handleIncorrectAnswer = () => {
    setScore(prev => ({
      ...prev,
      incorrect: prev.incorrect + 1
    }));
    setGameResult('incorrect');
  };
  
  // Reset game state for next question
  const resetGameState = () => {
    setCurrentDestination(null);
    setGameResult(null);
  };
  
  // Set user data
  const registerUser = (userData) => {
    setUser(userData);
  };
  
  // Clear all game data
  const clearGameData = () => {
    localStorage.removeItem('globetrotter_user');
    localStorage.removeItem('globetrotter_score');
    setUser(null);
    setScore({ correct: 0, incorrect: 0 });
    setCurrentDestination(null);
    setGameResult(null);
    setInviter(null);
  };
  
  return (
    <GameContext.Provider
      value={{
        user,
        score,
        currentDestination,
        isLoading,
        gameResult,
        inviter,
        setCurrentDestination,
        setIsLoading,
        handleCorrectAnswer,
        handleIncorrectAnswer,
        resetGameState,
        registerUser,
        clearGameData,
        setInviter
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
