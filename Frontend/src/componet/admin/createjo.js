import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './createjo.css';

function CreateJo() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_no: '',
    gender: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/add-journalist', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setTimeout(() => {
          navigate('/profile'); // Redirect to profile page after successful submission
        }, 3000);
      } else {
        alert('Error creating journalist');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to create journalist. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="success-message">
        <h2>Journalist Created!</h2>
        <p>The new journalist has been successfully created.</p>
      </div>
    );
  }

  return (
    <div className="createjo-container">
      <h2>Create Journalist</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone_no"
            value={formData.phone_no}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Gender</label>
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

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Create Journalist'}
        </button>
      </form>
    </div>
  );
}

export default CreateJo;
