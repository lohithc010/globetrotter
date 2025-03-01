import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

const ResultAnimation = ({ result, fact, onClose }) => {
  useEffect(() => {
    if (result === 'correct') {
      // Trigger confetti animation for correct answers
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [result]);
  
  return (
    <div className="result-animation">
      <div className="result-box">
        {result === 'correct' ? (
          <>
            <div className="result-icon">🎉</div>
            <h2 className="heading">YOU WIN!</h2>
          </>
        ) : (
          <>
            <div className="result-icon">😢</div>
            <h2 className="heading">YOU LOST!</h2>
          </>
        )}
        {fact && <p>{fact.text}</p>}
        
        <button className="button primary" style={{ marginTop: '20px' }} onClick={onClose}>
          {result === 'correct' ? 'GREAT!' : 'TRY AGAIN'}
        </button>
      </div>
    </div>
  );
};

export default ResultAnimation;
