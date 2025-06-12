import React, { useState } from 'react';
import './superadmin.css';

function SuperAdmin() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_no: '',
    gender: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/add-admin', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('Admin added successfully!');
        setFormData({
          first_name: '',
          last_name: '',
          email: '',
          phone_no: '',
          gender: '',
        });
      } else {
        const errorData = await response.json();
        setStatus(`Failed: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div className="superadmin-container">
      <h2>Add New Admin</h2>
      <form onSubmit={handleSubmit} className="superadmin-form">
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone_no"
          placeholder="Phone Number"
          value={formData.phone_no}
          onChange={handleChange}
          required
        />
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <button type="submit">Add Admin</button>
        {status && <p className="status">{status}</p>}
      </form>
    </div>
  );
}

export default SuperAdmin;
