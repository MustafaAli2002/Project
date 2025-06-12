import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Challenges.css';

function Challenges() {
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const navigate = useNavigate();
  
  const difficultyLevels = [
    {
      id: 'easy',
      title: 'Easy',
      description: 'Basic questions to test your general knowledge',
      color: '#4CAF50',
      icon: '😊'
    },
    {
      id: 'medium',
      title: 'Medium',
      description: 'Moderate difficulty questions that require some thinking',
      color: '#FFC107',
      icon: '🤔'
    },
    {
      id: 'hard',
      title: 'Hard',
      description: 'A real challenge for experts only!',
      color: '#F44336',
      icon: '🧠'
    }
  ];

  const handleStartQuiz = () => {
    if (selectedDifficulty) {
      navigate(`/challenges/${selectedDifficulty}`);
    }
  };

  return (
    <div className="challenges-container">
      <div className="challenges-header">
        <h1>Choose Challenge Level</h1>
        <p>Select your preferred difficulty and start the quiz</p>
      </div>
      
      <div className="difficulty-levels">
        {difficultyLevels.map((level) => (
          <div 
            key={level.id}
            className={`difficulty-card ${selectedDifficulty === level.id ? 'selected' : ''}`}
            onClick={() => setSelectedDifficulty(level.id)}
            style={{ '--accent-color': level.color }}
          >
            <div className="difficulty-icon">
              {level.icon}
            </div>
            <h3>{level.title}</h3>
            <p>{level.description}</p>
          </div>
        ))}
      </div>
      
      <button 
        className="start-quiz-button"
        onClick={handleStartQuiz}
        disabled={!selectedDifficulty}
      >
        Start Quiz
      </button>
    </div>
  );
}

export default Challenges;