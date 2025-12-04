import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { services } from '../data/services';

function UserDashboard() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Load user data
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Load bookings from localStorage (mock data)
    const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    setBookings(allBookings);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <main className="page">
        <p>Loading your dashboard...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="page">
        <p>Please log in to view your dashboard.</p>
      </main>
    );
  }

  // Categorize bookings
  const now = new Date();
  const upcomingBookings = bookings
    .filter((b) => new Date(b.date) >= now)
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  const pastBookings = bookings
    .filter((b) => new Date(b.date) < now)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .reverse();

  const handleCancelBooking = (bookingId) => {
    const confirmed = window.confirm('Are you sure you want to cancel this booking?');
    if (confirmed) {
      const updated = bookings.map((b) =>
        b.id === bookingId ? { ...b, status: 'cancelled' } : b
      );
      setBookings(updated);
      localStorage.setItem('bookings', JSON.stringify(updated));
    }
  };

  const handleRescheduleBooking = (booking) => {
    // Store booking to edit and redirect to booking page
    localStorage.setItem('editingBooking', JSON.stringify(booking));
    navigate(`/book/${booking.serviceId}`);
  };

  const renderBooking = (booking) => {
    return (
      <div key={booking.id} className="booking-item">
        <div className="booking-item__header">
          <h4 className="booking-item__title">{booking.serviceName}</h4>
          <span
            className={`status-badge status-badge--${booking.status || 'pending'}`}
          >
            {(booking.status || 'pending').charAt(0).toUpperCase() +
              (booking.status || 'pending').slice(1)}
          </span>
        </div>

        <div className="booking-item__details">
          <div className="detail-row">
            <span className="detail-label">Date & Time</span>
            <span className="detail-value">
              {new Date(booking.date).toLocaleDateString()} at {booking.time}
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Price</span>
            <span className="detail-value">${booking.servicePrice}</span>
          </div>
          {booking.notes && (
            <div className="detail-row">
              <span className="detail-label">Notes</span>
              <span className="detail-value">{booking.notes}</span>
            </div>
          )}
        </div>

        <div className="booking-item__actions">
          {activeTab === 'upcoming' && booking.status !== 'cancelled' && (
            <>
              <button
                type="button"
                className="btn btn-secondary btn-small"
                onClick={() => handleRescheduleBooking(booking)}
              >
                Reschedule
              </button>
              <button
                type="button"
                className="btn btn-danger btn-small"
                onClick={() => handleCancelBooking(booking.id)}
              >
                Cancel
              </button>
            </>
          )}
          {activeTab === 'past' && (
            <button type="button" className="btn btn-secondary btn-small">
              Book Again
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <main className="page page-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Welcome back, {user.fullName || user.email}!</h1>
          <p>Manage your bookings and account settings</p>
        </div>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate('/services')}
        >
          + Book a Service
        </button>
      </div>

      {/* Stats Section */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-number">{upcomingBookings.length}</div>
          <div className="stat-label">Upcoming Bookings</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{pastBookings.length}</div>
          <div className="stat-label">Completed Bookings</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            ${bookings.reduce((sum, b) => sum + (b.servicePrice || 0), 0)}
          </div>
          <div className="stat-label">Total Spent</div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="dashboard-tabs">
        <div className="tabs-header">
          <button
            type="button"
            className={`tab-button ${activeTab === 'upcoming' ? 'tab-button--active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming Bookings
          </button>
          <button
            type="button"
            className={`tab-button ${activeTab === 'past' ? 'tab-button--active' : ''}`}
            onClick={() => setActiveTab('past')}
          >
            Past Bookings
          </button>
        </div>

        <div className="tabs-content">
          {activeTab === 'upcoming' && (
            <div className="bookings-section">
              {upcomingBookings.length === 0 ? (
                <div className="empty-state">
                  <p>You have no upcoming bookings.</p>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => navigate('/services')}
                  >
                    Browse Services
                  </button>
                </div>
              ) : (
                <div className="bookings-list">
                  {upcomingBookings.map(renderBooking)}
                </div>
              )}
            </div>
          )}

          {activeTab === 'past' && (
            <div className="bookings-section">
              {pastBookings.length === 0 ? (
                <div className="empty-state">
                  <p>You have no past bookings yet.</p>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => navigate('/services')}
                  >
                    Book a Service
                  </button>
                </div>
              ) : (
                <div className="bookings-list">
                  {pastBookings.map(renderBooking)}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Account Section */}
      <div className="account-section">
        <h3>Account Settings</h3>
        <div className="account-info">
          <div className="info-item">
            <span className="info-label">Email</span>
            <span className="info-value">{user.email}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Full Name</span>
            <span className="info-value">{user.fullName || 'Not set'}</span>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setTimeout(() => {
              window.dispatchEvent(new CustomEvent('userLoggedOut'));
            }, 0);
            navigate('/login');
          }}
        >
          Logout
        </button>
      </div>
    </main>
  );
}

export default UserDashboard;

