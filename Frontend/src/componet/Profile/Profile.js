import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiAward, FiEdit, FiLogOut, FiHome, FiShield, FiSettings, FiPlus } from 'react-icons/fi';
import './Profile.css';

function Profile() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('http://127.0.0.1:8000/api/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          navigate('/login');
        }
      } catch (error) {
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  useEffect(() => {
    if (!isLoading && user) {
      if (user.role === 'user') {
        navigate('/home');
      }
    }
  }, [isLoading, user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (isLoading) return (
    <div className="profile-page">
      <div className="profile-loading">
        <div className="spinner"></div>
      </div>
    </div>
  );

  if (!user) return (
    <div className="profile-page">
      <div className="profile-error">Failed to load profile</div>
    </div>
  );

  if (user.role === 'user') {
    return null; 
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar">
            {user.first_name.charAt(0)}{user.last_name.charAt(0)}
          </div>
          <h2>{user.first_name} {user.last_name}</h2>
          <p className="email">{user.email}</p>
        </div>

        <div className="profile-details">
          <div className="detail-item">
            <FiUser className="icon" />
            <span>First Name: <strong>{user.first_name}</strong></span>
          </div>
          <div className="detail-item">
            <FiUser className="icon" />
            <span>Last Name: <strong>{user.last_name}</strong></span>
          </div>
          <div className="detail-item">
            <FiMail className="icon" />
            <span>Email: <strong>{user.email}</strong></span>
          </div>
          <div className="detail-item">
            <FiAward className="icon" />
            <span>Score: <strong>{user.score}</strong></span>
          </div>
        </div>

        <div className="profile-actions">
          {user.role === 'super admin' && (
            <button className="action-btn admin" onClick={() => navigate('/superadmin')}>
              <FiShield /> Super Admin Panel
            </button>
          )}

          {(user.role === 'admin' || user.role === 'super admin') && (
            <button className="action-btn admin" onClick={() => navigate('/admindashboard')}>
              <FiSettings /> Admin Dashboard
            </button>
          )}

          {user.role === 'journalist' && (
            <button className="action-btn journalist" onClick={() => navigate('/author-dashboard')}>
              <FiEdit /> Author Dashboard
            </button>
          )}

         {(user.role === 'admin' || user.role === 'super admin') && (
            <button className="action-btn admin" onClick={() => navigate('/createjo')}>
              <FiPlus /> Create Journalist
            </button>
          )}

          <button className="action-btn primary" onClick={() => navigate('/edit-profile', { state: { user } })}>
            <FiEdit /> Edit Profile
          </button>

          <button className="action-btn danger" onClick={handleLogout}>
            <FiLogOut /> Logout
          </button>

          <button className="action-btn secondary" onClick={() => navigate('/home')}>
            <FiHome /> Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;

