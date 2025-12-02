import React from 'react';
import { NavLink } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/admin', label: 'Admin' },
];

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__logo">
        <span>Smart</span> Service
      </div>
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
        <NavLink to="/login" className="btn btn-text">
          Login
        </NavLink>
        <NavLink to="/register" className="btn btn-primary">
          Get Started
        </NavLink>
      </div>
    </header>
  );
}

export default Navbar;


