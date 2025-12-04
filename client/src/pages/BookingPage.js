import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { services } from '../data/services';
import { addBooking } from '../data/bookings';

function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = services.find((s) => s.id === id);

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState(null);

  if (!service) {
    return (
      <main className="page">
        <div className="error-message">
          <h2>Service Not Found</h2>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate('/services')}
          >
            Back to Services
          </button>
        </div>
      </main>
    );
  }

  // Generate time slots
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour < 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeStr = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
        slots.push(timeStr);
      }
    }
    return slots;
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    if (!date || !time) {
      setError('Please select both date and time');
      return;
    }

    setLoading(true);

    try {
      // TODO: Replace with API call
      // const response = await axios.post('/api/bookings', {
      //   serviceId: id,
      //   date,
      //   time,
      //   notes,
      // });
      // setBookingId(response.data.id);

      // Mock booking
      const newBooking = {
        id: 'booking-' + Date.now(),
        serviceId: id,
        serviceName: service.title,
        servicePrice: service.price,
        date,
        time,
        notes,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      // Store in localStorage for demo
      const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      bookings.push(newBooking);
      localStorage.setItem('bookings', JSON.stringify(bookings));

      setBookingId(newBooking.id);
      setBookingConfirmed(true);
    } catch (err) {
      setError(err.message || 'Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (bookingConfirmed) {
    return (
      <main className="page page-booking-confirmation">
        <div className="confirmation-container">
          <div className="confirmation-card">
            <div className="confirmation-icon">✓</div>
            <h1>Booking Confirmed!</h1>
            <p className="confirmation-message">
              Your booking request has been submitted successfully.
            </p>

            <div className="booking-summary">
              <h3>Booking Details</h3>
              <dl className="summary-list">
                <dt>Service</dt>
                <dd>{service.title}</dd>
                <dt>Date</dt>
                <dd>{new Date(date).toLocaleDateString()}</dd>
                <dt>Time</dt>
                <dd>{time}</dd>
                <dt>Duration</dt>
                <dd>{service.durationDays} day{service.durationDays > 1 ? 's' : ''}</dd>
                <dt>Price</dt>
                <dd>${service.price}</dd>
                {notes && (
                  <>
                    <dt>Notes</dt>
                    <dd>{notes}</dd>
                  </>
                )}
                <dt>Booking ID</dt>
                <dd className="booking-id">{bookingId}</dd>
              </dl>
            </div>

            <div className="confirmation-message-box">
              <p>
                A confirmation email has been sent to your email address. You can view and manage your bookings in your dashboard.
              </p>
            </div>

            <div className="confirmation-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => navigate('/dashboard')}
              >
                View My Bookings
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/services')}
              >
                Browse More Services
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="page page-booking">
      <button
        type="button"
        className="btn btn-text link-back"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="booking-page-header">
        <h1>Book a Service</h1>
        <p>Complete your booking for <strong>{service.title}</strong></p>
      </div>

      <div className="booking-layout">
        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Select Date & Time</h3>

            <div className="form-group">
              <label htmlFor="date">
                Date <span className="required">*</span>
              </label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={today}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="time">
                Time <span className="required">*</span>
              </label>
              <select
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                className="form-input"
              >
                <option value="">Select a time slot</option>
                {generateTimeSlots().map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="notes">Additional Notes</label>
              <textarea
                id="notes"
                rows="4"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Share any preferences or additional details for this booking..."
                className="form-input"
              />
            </div>

            {error && <div className="alert alert-error">{error}</div>}

            <button
              type="submit"
              className="btn btn-primary btn-large btn-block"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Confirm Booking'}
            </button>
          </div>
        </form>

        <aside className="booking-summary-sidebar">
          <div className="booking-summary-card">
            <h3>Booking Summary</h3>

            <div className="summary-item">
              <span className="label">Service</span>
              <span className="value">{service.title}</span>
            </div>

            <div className="summary-item">
              <span className="label">Duration</span>
              <span className="value">{service.durationDays} day{service.durationDays > 1 ? 's' : ''}</span>
            </div>

            <div className="summary-item">
              <span className="label">Category</span>
              <span className="value">{service.category}</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-item">
              <span className="label">Price</span>
              <span className="value price">${service.price}</span>
            </div>

            {date && (
              <div className="summary-item">
                <span className="label">Selected Date</span>
                <span className="value">{new Date(date).toLocaleDateString()}</span>
              </div>
            )}

            {time && (
              <div className="summary-item">
                <span className="label">Selected Time</span>
                <span className="value">{time}</span>
              </div>
            )}

            <div className="summary-info">
              <p>✓ Instant confirmation</p>
              <p>✓ Secure payment</p>
              <p>✓ Easy cancellation</p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default BookingPage;

