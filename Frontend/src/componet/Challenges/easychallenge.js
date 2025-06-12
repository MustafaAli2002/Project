import React, { useState } from 'react';
import './easychallenge.css';

const EasyChallenge = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showCoinAnimation, setShowCoinAnimation] = useState(false);

  const questions = [
     {
    question: 'Which player is nicknamed "The Goat"?',
    options: ['Cristiano Ronaldo', 'Mohamed Salah', 'Lionel Messi', 'Neymar'],
    answer: 'Cristiano Ronaldo'
  },
  {
    question: 'How many players are there in each football team on the field?',
    options: ['10', '11', '12', '13'],
    answer: '11'
  },
  {
    question: 'What color is the card shown for a warning?',
    options: ['Red', 'Green', 'Yellow', 'Blue'],
    answer: 'Yellow'
  },
  {
    question: 'Who was the top scorer in the 2022 FIFA World Cup?',
    options: ['Messi', 'Mbappé', 'Kane', 'Neymar'],
    answer: 'Mbappé'
  },
  {
    question: 'Which club is known as "The Royal Club"?',
    options: ['Barcelona', 'Liverpool', 'Real Madrid', 'Bayern Munich'],
    answer: 'Real Madrid'
  },
  {
    question: 'In which country was the 2018 World Cup held?',
    options: ['Qatar', 'Russia', 'Germany', 'France'],
    answer: 'Russia'
  },
  {
    question: 'Who is the current captain of the Egypt national team?',
    options: ['Mohamed Elneny', 'Trezeguet', 'Mohamed Salah', 'Ahmed Hegazi'],
    answer: 'Mohamed Salah'
  },
  {
    question: 'What does FIFA stand for?',
    options: ['UEFA', 'CAF', 'FIFA', 'NBA'],
    answer: 'FIFA'
  },
  {
    question: 'How many times has Brazil won the World Cup?',
    options: ['3', '4', '5', '6'],
    answer: '5'
  },
  {
    question: 'What is the name of Barcelona’s stadium?',
    options: ['Old Trafford', 'Santiago Bernabéu', 'Camp Nou', 'Anfield'],
    answer: 'Camp Nou'
  },
  {
    question: 'Which team won the UEFA Champions League in 2023?',
    options: ['Liverpool', 'Manchester City', 'Inter Milan', 'Real Madrid'],
    answer: 'Manchester City'
  },
  {
    question: 'Which Egyptian player played for Chelsea?',
    options: ['Ramadan Sobhi', 'Trezeguet', 'Mohamed Salah', 'Zizo'],
    answer: 'Mohamed Salah'
  },
  {
    question: 'How long is one half in a football match?',
    options: ['30 minutes', '45 minutes', '60 minutes', '90 minutes'],
    answer: '45 minutes'
  },
  {
    question: 'How many official referees are on the field during a match?',
    options: ['1', '2', '3', '4'],
    answer: '1'
  },
  {
    question: 'Who holds the record for the most Ballon d\'Or awards?',
    options: ['Ronaldo', 'Messi', 'Ronaldinho', 'Modric'],
    answer: 'Messi'
  },
  {
    question: 'What is the name of the top league in England?',
    options: ['La Liga', 'Serie A', 'Premier League', 'Bundesliga'],
    answer: 'Premier League'
  },
  {
    question: 'Who was the coach of Morocco in the 2022 World Cup?',
    options: ['Hervé Renard', 'Walid Regragui', 'Vahid Halilhodžić', 'Héctor Cúper'],
    answer: 'Walid Regragui'
  },
  {
    question: 'Which club is nicknamed "The Reds"?',
    options: ['Manchester United', 'Bayern Munich', 'Liverpool', 'Arsenal'],
    answer: 'Liverpool'
  },
  {
    question: 'What is the name of the top African club competition?',
    options: ['African Champions League', 'Confederation Cup', 'Club World Cup', 'Europa League'],
    answer: 'African Champions League'
  },
  {
    question: 'Which legendary player retired in 2023?',
    options: ['Sergio Ramos', 'Gianluigi Buffon', 'Zlatan Ibrahimović', 'Jordi Alba'],
    answer: 'Zlatan Ibrahimović'
  }

  ];
   
  const handleAnswer = (option) => {
    setSelectedOption(option);
    
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
      setCoins(coins + 5);
      setShowCoinAnimation(true);
      setTimeout(() => setShowCoinAnimation(false), 1000);
    }
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setCoins(0);
    setShowResult(false);
    setSelectedOption(null);
  };

  return (
    <div className="easy-challenge-container">
      {!showResult ? (
        <div className="quiz-card">
          <div className="quiz-header">
            <h2>Easy Challenge Level</h2>
            <div className="stats-container">
              <div className="coins-counter">
                <span className="coin-icon">💰</span>
                <span className="coin-amount">Coins: {coins}</span>
              </div>
              <div className="score-counter">
                <span className="score-label">Score:</span>
                <span className="score-amount">{score}</span>
              </div>
            </div>
            <div className="progress-container">
              <div 
                className="progress-bar"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
            <p className="question-counter">Question {currentQuestion + 1} of {questions.length}</p>
          </div>
          
          <div className="question-section">
            <h3>{questions[currentQuestion].question}</h3>
            <div className="options-grid">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className={`option-btn ${
                    selectedOption === option
                      ? option === questions[currentQuestion].answer
                        ? 'correct'
                        : 'wrong'
                      : ''
                  }`}
                  onClick={() => handleAnswer(option)}
                  disabled={selectedOption !== null}
                >
                  {option}
                  {selectedOption === option && option === questions[currentQuestion].answer && (
                    <span className="coin-reward">+5💰</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {showCoinAnimation && (
            <div className="coin-animation">
              <div className="coin">+5💰</div>
            </div>
          )}
        </div>
      ) : (
        <div className="result-card">
          <h2>Quiz Results</h2>
          <div className="score-circle">
            <div className="score-text">
              <span>{score}</span> / {questions.length}
            </div>
            <div className="score-percentage">
              {Math.round((score / questions.length) * 100)}%
            </div>
          </div>
          <div className="coins-summary">
            <span className="coins-icon">💰</span>
            <span className="coins-text">You earned {coins} coins!</span>
          </div>
          <p className="result-message">
            {score >= questions.length / 2
              ? 'Excellent! You have great football knowledge ⚽'
              : 'Keep practicing to improve your football knowledge!'}
          </p>
          <button className="restart-btn" onClick={restartQuiz}>
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default EasyChallenge;