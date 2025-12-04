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
        <div className="error-message">
          <h2>Service Not Found</h2>
          <p>The service you're looking for doesn't exist or has been removed.</p>
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

  const handleBook = () => {
    const token = localStorage.getItem('token');
    if (!token) {
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
    <main className="page page-service-details">
      <button
        type="button"
        className="btn btn-text link-back"
        onClick={() => navigate(-1)}
      >
        ← Back to Services
      </button>

      <section className="service-details">
        <div className="service-details__header">
          <div className="service-details__title-section">
            <h1>{service.title}</h1>
            {service.category && (
              <span className="service-details__category">{service.category}</span>
            )}
          </div>

          <div className="service-details__pricing">
            <div className="price-section">
              <span className="price-label">Price</span>
              <span className="price-amount">${service.price}</span>
            </div>
          </div>
        </div>

        <div className="service-details__content">
          <div className="service-details__main">
            <div className="details-section">
              <h3>About This Service</h3>
              <p className="service-details__description">{service.description}</p>
            </div>

            <div className="details-section">
              <h3>Service Details</h3>
              <dl className="details-list">
                {service.durationDays && (
                  <>
                    <dt>Duration</dt>
                    <dd>{service.durationDays} day{service.durationDays > 1 ? 's' : ''}</dd>
                  </>
                )}
                {service.category && (
                  <>
                    <dt>Category</dt>
                    <dd>{service.category}</dd>
                  </>
                )}
              </dl>
            </div>

            <div className="details-section">
              <h3>What's Included</h3>
              <ul className="includes-list">
                <li>Professional service delivery</li>
                <li>Satisfaction guarantee</li>
                <li>Flexible scheduling</li>
                <li>Customer support</li>
              </ul>
            </div>
          </div>

          <aside className="service-details__sidebar">
            <div className="booking-card">
              <div className="booking-card__header">
                <div className="booking-card__price">${service.price}</div>
                <div className="booking-card__duration">
                  {service.durationDays} day{service.durationDays > 1 ? 's' : ''}
                </div>
              </div>

              <button
                type="button"
                className="btn btn-primary btn-block btn-large"
                onClick={handleBook}
              >
                Book Now
              </button>

              <div className="booking-card__info">
                <p>✓ Instant confirmation</p>
                <p>✓ Secure booking</p>
                <p>✓ 24/7 support</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Related Services Section */}
      <section className="related-services">
        <h2>Similar Services</h2>
        <div className="related-services__list">
          {services
            .filter((s) => s.id !== service.id && s.category === service.category)
            .slice(0, 3)
            .map((relatedService) => (
              <div
                key={relatedService.id}
                className="related-service-item"
                onClick={() => navigate(`/services/${relatedService.id}`)}
                role="button"
                tabIndex={0}
              >
                <h4>{relatedService.title}</h4>
                <p>${relatedService.price}</p>
              </div>
            ))}
        </div>
      </section>
    </main>
  );
}

export default ServiceDetails;

