import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CloseOutlined } from '@ant-design/icons';
import './DailyChallenges.css';

function DailyChallenges() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [noChallenge, setNoChallenge] = useState(false);

  useEffect(() => {
    const fetchDailyQuestion = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/login');
        return;
      }

      setLoading(true);
      setNoChallenge(false);

      try {
        const response = await fetch('http://127.0.0.1:8000/api/daily-challenge', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setLoading(false);

          if (data && data.question) {
            const formatted = {
              id: data.question_id,
              question: data.question,
              choices: data.options,
            };
            setCurrentQuestion(formatted);
          } else {
            setNoChallenge(true);
          }
        } else if (response.status === 404) {
          setLoading(false);
          setNoChallenge(true);
        } else {
          setLoading(false);
          console.error('Failed to fetch daily question');
          setFeedbackMessage('Failed to load the challenge.');
        }
      } catch (err) {
        setLoading(false);
        console.error('Error fetching daily question:', err);
        setFeedbackMessage('Error loading the challenge.');
      }
    };

    fetchDailyQuestion();
  }, [navigate]);

  const handleAnswer = async (answer) => {
    setSelectedAnswer(answer);
    setIsAnswered(true);

    const token = localStorage.getItem('token');

    const payload = {
      question_id: currentQuestion.id,
      selected_answer: answer,
    };

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/daily-challenge/${currentQuestion.id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log('API response:', result);

      setFeedbackMessage(result.message || 'Submitted.');
    } catch (err) {
      console.error('Error submitting answer:', err);
      setFeedbackMessage('Error submitting answer.');
    }
  };

  const handleExit = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Loading today's challenge...</p>
      </div>
    );
  }

  if (noChallenge) {
    return (
      <div className="football-challenge-container">
        <div className="football-challenge no-challenge">
          <button className="exit-btn" onClick={handleExit}>
            <CloseOutlined />
          </button>
          <h2>No Challenge Today</h2>
          <p>Come back tomorrow for a new football challenge!</p>
        </div>
      </div>
    );
  }

  if (!currentQuestion || !currentQuestion.choices) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Loading question data...</p>
      </div>
    );
  }

  return (
    <div className="football-challenge-container">
      <div className="football-challenge">
        <button className="exit-btn" onClick={handleExit}>
          <CloseOutlined />
        </button>

        <h1>Today's Football Challenge</h1>

        <div className="question-card">
          <h2>{currentQuestion.question}</h2>

          <div className="options">
            {currentQuestion.choices.map((option, index) => (
              <button
                key={index}
                onClick={() => !isAnswered && handleAnswer(option)}
                className={`option-btn ${
                  isAnswered && option === selectedAnswer
                    ? feedbackMessage.includes('Correct') ? 'correct' : 'wrong'
                    : ''
                }`}
                disabled={isAnswered}
              >
                {option}
              </button>
            ))}
          </div>

          {isAnswered && (
            <div className={`feedback ${
              feedbackMessage.includes('Correct') ? 'correct-answer'
              : feedbackMessage.includes('already') ? 'already-answered'
              : 'wrong-answer'
            }`}>
              <p>{feedbackMessage}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DailyChallenges;