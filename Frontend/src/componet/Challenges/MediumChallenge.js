import React, { useState } from 'react';
import './MediumChallenge.css';

function MediumChallenge() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showCoinAnimation, setShowCoinAnimation] = useState(false);
  const questions = [
    {
        question: 'Which country has won the most UEFA European Championships?',
        options: ['Germany', 'Spain', 'France', 'Italy'],
        answer: 'Germany'
      },
      {
        question: 'Which African country reached the quarter-finals of the 2002 World Cup?',
        options: ['Nigeria', 'Cameroon', 'Senegal', 'Ghana'],
        answer: 'Senegal'
      },
      {
        question: 'What team did Cristiano Ronaldo make his professional debut with?',
        options: ['Manchester United', 'Sporting CP', 'Real Madrid', 'Juventus'],
        answer: 'Sporting CP'
      },
      {
        question: 'Which club did Erling Haaland play for before joining Manchester City?',
        options: ['RB Leipzig', 'Salzburg', 'Borussia Dortmund', 'Ajax'],
        answer: 'Borussia Dortmund'
      },
      {
        question: 'Who scored the "Hand of God" goal?',
        options: ['Pelé', 'Maradona', 'Zidane', 'Messi'],
        answer: 'Maradona'
      },
      {
        question: 'Which team won the Copa America in 2021?',
        options: ['Brazil', 'Argentina', 'Uruguay', 'Colombia'],
        answer: 'Argentina'
      },
      {
        question: 'Which country won the 2016 UEFA Euro?',
        options: ['Germany', 'Portugal', 'France', 'Spain'],
        answer: 'Portugal'
      },
      {
        question: 'Which manager is known for the "tiki-taka" style?',
        options: ['José Mourinho', 'Pep Guardiola', 'Jürgen Klopp', 'Carlo Ancelotti'],
        answer: 'Pep Guardiola'
      },
      {
        question: 'Which team did Mohamed Salah join after Basel?',
        options: ['Chelsea', 'Fiorentina', 'Roma', 'Liverpool'],
        answer: 'Chelsea'
      },
      {
        question: 'Which team won the first ever World Cup in 1930?',
        options: ['Brazil', 'Argentina', 'Italy', 'Uruguay'],
        answer: 'Uruguay'
      }
  ];
  const handleAnswer = (option) => {
    setSelectedOption(option);
    
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
      setCoins(coins + 10); // 10 عملات لكل إجابة صحيحة في المستوى المتوسط
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
    <div className="medium-challenge-container">
      {!showResult ? (
        <div className="quiz-card">
          <div className="quiz-header">
            <h2>Medium Level Challenge</h2>
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
                    <span className="coin-reward">+10💰</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {showCoinAnimation && (
            <div className="coin-animation">
              <div className="coin">+10💰</div>
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
              ? 'Well done! You handled these medium questions!'
              : 'Keep practicing to master this level!'}
          </p>
          <button className="restart-btn" onClick={restartQuiz}>
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}

export default MediumChallenge;