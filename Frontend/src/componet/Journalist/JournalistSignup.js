import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './JournalistSignup.css';

function JournalistSignup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    cv_path: null,
    experience: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // خيارات سنوات الخبرة
  const experienceOptions = [
    { value: '', label: 'Select years of experience' },
    { value: '0-1', label: '0-1 years' },
    { value: '1-3', label: '1-3 years' },
    { value: '3-5', label: '3-5 years' },
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submissionData = new FormData();
    submissionData.append('full_name', formData.full_name);
    submissionData.append('email', formData.email);
    submissionData.append('phone', formData.phone);
    submissionData.append('experience', formData.experience);
    submissionData.append('cv_path', formData.cv_path);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/applications', {
        method: 'POST',
        body: submissionData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setSubmitSuccess(true);

      setTimeout(() => {
        navigate('/home');
      }, 3000);

    } catch (error) {
      console.error('Submission failed:', error);
      alert('Failed to submit application. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="success-animation">
        <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
          <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
        </svg>
        <h2>Application Submitted!</h2>
        <p>We've sent a confirmation to your email</p>
        <div className="progress-bar">
          <div className="progress"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="journalist-signup-container">
      <div className="signup-hero">
        <div className="hero-content">
          <h1>Join Our Journalism Team</h1>
          <p>Help us deliver high-quality content to our community</p>
        </div>
      </div>

      <div className="signup-form-container">
        <form onSubmit={handleSubmit} className="journalist-form">
          <div className="form-header">
            <h2>Application Form</h2>
            <p>Fill in your details to get started</p>
          </div>

          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
              placeholder="John Doe"
            />
          </div>

          <div className="input-row">
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
              />
            </div>

            <div className="input-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+1234567890"
              />
            </div>
          </div>

          <div className="input-group">
            <label>Experience</label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
              className="experience-dropdown"
            >
              {experienceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <div className="file-link-container">
              <input
                type="file"
                id="cv-upload"
                name="cv_path"
                onChange={handleChange}
                accept=".pdf"
                required
                className="file-input"
              />
              <label htmlFor="cv-upload" className="file-link-label">
                {formData.cv_path ? (
                  <span className="file-link-selected">
                    Selected: <span className="file-name">{formData.cv_path.name}</span>
                    <span className="change-link"> (change)</span>
                  </span>
                ) : (
                  <span className="file-link">Click to select your CV</span>
                )}
              </label>
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                Processing...
              </>
            ) : (
              'Submit Application'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default JournalistSignup;