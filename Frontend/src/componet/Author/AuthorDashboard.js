import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AuthorDashboard.css';

function AuthorDashboard() {
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [uploadMessage, setUploadMessage] = useState('');
    const [previewImage, setPreviewImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFile || !description || !title) return;

        setIsUploading(true);
        setUploadMessage('Uploading...');

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('User not authenticated. Please log in.');
                navigate('/');
                return;
            }

            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('image', selectedFile);

            const res = await axios.post('http://127.0.0.1:8000/api/news', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json'
                },
                maxRedirects: 0,
                validateStatus: status => status >= 200 && status < 400
            });

            if (res.status === 302) {
                alert('Redirected to login. Your token may be invalid.');
                localStorage.removeItem('token');
                navigate('/');
                return;
            }

            const data = res.data;

            const newImage = {
                id: data.id || Date.now(),
                url: data.image_path ? `${data.image_url}/${data.image_path}` : previewImage,
                title: data.title,
                description: data.description,
                date: new Date(data.created_at || Date.now()).toLocaleDateString(),
                status: 'pending' // Indicate that the news is pending admin review
            };

            setImages([...images, newImage]);
            setTitle('');
            setDescription('');
            setPreviewImage(null);
            setSelectedFile(null);
            setUploadMessage('News uploaded successfully! Waiting for admin review.');

            // Optionally, reset the upload message after a short delay
            setTimeout(() => {
                setUploadMessage('');
            }, 3000);

        } catch (error) {
            console.error('Upload error:', error);
            setUploadMessage('Upload failed: ' + (error.response?.data?.message || error.message));
        } finally {
            setIsUploading(false);
        }
    };

    const handleDeleteAll = () => {
        if (window.confirm('Are you sure you want to delete all news?')) {
            setImages([]);
        }
    };

    const handleDeleteSingle = (id) => {
        setImages(images.filter(image => image.id !== id));
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Author Dashboard</h1>
                <div className="header-actions">
                    {images.length > 0 && (
                        <button onClick={handleDeleteAll} className="delete-all-btn">
                            Delete All News
                        </button>
                    )}
                    <button onClick={handleLogout} className="logout-btn">
                        Logout
                    </button>
                </div>
            </header>

            <div className="dashboard-content">
                <div className="upload-section">
                    <h2>Upload New News</h2>
                    <form onSubmit={handleSubmit} className="upload-form">
                        <div className="upload-area">
                            {previewImage ? (
                                <div className="image-preview">
                                    <img src={previewImage} alt="Preview" />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setPreviewImage(null);
                                            setSelectedFile(null);
                                        }}
                                        className="remove-btn"
                                    >
                                        ×
                                    </button>
                                </div>
                            ) : (
                                <label className="file-input-label">
                                    <input
                                        type="file"
                                        onChange={handleImageChange}
                                        accept="image/*"
                                        className="file-input"
                                    />
                                    <div className="upload-placeholder">
                                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"></path>
                                            <line x1="16" y1="5" x2="22" y2="5"></line>
                                            <line x1="19" y1="2" x2="19" y2="8"></line>
                                            <circle cx="9" cy="9" r="3"></circle>
                                            <path d="M21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                                        </svg>
                                        <p>Click to upload news image</p>
                                    </div>
                                </label>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <textarea
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter a title for this news..."
                                rows="1"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">News Description</label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter a description for this news..."
                                rows="4"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="upload-btn"
                            disabled={!previewImage || !description || !title || isUploading}
                        >
                            {isUploading ? 'Uploading...' : 'Upload News'}
                        </button>
                        {uploadMessage && <p className="upload-status">{uploadMessage}</p>}
                    </form>
                </div>

                <div className="gallery-section">
                    <div className="section-header">
                        <h2>Your News</h2>
                        {images.length > 0 && (
                            <span className="news-count">{images.length} news items</span>
                        )}
                    </div>

                    {images.length > 0 ? (
                        <div className="image-grid">
                            {images.map((image) => (
                                <div key={image.id} className="image-card">
                                    <img src={image.url} alt={image.title} />
                                    <div className="image-info">
                                        <h4>{image.title}</h4>
                                        <p>{image.description}</p>
                                        <div className="card-footer">
                                            <small>Uploaded: {image.date}</small>
                                            {image.status === 'pending' && (
                                                <span className="pending-badge">Pending Review</span>
                                            )}
                                            <button
                                                onClick={() => handleDeleteSingle(image.id)}
                                                className="delete-btn"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <p>No news uploaded yet. Upload your first news item!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AuthorDashboard;