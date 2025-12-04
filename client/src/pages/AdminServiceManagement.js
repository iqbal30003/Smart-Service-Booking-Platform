import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { services } from '../data/services';

function AdminServiceManagement() {
  const [allServices, setAllServices] = useState(services);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    durationDays: '',
    description: '',
    shortDescription: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.title || !formData.category || !formData.price || !formData.durationDays || !formData.description) {
      setError('Please fill in all required fields');
      return;
    }

    if (isNaN(formData.price) || formData.price <= 0) {
      setError('Price must be a positive number');
      return;
    }

    if (isNaN(formData.durationDays) || formData.durationDays <= 0) {
      setError('Duration must be a positive number');
      return;
    }

    if (editingId) {
      // Update existing service
      setAllServices(prev => prev.map(s => 
        s.id === editingId 
          ? { 
              ...s, 
              ...formData, 
              price: parseFloat(formData.price),
              durationMinutes: parseInt(formData.durationMinutes)
            }
          : s
      ));
    } else {
      // Add new service
      const newService = {
        id: 'svc-' + Date.now(),
        ...formData,
        price: parseFloat(formData.price),
        durationDays: parseInt(formData.durationDays),
      };
      setAllServices(prev => [...prev, newService]);
    }

    // Reset form
    setFormData({
      title: '',
      category: '',
      price: '',
      durationDays: '',
      description: '',
      shortDescription: '',
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (service) => {
    setFormData({
      title: service.title,
      category: service.category,
      price: service.price.toString(),
      durationDays: service.durationDays.toString(),
      description: service.description,
      shortDescription: service.shortDescription,
    });
    setEditingId(service.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      setAllServices(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      category: '',
      price: '',
      durationDays: '',
      description: '',
      shortDescription: '',
    });
    setEditingId(null);
    setShowForm(false);
    setError('');
  };

  return (
    <main className="page page-admin-services">
      <div className="admin-header">
        <div>
          <h1>Service Management</h1>
          <p>Add, edit, or delete software development services</p>
        </div>
        <button 
          type="button" 
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '✕ Cancel' : '+ Add Service'}
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="admin-card admin-card--form">
          <h2>{editingId ? 'Edit Service' : 'Add New Service'}</h2>
          
          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="title">Service Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Full-Stack Web Development"
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="e.g., Web Development"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price">Price ($) *</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="150"
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="form-group">
                <label htmlFor="durationDays">Duration (days) *</label>
                <input
                  type="number"
                  id="durationDays"
                  name="durationDays"
                  value={formData.durationDays}
                  onChange={handleInputChange}
                  placeholder="5"
                  min="0"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="shortDescription">Short Description</label>
              <input
                type="text"
                id="shortDescription"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleInputChange}
                placeholder="Brief description shown on service card"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Full Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Detailed description of the service"
                rows="4"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingId ? 'Update Service' : 'Add Service'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Services Table */}
      <div className="admin-card">
        <h2>All Services ({allServices.length})</h2>

        {allServices.length === 0 ? (
          <p className="admin-card__empty">No services yet. Add one to get started!</p>
        ) : (
          <div className="admin-table admin-table--responsive">
            <div className="admin-table__header">
              <div>Title</div>
              <div>Category</div>
              <div>Price</div>
              <div>Duration</div>
              <div>Actions</div>
            </div>
            {allServices.map(service => (
              <div key={service.id} className="admin-table__row">
                <div className="admin-table__cell">
                  <strong>{service.title}</strong>
                </div>
                <div className="admin-table__cell">{service.category}</div>
                <div className="admin-table__cell">${service.price}</div>
                <div className="admin-table__cell">{service.durationDays} day{service.durationDays > 1 ? 's' : ''}</div>
                <div className="admin-table__cell admin-table__cell--actions">
                  <button 
                    type="button" 
                    className="btn btn-small btn-secondary"
                    onClick={() => handleEdit(service)}
                  >
                    Edit
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-small btn-danger"
                    onClick={() => handleDelete(service.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default AdminServiceManagement;



