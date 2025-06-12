import React, { useState } from 'react';
import './HardChallenge.css';

function HardChallenge() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showCoinAnimation, setShowCoinAnimation] = useState(false);

  const questions = [
    {
      question: 'Who scored the fastest goal in World Cup history?',
      options: ['Hakan Şükür', 'Cristiano Ronaldo', 'Mbappé', 'Pelé'],
      answer: 'Hakan Şükür'
    },
    {
      question: 'Which club has won the most UEFA Europa League titles?',
      options: ['Liverpool', 'Inter Milan', 'Sevilla', 'Juventus'],
      answer: 'Sevilla'
    },
    {
      question: 'Who was the Ballon d\'Or winner in 2006?',
      options: ['Zidane', 'Ronaldinho', 'Cannavaro', 'Henry'],
      answer: 'Cannavaro'
    },
    {
      question: 'What is the name of the official match ball used in the 2010 World Cup?',
      options: ['Tango España', 'Telstar', 'Jabulani', 'Brazuca'],
      answer: 'Jabulani'
    },
    {
      question: 'Who is the only goalkeeper to win the Ballon d\'Or?',
      options: ['Neuer', 'Yashin', 'Buffon', 'Schmeichel'],
      answer: 'Yashin'
    },
    {
      question: 'Which player has scored in 5 different World Cups?',
      options: ['Messi', 'Ronaldo (Brazil)', 'Cristiano Ronaldo', 'Klose'],
      answer: 'Cristiano Ronaldo'
    },
    {
      question: 'Who was the first African player to win the Ballon d\'Or?',
      options: ['Eto\'o', 'George Weah', 'Didier Drogba', 'Yaya Touré'],
      answer: 'George Weah'
    },
    {
      question: 'Which player has the most assists in Champions League history?',
      options: ['Messi', 'Cristiano Ronaldo', 'Xavi', 'Di Maria'],
      answer: 'Cristiano Ronaldo'
    },
    {
      question: 'What was the score in the famous Germany vs Brazil 2014 World Cup semi-final?',
      options: ['5-0', '6-1', '7-1', '8-2'],
      answer: '7-1'
    },
    {
      question: 'Which African country was the first to qualify for a World Cup?',
      options: ['Cameroon', 'Morocco', 'Egypt', 'Tunisia'],
      answer: 'Egypt'
    }
  ];

  const handleAnswer = (option) => {
    setSelectedOption(option);
    const isCorrect = option === questions[currentQuestion].answer;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      setCoins(prev => prev + 15); // 15 عملة لكل إجابة صحيحة في المستوى الصعب
      setShowCoinAnimation(true);
      setTimeout(() => setShowCoinAnimation(false), 1000);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
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
    <div className="hard-challenge-container">
      {!showResult ? (
        <div className="quiz-card">
          <div className="quiz-header">
            <h2>Hard Level Challenge</h2>
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
                    <span className="coin-reward">+15💰</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {showCoinAnimation && (
            <div className="coin-animation">
              <div className="coin">+15💰</div>
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
              ? 'Legendary! You mastered these hard questions! 🏆'
              : 'Hard level requires more practice. Keep going!'}
          </p>
          <button className="restart-btn" onClick={restartQuiz}>
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}

export default HardChallenge;