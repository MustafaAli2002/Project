import React, { useContext, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaUserCircle } from 'react-icons/fa';
import './nav.css';
import { AuthContext } from '../../componet/AuthContext/AuthContext';

function Navbars() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const handleShowProfile = () => {
    // Only navigate if we're not already on the profile page
    if (location.pathname !== '/profile') {
      navigate('/profile');
    }
    setIsProfileDropdownOpen(false);
  };

  const handleMouseEnter = () => {
    setIsProfileDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsProfileDropdownOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="navbar-modern">
      <div className="nav-left">
        <NavLink to="/home" className="nav-link">Home</NavLink>

        <div className="dropdown-modern">
          <button className="dropdown-btn">
            Leagues <span className="dropdown-arrow">⌄</span>
          </button>
          <div className="dropdown-content">
            <NavLink to="/english-premier-league" className="dropdown-item">Premier League</NavLink>
            <NavLink to="/la-liga" className="dropdown-item">La Liga</NavLink>
            <NavLink to="/serie-a" className="dropdown-item">Serie A</NavLink>
            <NavLink to="/bundesliga" className="dropdown-item">Bundesliga</NavLink>
            <NavLink to="/ligue-1" className="dropdown-item">Ligue 1</NavLink>
          </div>
        </div>
        <NavLink to="/challenges" className="nav-link">Challenges</NavLink>
        <NavLink to="/daily-challenges" className="nav-link">Daily Challenges</NavLink>
      </div>

      <div className="nav-center">
        <form className="search-container" onSubmit={handleSearch}>
          <input
            type="text"
            className="search-input"
            placeholder="Search News, players..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">
            <FaSearch className="search-icon" />
          </button>
        </form>
      </div>

      <div className="nav-right">
        <div className="social-icons">
          <a href="https://www.facebook.com/share/1613RXwocr/" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="social-icon" />
          </a>
          <a href="https://www.instagram.com/efootball8855?igsh=b3dpYWQxdWR0cmlh" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="social-icon" />
          </a>
          <a href="https://x.com/efootball195585" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="social-icon" />
          </a>
        </div>

        {user ? (
          <div
            className={`profile-dropdown ${isProfileDropdownOpen ? 'open' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="profile-toggle">
              <FaUserCircle className="profile-icon" />
              <span>Profile</span>
              <span className="dropdown-arrow">⌄</span>
            </div>
            <div className="profile-dropdown-content">
              <button 
                onClick={handleShowProfile} 
                className="dropdown-item"
                disabled={location.pathname === '/profile'}
              >
                <span>Show Profile</span>
              </button>
              <button onClick={handleLogout} className="dropdown-item logout-btn">
                <span>Logout</span>
              </button>
            </div>
          </div>
        ) : (
          <NavLink to="/login" className="auth-btn login-btn">Login</NavLink>
        )}
      </div>
    </nav>
  );
}

export default Navbars;