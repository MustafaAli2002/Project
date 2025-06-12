import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaPhone, FaMapMarkerAlt, FaVenusMars } from 'react-icons/fa';
import './SignUp.css';

function SignUp() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone_no: '',
        address: '',
        gender: ''
    });

    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    // Check email availability when email changes
    useEffect(() => {
        const checkEmailAvailability = async () => {
            if (formData.email && formData.email.includes('@')) {
                try {
                    const response = await fetch(`http://127.0.0.1:8000/api/check-email?email=${formData.email}`);
                    const data = await response.json();
                    if (!data.available) {
                        setEmailError('This email has already been taken');
                    } else {
                        setEmailError('');
                    }
                } catch (err) {
                    console.error('Error checking email:', err);
                }
            }
        };

        const timer = setTimeout(() => {
            if (formData.email) {
                checkEmailAvailability();
            }
        }, 500); // Debounce for 500ms

        return () => clearTimeout(timer);
    }, [formData.email]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (emailError) {
            setError('Please fix the email error before submitting');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match!');
            return;
        }

        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }

        if (!formData.firstName || !formData.lastName) {
            setError('First Name and Last Name are required!');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('http://127.0.0.1:8000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    email: formData.email,
                    password: formData.password,
                    phone_no: formData.phone_no,
                    address: formData.address,
                    gender: formData.gender
                })
            });

            const result = await response.json();

            if (result.success) {
                localStorage.setItem('token', result.token);
                navigate('/verify-email', { state: { email: formData.email } });
            } else {
                if (result.message.includes('email')) {
                    setEmailError('This email has already been taken');
                }
                setError(result.message || 'Signup failed.');
            }
        } catch (err) {
            setError('Signup failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-hero">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <h2>Join Our Community</h2>
                    <p>Create your account to get started</p>
                </div>
            </div>

            <div className="signup-form-container">
                <div className="signup-card">
                    <div className="form-header">
                        <h2>Create Account</h2>
                        <p className="subtitle">Start your journey with us</p>
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

                    <form onSubmit={handleSubmit} className="signup-form">
                        <div className="input-group">
                            <FaUser className="input-icon" />
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <FaUser className="input-icon" />
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <FaEnvelope className="input-icon" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className={emailError ? 'input-error' : ''}
                            />
                            {emailError && (
                                <div className="input-error-message">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <path d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                                            stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                    <span>{emailError}</span>
                                </div>
                            )}
                        </div>

                        <div className="input-group">
                            <FaLock className="input-icon" />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                minLength="8"
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        <div className="input-group">
                            <FaLock className="input-icon" />
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                minLength="8"
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        <div className="input-group">
                            <FaPhone className="input-icon" />
                            <input
                                type="tel"
                                name="phone_no"
                                placeholder="Phone Number"
                                value={formData.phone_no}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <FaMapMarkerAlt className="input-icon" />
                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <FaVenusMars className="input-icon" />
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                      
                        <button
                            type="submit"
                            className={`signup-button ${isLoading ? 'loading' : ''}`}
                            disabled={isLoading || emailError}
                        >
                            {isLoading ? (
                                <>
                                    <span className="spinner"></span>
                                    Creating Account...
                                </>
                            ) : (
                                'Sign Up'
                            )}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>Already have an account? <a href="/login" className="auth-link">Login</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;