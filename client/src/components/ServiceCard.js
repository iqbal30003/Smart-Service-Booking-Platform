import React from 'react';
import { useNavigate } from 'react-router-dom';

function ServiceCard({ service }) {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/services/${service.id}`);
  };

  const handleBook = () => {
    const token = localStorage.getItem('ssbp_token');
    if (!token) {
      navigate('/login');
      return;
    }
    navigate(`/book/${service.id}`);
  };

  return (
    <article className="service-card">
      <div className="service-card__header">
        <h3>{service.title}</h3>
        {service.category && <span className="service-card__category">{service.category}</span>}
      </div>
      <p className="service-card__summary">{service.shortDescription || service.description}</p>
      <div className="service-card__meta">
        {service.durationMinutes && (
          <span>{service.durationMinutes} min</span>
        )}
        <span className="service-card__price">${service.price}</span>
      </div>
      <div className="service-card__actions">
        <button type="button" className="btn btn-text" onClick={handleView}>
          Details
        </button>
        <button type="button" className="btn btn-primary" onClick={handleBook}>
          Book now
        </button>
      </div>
    </article>
  );
}

export default ServiceCard;


