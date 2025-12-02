import React from 'react';
import { upcomingBookings, pastBookings } from '../data/bookings';

function UserDashboard() {
  const userName = 'Guest User'; // TODO: replace with real user name from auth context

  return (
    <main className="page">
      <header className="page-header">
        <h1>Welcome back, {userName}</h1>
        <p>Here is a quick snapshot of your upcoming bookings and history.</p>
      </header>

      <section className="dashboard-grid">
        <article className="dashboard-card">
          <h2>Upcoming bookings</h2>
          {upcomingBookings.length === 0 ? (
            <p className="dashboard-empty">You have no upcoming bookings yet.</p>
          ) : (
            <ul className="booking-list">
              {upcomingBookings.map((booking) => (
                <li key={booking.id} className="booking-list__item">
                  <div>
                    <div className="booking-list__service">{booking.serviceTitle}</div>
                    <div className="booking-list__meta">
                      <span>
                        {booking.date} at {booking.time}
                      </span>
                      <span className={`status-pill status-pill--${booking.status}`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </article>

        <article className="dashboard-card">
          <h2>Past bookings</h2>
          {pastBookings.length === 0 ? (
            <p className="dashboard-empty">No past bookings yet.</p>
          ) : (
            <ul className="booking-list booking-list--compact">
              {pastBookings.map((booking) => (
                <li key={booking.id} className="booking-list__item">
                  <div className="booking-list__service">{booking.serviceTitle}</div>
                  <div className="booking-list__meta">
                    <span>
                      {booking.date} at {booking.time}
                    </span>
                    <span className={`status-pill status-pill--${booking.status}`}>
                      {booking.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </article>
      </section>
    </main>
  );
}

export default UserDashboard;

