import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = 'Invalid email address';
    if (!form.password) newErrors.password = 'Password is required';
    else if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined })); // clear error on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) {
      return;
    }
    setIsSubmitting(true);
    try {
      console.log('Attempting login with:', { email: form.email, password: form.password });
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });
      
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);
      
      if (response.ok) {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        
        // Call onLogin callback to update App state
        if (onLogin) onLogin(data.user);
        
        // Navigate to home page
        navigate('/');
      } else {
        setApiError(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setApiError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#fafcfb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ display: 'flex', boxShadow: '0 8px 32px rgba(0,0,0,0.10)', borderRadius: 16, overflow: 'hidden', background: 'white', maxWidth: 900, width: '100%' }}>
        {/* Left: Form */}
        <form onSubmit={handleSubmit} style={{ flex: 1, padding: '48px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 340 }}>
          <h2 style={{ textAlign: 'center', color: '#444', fontWeight: 700, fontSize: 26, letterSpacing: 2, marginBottom: 32 }}>WELCOME BACK</h2>
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontWeight: 600, fontSize: 15 }}>Email Address</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              style={{ width: '100%', marginTop: 6, padding: 12, borderRadius: 4, border: 'none', background: '#f5f5f5', fontSize: 16 }}
            />
            {errors.email && <div style={{ color: '#f44336', fontSize: 13, marginTop: 2 }}>{errors.email}</div>}
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontWeight: 600, fontSize: 15 }}>Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              style={{ width: '100%', marginTop: 6, padding: 12, borderRadius: 4, border: 'none', background: '#f5f5f5', fontSize: 16 }}
            />
            {errors.password && <div style={{ color: '#f44336', fontSize: 13, marginTop: 2 }}>{errors.password}</div>}
          </div>
          {apiError && <div style={{ color: '#f44336', textAlign: 'center', fontSize: 14, marginBottom: 8 }}>{apiError}</div>}
          <button
            type="submit"
            style={{ background: 'linear-gradient(90deg, #ff9800 0%, #ff6600 100%)', color: 'white', fontWeight: 700, fontSize: 18, border: 'none', borderRadius: 4, padding: '12px 0', marginTop: 8, cursor: 'pointer', marginBottom: 18 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Please wait...' : 'Login'}
          </button>
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <p style={{ color: '#666', fontSize: 14 }}>
              Don't have an account?{' '}
              <Link to="/signup" style={{ color: '#ff9800', textDecoration: 'none', fontWeight: 600 }}>
                Sign Up
              </Link>
            </p>
          </div>
        </form>
        {/* Right: Photo */}
        <div style={{ flex: 1, minWidth: 340, background: '#fafcfb', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '18px' }}>
          <img
            src="https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=500&h=500&fit=crop"
            alt="Pet in mailbox"
            style={{ width: '95%', height: '100%', objectFit: 'cover', maxHeight: 420, borderRadius: '5px' }}
          />
        </div>
      </div>
    </div>
  );
} 