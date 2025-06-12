import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './emailverifcation.css';

function EmailVerification() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [email] = useState(state?.email || '');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); 

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); 
    setOtp(value.slice(0, 6)); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true); 
    setError(''); 

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://127.0.0.1:8000/api/email-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ email, otp })
      });

      const result = await response.json();

      if (result.success) {
        navigate('/login');
      } else {
        setError(result.message || 'Verification failed. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false); // إيقاف التحميل بغض النظر عن النتيجة
    }
  };

  return (
    <div className="verify-email-container">
      <div className="verification-card">
        <div className="verification-header">
          <h2>Email Verification</h2>
          <p>We've sent a 6-digit OTP to your email address</p>
          <div className="email-display">{email}</div>
        </div>

        {error && (
          <div className="error-message">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="otp-input-container">
            <input
              type="text"
              value={otp}
              onChange={handleOtpChange}
              placeholder="Enter 6-digit OTP"
              maxLength="6"
              inputMode="numeric"
              pattern="\d{6}"
              required
              autoFocus
            />
          </div>
          <button type="submit" className="verify-button" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner"></span> Verifying...
              </>
            ) : (
              'Verify Email'
            )}
          </button>
        </form>

        <div className="resend-option">
          Didn't receive the code? <button className="resend-button">Resend OTP</button>
        </div>
      </div>
    </div>
  );
}

export default EmailVerification;