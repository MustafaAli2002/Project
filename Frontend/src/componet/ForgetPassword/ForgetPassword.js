import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaArrowLeft, FaCheck, FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './ForgetPassword.css';

function ForgetPassword() {
    const [step, setStep] = useState(1); 
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const otpInputs = useRef([]);
    const navigate = useNavigate();

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
    
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Please enter a valid email address');
            return;
        }
    
        setIsLoading(true);
        setError('');
    
        try {
            const response = await fetch('http://127.0.0.1:8000/api/password/forget_password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                setStep(2); // move to OTP step
            } else {
                // Handle server error response (e.g., 400 or 500)
                setError(data.message || 'Failed to send verification code');
            }
        } catch (err) {
            setError('Network error. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleOtpChange = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            otpInputs.current[index + 1].focus();
        }
    };

    const handleOtpKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            otpInputs.current[index - 1].focus();
        }
    };

    const verifyOtp = (e) => {
        e.preventDefault();
        const enteredOtp = otp.join('');
        if (enteredOtp.length !== 6) {
            setError('Please enter the complete 6-digit OTP');
            return;
        }
        
        setIsLoading(true);
        setError('');
        
        setTimeout(() => {
            setIsLoading(false);
            setStep(3);
        }, 1500);
    };
    const resetPassword = async (e) => {
        e.preventDefault();
    
        if (newPassword.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
    
        const enteredOtp = otp.join('');
        if (enteredOtp.length !== 6) {
            setError('Please enter the complete 6-digit OTP');
            return;
        }
    
        setIsLoading(true);
        setError('');
    
        try {
            const response = await fetch('http://127.0.0.1:8000/api/password/reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    otp: enteredOtp,
                    password: newPassword
                }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                alert('Password reset successfully! You can now login with your new password.');
                navigate('/login');
            } else {
                setError(data.message || 'Failed to reset password');
            }
        } catch (err) {
            setError('Network error. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };
    

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    return (
        <div className="forget-password-container">
            <div className="forget-password-hero">
                <div className="hero-overlay" />
                <motion.div 
                    className="hero-content"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2>Reset Your Password</h2>
                    <p>Follow the steps to regain access to your account</p>
                </motion.div>
            </div>
            
            <div className="forget-password-form-container">
                <motion.div 
                    className="forget-password-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="form-header">
                        <h2>Password Recovery</h2>
                        <p className="info-text">
                            {step === 1 && 'Enter your registered email to receive a verification code'}
                            {step === 2 && `We sent a 6-digit code to ${email}`}
                            {step === 3 && 'Create a new password for your account'}
                        </p>
                    </div>
                    
                    {error && (
                        <motion.div 
                            className="error-message"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" 
                                    stroke="#DC2626" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                            <span>{error}</span>
                        </motion.div>
                    )}
                    
                    <motion.form 
                        onSubmit={
                            step === 1 ? handleEmailSubmit :
                            step === 2 ? verifyOtp :
                            resetPassword
                        }
                        className="forget-password-form"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {step === 1 && (
                            <>
                                <motion.div className="input-group" variants={itemVariants}>
                                    <FaEnvelope className="input-icon" />
                                    <input
                                        type="email"
                                        placeholder="Your registered email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <span className="input-highlight" />
                                </motion.div>
                                
                                <motion.div variants={itemVariants}>
                                    <button 
                                        type="submit" 
                                        className={`forget-password-btn ${isLoading ? 'loading' : ''}`}
                                        disabled={isLoading}
                                        whileHover={!isLoading ? { scale: 1.02 } : {}}
                                        whileTap={!isLoading ? { scale: 0.98 } : {}}
                                    >
                                        {isLoading ? (
                                            <>
                                                <span className="spinner"></span>
                                                Sending Code...
                                            </>
                                        ) : (
                                            'Send Verification Code'
                                        )}
                                    </button>
                                </motion.div>
                            </>
                        )}
                        
                        {step === 2 && (
                            <>
                                <motion.div className="otp-container" variants={itemVariants}>
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            maxLength="1"
                                            value={digit}
                                            onChange={(e) => handleOtpChange(index, e.target.value)}
                                            onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                            ref={(el) => (otpInputs.current[index] = el)}
                                            autoFocus={index === 0}
                                            className="otp-input"
                                        />
                                    ))}
                                </motion.div>
                                
                                <motion.div className="resend-link" variants={itemVariants}>
                                    Didn't receive code? <a href="#resend">Resend</a>
                                </motion.div>
                                
                                <motion.div variants={itemVariants}>
                                    <button 
                                        type="submit" 
                                        className={`forget-password-btn ${isLoading ? 'loading' : ''}`}
                                        disabled={isLoading}
                                        whileHover={!isLoading ? { scale: 1.02 } : {}}
                                        whileTap={!isLoading ? { scale: 0.98 } : {}}
                                    >
                                        {isLoading ? (
                                            <>
                                                <span className="spinner"></span>
                                                Verifying...
                                            </>
                                        ) : (
                                            'Verify Code'
                                        )}
                                    </button>
                                </motion.div>
                            </>
                        )}
                        
                        {step === 3 && (
                            <>
                                <motion.div className="input-group" variants={itemVariants}>
                                    <FaLock className="input-icon" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="New Password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
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
                                    <span className="input-highlight" />
                                </motion.div>
                                
                                <motion.div className="input-group" variants={itemVariants}>
                                    <FaLock className="input-icon" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Confirm New Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        minLength="8"
                                    />
                                    <span className="input-highlight" />
                                </motion.div>
                                
                                <motion.div variants={itemVariants}>
                                    <button 
                                        type="submit" 
                                        className={`forget-password-btn ${isLoading ? 'loading' : ''}`}
                                        disabled={isLoading}
                                        whileHover={!isLoading ? { scale: 1.02 } : {}}
                                        whileTap={!isLoading ? { scale: 0.98 } : {}}
                                    >
                                        {isLoading ? (
                                            <>
                                                <span className="spinner"></span>
                                                Resetting...
                                            </>
                                        ) : (
                                            <>
                                                Reset Password <FaCheck className="btn-icon" />
                                            </>
                                        )}
                                    </button>
                                </motion.div>
                            </>
                        )}
                    </motion.form>
                    
                    <motion.div 
                        className="footer-links"
                        variants={itemVariants}
                    >
                        {step > 1 && (
                            <button 
                                className="back-button"
                                onClick={() => setStep(step - 1)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <FaArrowLeft /> Back
                            </button>
                        )}
                        <a href="/login" className="login-link">
                            Remember your password? Login
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}

export default ForgetPassword;
