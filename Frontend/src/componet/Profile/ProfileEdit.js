import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiPhone, FiMapPin, FiSave, FiArrowLeft } from 'react-icons/fi';
import './ProfileEdit.css';

function ProfileEdit() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;

  const [formData, setFormData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    phone_no: user?.phone_no || '',
    address: user?.address || '',
    gender: user?.gender || '',
  });

  const [isLoading, setIsLoading] = useState(false); // Added loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/profile');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'Update failed'}`);
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="profile-edit-compact">
      <div className="edit-header">
        <button className="back-button" onClick={() => navigate('/profile')}>
          <FiArrowLeft />
        </button>
        <h3>Edit Profile</h3>
      </div>

      <form onSubmit={handleSubmit} className="compact-form">
        <div className="form-row">
          <div className="form-group">
            <FiUser className="input-icon" />
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="First Name"
            />
          </div>

          <div className="form-group">
            <FiUser className="input-icon" />
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Last Name"
            />
          </div>
        </div>

        <div className="form-group">
          <FiMail className="input-icon" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>

        <div className="form-group">
          <FiPhone className="input-icon" />
          <input
            type="text"
            name="phone_no"
            value={formData.phone_no}
            onChange={handleChange}
            placeholder="Phone"
          />
        </div>

        <div className="form-group">
          <FiMapPin className="input-icon" />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
          />
        </div>

        <div className="form-group">
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <button type="submit" className="save-btn" disabled={isLoading}>
          {isLoading ? (
            <span>Loading...</span> 
          ) : (
            <>
              <FiSave /> Save
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default ProfileEdit;
