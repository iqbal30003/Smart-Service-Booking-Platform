import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AllServices from './pages/AllServices';
import ServiceDetails from './pages/ServiceDetails';
import BookingPage from './pages/BookingPage';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminServiceManagement from './pages/AdminServiceManagement';
import AdminBookingManagement from './pages/AdminBookingManagement';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<AllServices />} />
            <Route path="/services/:id" element={<ServiceDetails />} />
            <Route path="/book/:id" element={<BookingPage />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/services" element={<AdminServiceManagement />} />
            <Route path="/admin/bookings" element={<AdminBookingManagement />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

