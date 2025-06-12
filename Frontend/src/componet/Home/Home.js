import React, { useEffect, useState, useContext } from 'react';
import './Home.css';
import Navbars from '../Nav/navber';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../componet/AuthContext/AuthContext';

function Home() {
  const [newsItems, setNewsItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const { user } = useContext(AuthContext);
  const descriptionLength = 30; 

  useEffect(() => {
    setIsLoading(true); // بدء التحميل
    fetch('http://127.0.0.1:8000/api/news')
      .then(res => res.json())
      .then(data => {
        setNewsItems(data);
        setIsLoading(false); 
      })
      .catch(err => {
        console.error('Failed to fetch news:', err);
        setIsLoading(false); 
      });
  }, []);

  return (
    <div className="home-container">
      <Navbars />
      {isLoading ? (
        <div className="loading-container">
          {/* يمكنك استبدال هذا بأي عنصر تحميل تريده */}
          <div className="loading-spinner"></div>
          <p>Loading news...</p>
        </div>
      ) : (
        <div className="home-news-grid">
          {newsItems.map(item => (
            <Link to={`/news/${item.id}`} key={item.id} className="home-news-card-link">
              <div className="home-news-card">
                <div className="home-card-image">
                  <img
                    src={
                      item.image_path
                        ? item.image_url
                        : 'https://via.placeholder.com/300x200?text=No+Image'
                    }
                    alt={item.title}
                    className="home-news-image"
                  />
                </div>
                <div className="home-card-content">
                  <h3>{item.title}</h3>
                  <p>
                    {item.description.length > descriptionLength
                      ? `${item.description.substring(0, descriptionLength)}...`
                      : item.description}
                  </p>
                  <div className="home-card-footer">
                    <button className="home-read-more">Read More</button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;