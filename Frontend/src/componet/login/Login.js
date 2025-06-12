import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const result = await response.json();

      if (response.ok && result.token) {
        localStorage.setItem('token', result.token);

        if (result.user) {
          localStorage.setItem('user', JSON.stringify(result.user));

          if (result.user.role === 'journalist') {
            navigate('/author-dashboard');
            return;
          }
        }

        navigate('/Profile');
      } else {
        setError(result.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="welcome-section">
        <div className="welcome-content">
          <h2>Welcome to Our Community!</h2>
          <p>Join thousands of members who share their passion with us.</p>
          <div className="features-list">
            <div className="feature-item"><span className="feature-icon">✓</span><span>Exclusive content</span></div>
            <div className="feature-item"><span className="feature-icon">✓</span><span>Personalized dashboard</span></div>
            <div className="feature-item"><span className="feature-icon">✓</span><span>24/7 Support</span></div>
          </div>
          <Link to="/journalist-signup" className="journalist-cta">
            Are you a journalist? <span>Join our team →</span>
          </Link>
        </div>
      </div>

      <div className="login-form-section">
        <div className="login-card">
          <h2 className="login-title">Welcome Back</h2>
          <p className="login-subtitle">Sign in to your account</p>

          {error && <div className="error-message">{error}</div>}

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email" 
                className="form-input"
                required
                autoComplete="username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
                <input 
                type="password" 
                id="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password" 
                className="form-input"
                required
                autoComplete="current-password"
              />
            </div>

            <div className="form-options">
              <div className="remember-me">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <Link to="/forgot-password" className="forgot-password">Forgot password?</Link>
            </div>

            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>

            <div className="signup-link">
              Don't have an account? <Link to="/signup" className="link">Sign up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
