import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { getRandomDestination, createChallenge } from '../services/api';
import ClueBox from '../components/ClueBox';
import OptionButton from '../components/OptionButton';
import ScoreDisplay from '../components/ScoreDisplay';
import ResultAnimation from '../components/ResultAnimation';

const Quiz = () => {
  const { 
    user, 
    currentDestination, 
    setCurrentDestination,
    handleCorrectAnswer,
    handleIncorrectAnswer,
    resetGameState,
    gameResult
  } = useGame();
  
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [resultFact, setResultFact] = useState(null);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [challengeLink, setChallengeLink] = useState('');
  const [showAnimation, setShowAnimation] = useState(false);
  
  const navigate = useNavigate();
  
  // Redirect to welcome page if no user
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);
  
  // Fetch a random destination on component mount
  useEffect(() => {
    const fetchDestination = async () => {
      try {
        setIsLoading(true);
        const data = await getRandomDestination();
        setCurrentDestination(data);
      } catch (error) {
        console.error('Error fetching destination:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (!currentDestination) {
      fetchDestination();
    } else {
      setIsLoading(false);
    }
  }, [currentDestination, setCurrentDestination]);
  
  // Update showAnimation when gameResult changes
  useEffect(() => {
    if (gameResult) {
      setShowAnimation(true);
    }
  }, [gameResult]);
  
  // Handle option selection
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    
    // Check if answer is correct
    if (option.id === currentDestination.destination.id) {
      handleCorrectAnswer();
    } else {
      handleIncorrectAnswer();
    }
    
    // Set a random fact for the result animation
    const randomFactIndex = Math.floor(Math.random() * currentDestination.facts.length);
    setResultFact(currentDestination.facts[randomFactIndex]);
  };
  
  // Handle next question
  const handleNextQuestion = () => {
    resetGameState();
    setSelectedOption(null);
    setResultFact(null);
    setShowShareOptions(false);
    setChallengeLink('');
    setShowAnimation(false);
    setIsLoading(true);
  };
  
  // Handle animation close
  const handleAnimationClose = () => {
    setShowAnimation(false);
    setShowShareOptions(true);
  };
  
  // Handle challenge creation
  const handleCreateChallenge = async () => {
    try {
      setIsLoading(true);
      const data = await createChallenge(user.id);
      
      // Create challenge link
      const baseUrl = window.location.origin;
      const link = `${baseUrl}/challenge/${data.challenge.id}`;
      
      setChallengeLink(link);
      setShowShareOptions(true);
    } catch (error) {
      console.error('Error creating challenge:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle WhatsApp share
  const handleWhatsAppShare = () => {
    const text = `Hey! I'm playing Globetrotter and I challenge you to beat my score! Play here: ${challengeLink}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };
  
  if (isLoading) {
    return (
      <div className="container">
        <div className="panel text-center" style={{ marginTop: '50px' }}>
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container">
      <ScoreDisplay />
      
      <div className="panel">
        <h1 className="heading">Where am I?</h1>
        
        {currentDestination && (
          <>
            <ClueBox clues={currentDestination.clues} />
            
            <div className="option-grid">
              {currentDestination.options.map((option) => (
                <OptionButton
                  key={option.id}
                  option={option}
                  onSelect={handleOptionSelect}
                  isDisabled={!!selectedOption}
                />
              ))}
            </div>
          </>
        )}
        
        {showAnimation && gameResult && (
          <ResultAnimation
            result={gameResult}
            fact={resultFact}
            onClose={handleAnimationClose}
          />
        )}
        
        {showShareOptions && (
          <div className="share-section">
            <h3 className="share-title">Challenge a friend!</h3>
            
            {!challengeLink ? (
              <button 
                className="button primary" 
                onClick={handleCreateChallenge}
                disabled={isLoading}
              >
                {isLoading ? 'Creating challenge...' : 'Challenge a Friend'}
              </button>
            ) : (
              <div className="share-buttons">
                <button 
                  className="share-button" 
                  onClick={handleWhatsAppShare}
                >
                  Share on WhatsApp
                </button>
              </div>
            )}
            
            <button 
              className="button" 
              style={{ marginTop: '20px' }}
              onClick={handleNextQuestion}
            >
              Next Question
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
