import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { services } from '../data/services';

function ServiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const service = services.find((s) => s.id === id);

  if (!service) {
    return (
      <main className="page">
        <p>Service not found.</p>
      </main>
    );
  }

  const handleBook = () => {
    const token = localStorage.getItem('ssbp_token');
    if (!token) {
      navigate('/login', { state: { from: location } });
      return;
    }
    navigate(`/book/${service.id}`);
  };

  return (
    <main className="page">
      <button type="button" className="link-back" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <section className="service-details">
        <header className="service-details__header">
          <h1>{service.title}</h1>
          {service.category && <span className="service-details__category">{service.category}</span>}
        </header>

        <p className="service-details__description">{service.description}</p>

        <div className="service-details__meta">
          {service.durationMinutes && (
            <span>{service.durationMinutes} minutes</span>
          )}
          <span className="service-details__price">${service.price}</span>
        </div>

        <button type="button" className="btn btn-primary" onClick={handleBook}>
          Book this service
        </button>
      </section>
    </main>
  );
}

export default ServiceDetails;

