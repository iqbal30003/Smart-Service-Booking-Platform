import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function ServiceCard({ service }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleView = () => {
    navigate(`/services/${service.id}`);
  };

  const handleBook = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Store the intended booking path and redirect to login
      navigate('/login', { 
        state: { 
          from: { 
            pathname: `/book/${service.id}`,
            search: location.search 
          } 
        } 
      });
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
        {service.durationDays && (
          <span>{service.durationDays} day{service.durationDays > 1 ? 's' : ''}</span>
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


