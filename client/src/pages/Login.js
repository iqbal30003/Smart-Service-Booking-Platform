import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import '../styles/Auth.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    setLoading(true);

    try {
      // TODO: Replace with actual API call
      // const response = await axios.post('/api/auth/login', { email, password });
      // localStorage.setItem('token', response.data.token);
      // localStorage.setItem('user', JSON.stringify(response.data.user));

      // Mock login
      console.log('Login attempt:', { email, password });
      
      // Determine if user is admin based on email
      const isAdmin = email === 'admin@example.com' || email === 'admin@test.com';
      const userData = { 
        email, 
        role: isAdmin ? 'admin' : 'user',
        fullName: isAdmin ? 'Admin User' : 'Regular User'
      };
      
      localStorage.setItem('token', 'mock-token-' + Date.now());
      localStorage.setItem('user', JSON.stringify(userData));

      // Dispatch custom event to trigger navbar update
      window.dispatchEvent(new CustomEvent('userLoggedIn', { detail: { user: userData } }));

      // Redirect based on role
      if (isAdmin) {
        navigate('/admin/dashboard');
      } else {
        // Get redirect location from state or default to dashboard
        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <h1>Login</h1>
          <p className="subtitle">Sign in to access your bookings and dashboard</p>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="auth-footer">
            Don't have an account? <Link to="/register">Create one here</Link>
          </p>

          <div className="divider">or</div>

          <div className="demo-section">
            <p className="demo-label">Demo Credentials:</p>
            <button
              type="button"
              className="btn btn-secondary btn-block"
              onClick={() => {
                setEmail('user@example.com');
                setPassword('password123');
              }}
            >
              Fill User Demo
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-block"
              onClick={() => {
                setEmail('admin@example.com');
                setPassword('admin123');
              }}
            >
              Fill Admin Demo
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;



