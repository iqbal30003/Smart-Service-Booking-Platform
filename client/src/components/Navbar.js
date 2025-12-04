import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Navbar() {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Load user data on mount
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Listen for custom login event
    const handleUserLoggedIn = (e) => {
      if (e.detail && e.detail.user) {
        setUser(e.detail.user);
      }
    };

    // Listen for custom logout event
    const handleUserLoggedOut = () => {
      setUser(null);
    };

    // Listen for storage changes (logout from this tab or another tab)
    const handleStorageChange = (e) => {
      // Check if user was removed from localStorage
      if (e.key === 'user' || e.key === null) {
        const updatedUser = localStorage.getItem('user');
        if (!updatedUser) {
          setUser(null);
        } else {
          setUser(JSON.parse(updatedUser));
        }
      }
    };

    window.addEventListener('userLoggedIn', handleUserLoggedIn);
    window.addEventListener('userLoggedOut', handleUserLoggedOut);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('userLoggedIn', handleUserLoggedIn);
      window.removeEventListener('userLoggedOut', handleUserLoggedOut);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    // Clear localStorage first
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Then clear the UI state
    setUser(null);
    setIsMenuOpen(false);
    
    // Dispatch event with a small delay to ensure state is cleared
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('userLoggedOut'));
    }, 0);
    
    // Navigate after everything is cleared
    navigate('/');
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
  ];

  return (
    <header className="navbar">
      <div className="navbar__container">
        <NavLink to="/" className="navbar__logo">
          <span>Smart</span> Service
        </NavLink>

        <nav className="navbar__links">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `navbar__link ${isActive ? 'navbar__link--active' : ''}`
              }
              end={link.to === '/'}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar__actions">
          {user ? (
            <div className="navbar__user-menu">
              <button
                type="button"
                className="navbar__user-button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="User menu"
              >
                <span className="navbar__user-avatar">
                  {user.fullName
                    ? user.fullName.charAt(0).toUpperCase()
                    : user.email.charAt(0).toUpperCase()}
                </span>
                <span className="navbar__user-name">{user.fullName || 'User'}</span>
              </button>

              {isMenuOpen && (
                <div className="navbar__dropdown-menu">
                  <NavLink
                    to="/dashboard"
                    className="navbar__dropdown-item"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Bookings
                  </NavLink>
                  {user.role === 'admin' && (
                    <>
                      <NavLink
                        to="/admin/dashboard"
                        className="navbar__dropdown-item"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Admin Dashboard
                      </NavLink>
                      <NavLink
                        to="/admin/services"
                        className="navbar__dropdown-item"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Manage Services
                      </NavLink>
                      <NavLink
                        to="/admin/bookings"
                        className="navbar__dropdown-item"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Manage Bookings
                      </NavLink>
                    </>
                  )}
                  <div className="navbar__dropdown-divider"></div>
                  <button
                    type="button"
                    className="navbar__dropdown-item navbar__dropdown-item--logout"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <NavLink to="/login" className="btn btn-text">
                Login
              </NavLink>
              <NavLink to="/register" className="btn btn-primary">
                Get Started
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;


