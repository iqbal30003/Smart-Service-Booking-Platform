import React from 'react';
import { Link } from 'react-router-dom';
import { services } from '../data/services';
import ServiceCard from '../components/ServiceCard';

function Home() {
  const featuredServices = services.slice(0, 3);

  return (
    <main className="page page-home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero__content">
          <h1 className="hero__title">Smart Service Booking Platform</h1>
          <p className="hero__subtitle">
            Connect with top software development professionals. Book expert services for web development, mobile apps, DevOps, and more.
          </p>
          <div className="hero__ctas">
            <Link to="/services" className="btn btn-primary btn-large">
              Browse Services
            </Link>
            <Link to="/register" className="btn btn-secondary btn-large">
              Get Started
            </Link>
          </div>
        </div>
        <div className="hero__stats">
          <div className="stat">
            <div className="stat__number">500+</div>
            <div className="stat__label">Services Listed</div>
          </div>
          <div className="stat">
            <div className="stat__number">5K+</div>
            <div className="stat__label">Happy Clients</div>
          </div>
          <div className="stat">
            <div className="stat__number">200+</div>
            <div className="stat__label">Expert Developers</div>
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="featured-services">
        <div className="section-header">
          <h2>Featured Services</h2>
          <p>Popular software development services booked by our community</p>
        </div>
        <div className="services-grid">
          {featuredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
        <div className="featured-services__cta">
          <Link to="/services" className="btn btn-primary">
            View All Services
          </Link>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step__number">1</div>
            <h3>Browse Services</h3>
            <p>Explore our wide range of professional software development services across multiple specializations.</p>
          </div>
          <div className="step">
            <div className="step__number">2</div>
            <h3>View Details</h3>
            <p>Check service details, pricing, developer profiles, and expertise areas.</p>
          </div>
          <div className="step">
            <div className="step__number">3</div>
            <h3>Book & Collaborate</h3>
            <p>Select your preferred time slot and connect with expert developers for your project.</p>
          </div>
          <div className="step">
            <div className="step__number">4</div>
            <h3>Get Results</h3>
            <p>Work with professionals to achieve your software development goals on time and within budget.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Build Something Great?</h2>
        <p>Create an account today and book expert software development services.</p>
        <Link to="/register" className="btn btn-primary btn-large">
          Create Free Account
        </Link>
      </section>
    </main>
  );
}

export default Home;



