import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './NewsDetail.css'; // This file will be created

function NewsDetails() {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsItem = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/news/${id}`, {
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch news item');
        }

        const data = await response.json();
        setNewsItem(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsItem();
  }, [id]);

  if (loading) {
    return (
      <div className="news-detail-container">
        <div className="skeleton-loading">
          <div className="skeleton-header"></div>
          <div className="skeleton-line"></div>
          <div className="skeleton-line"></div>
        </div>
      </div>
    );
  }

  if (error || !newsItem) {
    return (
      <div className="news-detail-container">
        <div className="not-found">
          <h2>An Error Occurred</h2>
          <p>Failed to load the requested news item</p>
        </div>
      </div>
    );
  }

  return (
    <div className="news-detail-container">
      <h1 className="news-title">{newsItem.title}</h1>
      {newsItem.image_path && (
        <img
          src={newsItem.image_url}
          alt={newsItem.title}
          className="featured-image"
        />
      )}
      <div className="news-content">
        <p>{newsItem.description}</p>
      </div>
    </div>
  );
}

export default NewsDetails;