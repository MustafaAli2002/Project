import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Error.css';

const Error = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Page Not Found | Sportify News";
  }, []);

  return (
    <div className="error-container">
      <div className="error-content">
        <div className="error-illustration">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#FF6B6B" strokeWidth="2"/>
            <path d="M15 9L9 15" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round"/>
            <path d="M9 9L15 15" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        
        <div className="error-header">
          <h1 className="error-title">404</h1>
          <h2 className="error-subtitle">Oops! Page Not Found</h2>
          <p className="error-text">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="error-actions">
          <button 
            onClick={() => navigate(-1)} 
            className="error-button back-button"
          >
            ← Go Back
          </button>
          <button 
            onClick={() => navigate('/')} 
            className="error-button home-button"
          >
            Home Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;