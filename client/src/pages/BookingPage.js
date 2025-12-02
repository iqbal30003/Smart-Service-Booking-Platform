import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { services } from '../data/services';

function BookingPage() {
  const { id } = useParams();
  const service = services.find((s) => s.id === id);

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: replace with API call: api.post('/bookings', { serviceId: id, date, time, notes })
    alert(`Booking requested for ${service?.title || 'this service'} on ${date} at ${time}.`);
  };

  return (
    <main className="page">
      <header className="page-header">
        <h1>Book a Service</h1>
        {service && <p>You're booking: <strong>{service.title}</strong></p>}
      </header>

      <form className="booking-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="time">Time</label>
          <input
            id="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="notes">Notes (optional)</label>
          <textarea
            id="notes"
            rows="3"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Share any preferences or additional details for this booking."
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Confirm booking request
        </button>
      </form>
    </main>
  );
}

export default BookingPage;

