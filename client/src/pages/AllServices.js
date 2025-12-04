import React, { useState, useMemo } from 'react';
import ServiceCard from '../components/ServiceCard';
import { services } from '../data/services';

function AllServices() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(['All']);
    services.forEach((s) => {
      if (s.category) cats.add(s.category);
    });
    return Array.from(cats);
  }, []);

  // Filter and sort services
  const filteredServices = useMemo(() => {
    let result = services;

    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter((s) => s.category === selectedCategory);
    }

    // Filter by search term - prioritize title matches
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter((s) => {
        const titleMatch = s.title.toLowerCase().includes(term);
        const categoryMatch = s.category && s.category.toLowerCase().includes(term);
        // Only check description if title or category already match
        const descMatch = s.description.toLowerCase().includes(term);
        return titleMatch || categoryMatch || descMatch;
      });
    }

    // Sort
    if (sortBy === 'name') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'duration') {
      result.sort((a, b) => a.durationMinutes - b.durationMinutes);
    }

    return result;
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <main className="page page-services">
      <div className="page-header">
        <h1>All Services</h1>
        <p>Explore our complete catalog of professional services</p>
      </div>

      {/* Filters Section */}
      <div className="services-filters">
        <div className="filter-group">
          <label htmlFor="search">Search Services</label>
          <input
            type="text"
            id="search"
            placeholder="Search by name, category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="filter-input"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-select"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="sort">Sort By</label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="name">Name (A-Z)</option>
            <option value="price-low">Price (Low to High)</option>
            <option value="price-high">Price (High to Low)</option>
            <option value="duration">Duration</option>
          </select>
        </div>
      </div>

      {/* Results Info */}
      <div className="services-info">
        <p>
          Showing <strong>{filteredServices.length}</strong> of{' '}
          <strong>{services.length}</strong> services
        </p>
      </div>

      {/* Services Grid */}
      {filteredServices.length > 0 ? (
        <section className="services-grid">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </section>
      ) : (
        <div className="no-results">
          <p>No services found matching your criteria.</p>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              setSortBy('name');
            }}
          >
            Clear Filters
          </button>
        </div>
      )}
    </main>
  );
}

export default AllServices;

