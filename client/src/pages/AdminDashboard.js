import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { services } from '../data/services';

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    totalRevenue: 0,
    activeServices: 0,
    pendingBookings: 0,
    approvedBookings: 0,
  });

  const [recentBookings, setRecentBookings] = useState([]);
  const [topServices, setTopServices] = useState([]);

  useEffect(() => {
    // Load bookings from localStorage
    const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    
    // Calculate stats
    const users = new Set(allBookings.map(b => b.email)).size + 1; // +1 for current admin
    const totalRevenue = allBookings.reduce((sum, b) => sum + (b.servicePrice || 0), 0);
    const pending = allBookings.filter(b => b.status === 'pending').length;
    const approved = allBookings.filter(b => b.status === 'approved').length;

    setStats({
      totalUsers: users,
      totalBookings: allBookings.length,
      totalRevenue,
      activeServices: services.length,
      pendingBookings: pending,
      approvedBookings: approved,
    });

    // Get recent bookings (last 5)
    const recent = allBookings
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
    setRecentBookings(recent);

    // Count bookings per service
    const serviceBookings = {};
    allBookings.forEach(b => {
      serviceBookings[b.serviceName] = (serviceBookings[b.serviceName] || 0) + 1;
    });

    const top = Object.entries(serviceBookings)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
    setTopServices(top);
  }, []);

  return (
    <main className="page page-admin-dashboard">
      <div className="admin-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Overview of your software development services platform</p>
        </div>
        <div className="admin-header__actions">
          <Link to="/admin/services" className="btn btn-primary">
            Manage Services
          </Link>
          <Link to="/admin/bookings" className="btn btn-secondary">
            Manage Bookings
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="admin-stats-grid">
        <div className="stat-card stat-card--primary">
          <div className="stat-card__icon">📊</div>
          <div className="stat-card__content">
            <div className="stat-card__number">{stats.totalBookings}</div>
            <div className="stat-card__label">Total Bookings</div>
          </div>
        </div>

        <div className="stat-card stat-card--success">
          <div className="stat-card__icon">👥</div>
          <div className="stat-card__content">
            <div className="stat-card__number">{stats.totalUsers}</div>
            <div className="stat-card__label">Total Users</div>
          </div>
        </div>

        <div className="stat-card stat-card--warning">
          <div className="stat-card__icon">⏳</div>
          <div className="stat-card__content">
            <div className="stat-card__number">{stats.pendingBookings}</div>
            <div className="stat-card__label">Pending Approval</div>
          </div>
        </div>

        <div className="stat-card stat-card--info">
          <div className="stat-card__icon">💰</div>
          <div className="stat-card__content">
            <div className="stat-card__number">${stats.totalRevenue}</div>
            <div className="stat-card__label">Total Revenue</div>
          </div>
        </div>

        <div className="stat-card stat-card--secondary">
          <div className="stat-card__icon">✅</div>
          <div className="stat-card__content">
            <div className="stat-card__number">{stats.approvedBookings}</div>
            <div className="stat-card__label">Approved Bookings</div>
          </div>
        </div>

        <div className="stat-card stat-card--accent">
          <div className="stat-card__icon">🛠️</div>
          <div className="stat-card__content">
            <div className="stat-card__number">{stats.activeServices}</div>
            <div className="stat-card__label">Active Services</div>
          </div>
        </div>
      </div>

      <div className="admin-dashboard-grid">
        {/* Recent Bookings */}
        <section className="admin-card">
          <div className="admin-card__header">
            <h2>Recent Bookings</h2>
            <Link to="/admin/bookings" className="link-text">
              View all →
            </Link>
          </div>

          {recentBookings.length === 0 ? (
            <p className="admin-card__empty">No bookings yet</p>
          ) : (
            <div className="admin-table">
              <div className="admin-table__header">
                <div>Service</div>
                <div>User</div>
                <div>Date</div>
                <div>Status</div>
              </div>
              {recentBookings.map(booking => (
                <div key={booking.id} className="admin-table__row">
                  <div className="admin-table__cell">{booking.serviceName}</div>
                  <div className="admin-table__cell">{booking.email}</div>
                  <div className="admin-table__cell">
                    {new Date(booking.date).toLocaleDateString()}
                  </div>
                  <div className="admin-table__cell">
                    <span className={`status-badge status-badge--${booking.status || 'pending'}`}>
                      {booking.status || 'pending'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Top Services */}
        <section className="admin-card">
          <div className="admin-card__header">
            <h2>Top Services</h2>
          </div>

          {topServices.length === 0 ? (
            <p className="admin-card__empty">No booking data yet</p>
          ) : (
            <div className="admin-list">
              {topServices.map((service, index) => (
                <div key={index} className="admin-list__item">
                  <div className="admin-list__rank">#{index + 1}</div>
                  <div className="admin-list__content">
                    <div className="admin-list__title">{service.name}</div>
                    <div className="admin-list__subtitle">{service.count} bookings</div>
                  </div>
                  <div className="admin-list__value">{service.count}</div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Quick Actions */}
      <section className="admin-card admin-card--full">
        <h2>Quick Actions</h2>
        <div className="admin-actions">
          <Link to="/admin/services" className="admin-action-btn">
            <span className="admin-action-btn__icon">➕</span>
            <span className="admin-action-btn__text">Add New Service</span>
          </Link>
          <Link to="/admin/bookings" className="admin-action-btn">
            <span className="admin-action-btn__icon">📋</span>
            <span className="admin-action-btn__text">Review Bookings</span>
          </Link>
          <button type="button" className="admin-action-btn" onClick={() => {
            const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
            console.log('Bookings data:', allBookings);
            alert('Bookings data exported to console');
          }}>
            <span className="admin-action-btn__icon">📊</span>
            <span className="admin-action-btn__text">Export Data</span>
          </button>
        </div>
      </section>
    </main>
  );
}

export default AdminDashboard;



