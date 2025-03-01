import React from 'react';
import { useGame } from '../context/GameContext';

const ScoreDisplay = () => {
  const { score } = useGame();
  
  return (
    <div className="score-display">
      <span className="correct">✓ {score.correct}</span>
      <span className="incorrect">✗ {score.incorrect}</span>
    </div>
  );
};

export default ScoreDisplay;
