import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// This is a completely redesigned Navbar component to ensure correct layout.
const Navbar = ({ user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="new-navbar">
      <div className="new-navbar-container">
        {/* Left Side: Logo and Title */}
        <div className="new-navbar-left">
          <Link to="/" className="new-navbar-logo">
            <span className="logo-icon">🐾</span>
            <span className="logo-text">Adopt & Adore</span>
          </Link>
        </div>

        {/* Right Side: Desktop Navigation & Mobile Menu */}
        <div className="new-navbar-right">
          {/* Desktop Navigation */}
          <div className="new-navbar-nav-desktop">
            <Link
              to="/browse"
              className={`new-nav-item ${location.pathname === '/browse' ? 'active' : ''}`}
            >
              Browse Pets
            </Link>
            <Link
              to="/favourites"
              className={`new-nav-item ${location.pathname === '/favourites' ? 'active' : ''}`}
            >
              Favourites
            </Link>
            <Link
              to="/about"
              className={`new-nav-item ${location.pathname === '/about' ? 'active' : ''}`}
            >
              About
            </Link>
          </div>
          
          {/* User/Login Section */}
          <div className="new-user-login-section">
            {user ? (
              <div className="new-user-section">
                <span className="new-user-welcome">Welcome, {user.name || user.firstName || 'User'}</span>
                <button className="new-logout-button" onClick={onLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="new-login-button">
                Login
              </Link>
            )}
          </div>
          
          {/* Mobile Menu Toggle Button */}
          <button
            className="new-mobile-menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="new-mobile-menu-dropdown">
          <Link
            to="/browse"
            className={`new-mobile-nav-item ${location.pathname === '/browse' ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Browse Pets
          </Link>
          <Link
            to="/favourites"
            className={`new-mobile-nav-item ${location.pathname === '/favourites' ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Favourites
          </Link>
          <Link
            to="/about"
            className={`new-mobile-nav-item ${location.pathname === '/about' ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          {!user && (
            <Link
              to="/login"
              className="new-mobile-login-button"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
