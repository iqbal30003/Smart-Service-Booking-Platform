import React, { useState, useEffect } from 'react';
import { services } from '../data/services';

function AdminBookingManagement() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all'); // all, pending, approved, declined
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Load bookings from localStorage
    const storedBookings = localStorage.getItem('bookings');
    if (storedBookings) {
      try {
        setBookings(JSON.parse(storedBookings));
      } catch (e) {
        console.error('Error loading bookings:', e);
      }
    }
  }, []);

  const saveBookings = (updatedBookings) => {
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    setBookings(updatedBookings);
    setSuccess('Booking updated successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleApprove = (bookingId) => {
    const updated = bookings.map(b => 
      b.id === bookingId 
        ? { ...b, status: 'approved' }
        : b
    );
    saveBookings(updated);
  };

  const handleDecline = (bookingId) => {
    const updated = bookings.map(b => 
      b.id === bookingId 
        ? { ...b, status: 'declined' }
        : b
    );
    saveBookings(updated);
  };

  const handleDelete = (bookingId) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      const updated = bookings.filter(b => b.id !== bookingId);
      saveBookings(updated);
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  const getServiceTitle = (serviceId) => {
    const service = services.find(s => s.id === serviceId);
    return service ? service.title : 'Unknown Service';
  };

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'pending':
        return 'badge badge-warning';
      case 'approved':
        return 'badge badge-success';
      case 'declined':
        return 'badge badge-danger';
      default:
        return 'badge';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    approved: bookings.filter(b => b.status === 'approved').length,
    declined: bookings.filter(b => b.status === 'declined').length,
  };

  return (
    <main className="page page-admin-bookings">
      <div className="admin-header">
        <div>
          <h1>Booking Management</h1>
          <p>Review and approve pending service bookings</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="admin-stats admin-stats--3col">
        <div className="admin-stat-card">
          <h3>Total Bookings</h3>
          <p className="admin-stat-card__value">{stats.total}</p>
        </div>
        <div className="admin-stat-card admin-stat-card--warning">
          <h3>Pending</h3>
          <p className="admin-stat-card__value">{stats.pending}</p>
        </div>
        <div className="admin-stat-card admin-stat-card--success">
          <h3>Approved</h3>
          <p className="admin-stat-card__value">{stats.approved}</p>
        </div>
      </div>

      {/* Messages */}
      {success && <div className="alert alert-success">{success}</div>}
      {error && <div className="alert alert-error">{error}</div>}

      {/* Filter Tabs */}
      <div className="admin-tabs">
        <button 
          className={`admin-tab ${filter === 'all' ? 'admin-tab--active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({stats.total})
        </button>
        <button 
          className={`admin-tab ${filter === 'pending' ? 'admin-tab--active' : ''}`}
          onClick={() => setFilter('pending')}
        >
          Pending ({stats.pending})
        </button>
        <button 
          className={`admin-tab ${filter === 'approved' ? 'admin-tab--active' : ''}`}
          onClick={() => setFilter('approved')}
        >
          Approved ({stats.approved})
        </button>
        <button 
          className={`admin-tab ${filter === 'declined' ? 'admin-tab--active' : ''}`}
          onClick={() => setFilter('declined')}
        >
          Declined ({stats.declined})
        </button>
      </div>

      {/* Bookings List */}
      <div className="admin-card">
        {filteredBookings.length === 0 ? (
          <p className="admin-card__empty">
            {filter === 'all' 
              ? 'No bookings yet.' 
              : `No ${filter} bookings.`}
          </p>
        ) : (
          <div className="admin-bookings-list">
            {filteredBookings.map(booking => (
              <div key={booking.id} className="admin-booking-item">
                <div className="admin-booking-item__header">
                  <div>
                    <h3>{getServiceTitle(booking.serviceId)}</h3>
                    <p className="admin-booking-item__meta">
                      Booking ID: <code>{booking.id}</code>
                    </p>
                  </div>
                  <span className={getStatusBadgeClass(booking.status)}>
                    {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1) || 'Pending'}
                  </span>
                </div>

                <div className="admin-booking-item__details">
                  <div className="admin-booking-item__detail">
                    <span className="label">User:</span>
                    <span>{booking.userName || 'Guest'}</span>
                  </div>
                  <div className="admin-booking-item__detail">
                    <span className="label">Email:</span>
                    <span>{booking.userEmail || 'N/A'}</span>
                  </div>
                  <div className="admin-booking-item__detail">
                    <span className="label">Date:</span>
                    <span>{formatDate(booking.date)}</span>
                  </div>
                  <div className="admin-booking-item__detail">
                    <span className="label">Time:</span>
                    <span>{booking.time}</span>
                  </div>
                  <div className="admin-booking-item__detail">
                    <span className="label">Price:</span>
                    <span className="price">${booking.price}</span>
                  </div>
                </div>

                {booking.notes && (
                  <div className="admin-booking-item__notes">
                    <strong>Notes:</strong>
                    <p>{booking.notes}</p>
                  </div>
                )}

                <div className="admin-booking-item__actions">
                  {booking.status === 'pending' && (
                    <>
                      <button 
                        type="button" 
                        className="btn btn-small btn-success"
                        onClick={() => handleApprove(booking.id)}
                      >
                        ✓ Approve
                      </button>
                      <button 
                        type="button" 
                        className="btn btn-small btn-danger"
                        onClick={() => handleDecline(booking.id)}
                      >
                        ✕ Decline
                      </button>
                    </>
                  )}
                  <button 
                    type="button" 
                    className="btn btn-small btn-secondary"
                    onClick={() => handleDelete(booking.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default AdminBookingManagement;



