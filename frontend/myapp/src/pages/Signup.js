import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup({ onLogin }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = 'Full name is required';
    if (!form.email) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = 'Invalid email address';
    if (!form.password) newErrors.password = 'Password is required';
    else{
    const password = form.password;
    if (password.length!=8 ) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!/^[A-Z]/.test(password)) {
      newErrors.password = 'Password must start with a capital letter';
    } else if (!/\d/.test(password)) {
      newErrors.password = 'Password must contain at least one digit';
    } else if (!/[@#%]/.test(password)) {
      newErrors.password = 'Password must contain at least one special character';
    }

    }
    // else if (form.password.length < 8 & form.password.length>8) newErrors.password = 'Password must be at least 8 characters';
    if (!form.mobile) newErrors.mobile = 'Mobile number is required';
    else if (!/^\d{10}$/.test(form.mobile.replace(/\D/g, ''))) newErrors.mobile = 'Enter a valid 10-digit mobile number';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
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
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          mobile: form.mobile,
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        // Don't auto-login, just redirect to login page
        navigate('/login');
      } else {
        const data = await response.json();
        setApiError(data.message || 'Signup failed');
      }
    } catch (err) {
      console.error('Signup error:', err);
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
          <h2 style={{ textAlign: 'center', color: '#444', fontWeight: 700, fontSize: 26, letterSpacing: 2, marginBottom: 32 }}>CREATE AN ACCOUNT</h2>
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontWeight: 600, fontSize: 15 }}>Full name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
              style={{ width: '100%', marginTop: 6, padding: 12, borderRadius: 4, border: 'none', background: '#f5f5f5', fontSize: 16 }}
            />
            {errors.name && <div style={{ color: '#f44336', fontSize: 13, marginTop: 2 }}>{errors.name}</div>}
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontWeight: 600, fontSize: 15 }}>Email id</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="eg. example@gmail.com"
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
              placeholder="Create a password (min 6 characters)"
              style={{ width: '100%', marginTop: 6, padding: 12, borderRadius: 4, border: 'none', background: '#f5f5f5', fontSize: 16 }}
            />
            {errors.password && <div style={{ color: '#f44336', fontSize: 13, marginTop: 2 }}>{errors.password}</div>}
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontWeight: 600, fontSize: 15 }}>Mobile Number</label>
            <input
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              placeholder="+91 Your valid mobile number"
              style={{ width: '100%', marginTop: 6, padding: 12, borderRadius: 4, border: 'none', background: '#f5f5f5', fontSize: 16 }}
            />
            {errors.mobile && <div style={{ color: '#f44336', fontSize: 13, marginTop: 2 }}>{errors.mobile}</div>}
          </div>
          {apiError && <div style={{ color: '#f44336', textAlign: 'center', fontSize: 14, marginBottom: 8 }}>{apiError}</div>}
          <button
            type="submit"
            style={{ background: 'linear-gradient(90deg, #ff9800 0%, #ff6600 100%)', color: 'white', fontWeight: 700, fontSize: 18, border: 'none', borderRadius: 4, padding: '12px 0', marginTop: 8, cursor: 'pointer', marginBottom: 18 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Please wait...' : 'Sign Up'}
          </button>
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <p style={{ color: '#666', fontSize: 14 }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#ff9800', textDecoration: 'none', fontWeight: 600 }}>
                Login
              </Link>
            </p>
          </div>
        </form>
        {/* Right: Photo */}
        <div style={{ flex: 1, minWidth: 340, background: '#fafcfb', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '20px' }}>
          <img
            src="https://images.pexels.com/photos/10116536/pexels-photo-10116536.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Pet in mailbox"
            style={{ width: '95%', height: '100%', objectFit: 'cover', maxHeight: 420, borderRadius: '5px' }}
          />
        </div>
      </div>
    </div>
  );
}