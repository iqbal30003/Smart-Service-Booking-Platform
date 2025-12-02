import React from 'react';
import ServiceCard from '../components/ServiceCard';
import { services } from '../data/services';

function AllServices() {
  return (
    <main className="page">
      <header className="page-header">
        <h1>All Services</h1>
        <p>Browse available services and book in just a few clicks.</p>
      </header>

      <section className="services-grid">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </section>
    </main>
  );
}

export default AllServices;

