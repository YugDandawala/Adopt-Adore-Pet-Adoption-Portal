import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AdoptionForm = ({ user }) => {
  const { petId } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    reason: '',
    experience: '',
    livingArrangement: '',
    emergencyContact: {
      name: '',
      phone: '',
      relationship: ''
    },
    agreedToTerms: false
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchPetDetails();
  }, [petId, user, navigate]);

  const fetchPetDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/pets/${petId}`);
      const data = await response.json();
      setPet(data);
    } catch (error) {
      console.error('Error fetching pet:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreedToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to submit an adoption application');
      navigate('/login');
      return;
    }

    // Test token validity first
    try {
      const testResponse = await fetch('http://localhost:5000/api/users/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!testResponse.ok) {
        alert('Your session has expired. Please login again.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
        return;
      }
    } catch (error) {
      console.error('Token test error:', error);
      alert('Please login again to continue.');
      navigate('/login');
      return;
    }

    setSubmitting(true);
    try {
      console.log('Token:', token);
      console.log('Form data:', formData);
      
      // Ensure all required fields are present
      const applicationData = {
        reason: formData.reason || 'Not specified',
        experience: formData.experience || 'Not specified',
        livingArrangement: formData.livingArrangement || 'Not specified',
        emergencyContact: {
          name: formData.emergencyContact.name || 'Not specified',
          phone: formData.emergencyContact.phone || 'Not specified',
          relationship: formData.emergencyContact.relationship || 'Not specified'
        },
        agreedToTerms: formData.agreedToTerms || false
      };
      
      console.log('Sending application data:', applicationData);
      
      const response = await fetch('http://localhost:5000/api/adoptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          pet: petId,
          applicationData: applicationData
        })
      });

      console.log('Response status:', response.status);
      
      if (response.ok) {
        const adoption = await response.json();
        console.log('Adoption created:', adoption);
        navigate(`/confirmation/${adoption._id}`);
      } else {
        const errorData = await response.json();
        console.error('Server error:', errorData);
        alert(`Error submitting application: ${errorData.message || 'Please try again.'}`);
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Error submitting application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f4fbf6 0%, #e8f5e8 100%)'
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          border: '4px solid #e0e0e0',
          borderTop: '4px solid #27AE60',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p style={{ marginTop: '20px', fontSize: '18px', color: '#666' }}>Loading adoption form...</p>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f4fbf6 0%, #e8f5e8 100%)',
      padding: '40px 0'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ 
            fontSize: '42px', 
            fontWeight: '800', 
            color: '#2C5F5F', 
            marginBottom: '12px' 
          }}>
            Adopt {pet?.name}
          </h1>
          <p style={{ 
            fontSize: '18px', 
            color: '#666',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Complete this form to start your adoption journey. We want to ensure {pet?.name} finds the perfect forever home.
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '60px',
          alignItems: 'start'
        }}>
          {/* Left: Pet Info Card */}
          <div style={{ 
            background: 'white', 
            borderRadius: '20px', 
            padding: '32px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
            position: 'sticky',
            top: '100px'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <img
                src={pet?.photos?.[0] || 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop'}
                alt={pet?.name}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  marginBottom: '20px'
                }}
              />
              <h3 style={{ 
                fontSize: '28px', 
                fontWeight: '700', 
                color: '#2C5F5F',
                marginBottom: '8px'
              }}>
                {pet?.name}
              </h3>
              <p style={{ 
                fontSize: '16px', 
                color: '#666',
                marginBottom: '16px'
              }}>
                {pet?.breed} • {pet?.age} years old • {pet?.gender}
              </p>
              <div style={{
                background: 'linear-gradient(135deg, #27AE60 0%, #219653 100%)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '25px',
                fontSize: '16px',
                fontWeight: '600'
              }}>
                Adoption Fee: ₹{pet?.adoptionFee}
              </div>
            </div>

            <div style={{
              background: '#f8f9fa',
              padding: '20px',
              borderRadius: '12px',
              marginTop: '24px'
            }}>
              <h4 style={{ 
                fontSize: '18px', 
                fontWeight: '600', 
                color: '#2C5F5F',
                marginBottom: '12px'
              }}>
                Why Adopt {pet?.name}?
              </h4>
              <p style={{ 
                fontSize: '14px', 
                lineHeight: '1.6', 
                color: '#666' 
              }}>
                {pet?.description}
              </p>
            </div>
          </div>

          {/* Right: Adoption Form */}
          <div style={{ 
            background: 'white', 
            borderRadius: '20px', 
            padding: '40px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
          }}>
            <form onSubmit={handleSubmit}>
              <h3 style={{ 
                fontSize: '24px', 
                fontWeight: '700', 
                color: '#2C5F5F',
                marginBottom: '32px',
                textAlign: 'center'
              }}>
                Adoption Application
              </h3>

              {/* Reason for Adoption */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '16px', 
                  fontWeight: '600', 
                  color: '#333',
                  marginBottom: '8px'
                }}>
                  Why do you want to adopt {pet?.name}?
                </label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '16px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '12px',
                    fontSize: '16px',
                    resize: 'vertical',
                    minHeight: '100px',
                    outline: 'none',
                    transition: 'border-color 0.3s ease'
                  }}
                  placeholder="Tell us about your motivation for adopting this pet..."
                />
              </div>

              {/* Pet Experience */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '16px', 
                  fontWeight: '600', 
                  color: '#333',
                  marginBottom: '8px'
                }}>
                  Do you have experience with pets?
                </label>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '16px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '12px',
                    fontSize: '16px',
                    resize: 'vertical',
                    minHeight: '100px',
                    outline: 'none',
                    transition: 'border-color 0.3s ease'
                  }}
                  placeholder="Describe your experience with pets, if any..."
                />
              </div>

              {/* Living Arrangement */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '16px', 
                  fontWeight: '600', 
                  color: '#333',
                  marginBottom: '8px'
                }}>
                  What is your living arrangement?
                </label>
                <select
                  name="livingArrangement"
                  value={formData.livingArrangement}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '16px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '12px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.3s ease'
                  }}
                >
                  <option value="">Select your living arrangement</option>
                  <option value="House with yard">House with yard</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Condo">Condo</option>
                  <option value="Townhouse">Townhouse</option>
                  <option value="Other">Other</option>
                </select>
              </div>



              {/* Emergency Contact */}
              <div style={{ marginBottom: '32px' }}>
                <h4 style={{ 
                  fontSize: '18px', 
                  fontWeight: '600', 
                  color: '#2C5F5F',
                  marginBottom: '16px'
                }}>
                  Emergency Contact
                </h4>
                <div style={{ display: 'grid', gap: '16px' }}>
                  <input
                    type="text"
                    name="emergencyContact.name"
                    value={formData.emergencyContact.name}
                    onChange={handleInputChange}
                    placeholder="Emergency contact name"
                    required
                    style={{
                      width: '100%',
                      padding: '16px',
                      border: '2px solid #e0e0e0',
                      borderRadius: '12px',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'border-color 0.3s ease'
                    }}
                  />
                  <input
                    type="tel"
                    name="emergencyContact.phone"
                    value={formData.emergencyContact.phone}
                    onChange={handleInputChange}
                    placeholder="Emergency contact phone"
                    required
                    style={{
                      width: '100%',
                      padding: '16px',
                      border: '2px solid #e0e0e0',
                      borderRadius: '12px',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'border-color 0.3s ease'
                    }}
                  />
                  <input
                    type="text"
                    name="emergencyContact.relationship"
                    value={formData.emergencyContact.relationship}
                    onChange={handleInputChange}
                    placeholder="Relationship to you"
                    required
                    style={{
                      width: '100%',
                      padding: '16px',
                      border: '2px solid #e0e0e0',
                      borderRadius: '12px',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'border-color 0.3s ease'
                    }}
                  />
                </div>
              </div>

              {/* Terms and Conditions */}
              <div style={{ marginBottom: '32px' }}>
                <label style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: '12px',
                  cursor: 'pointer'
                }}>
                  <input
                    type="checkbox"
                    name="agreedToTerms"
                    checked={formData.agreedToTerms}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '20px',
                      height: '20px',
                      marginTop: '2px'
                    }}
                  />
                  <span style={{ 
                    fontSize: '14px', 
                    color: '#666',
                    lineHeight: '1.5'
                  }}>
                    I agree to the terms and conditions of adoption. I understand that adopting a pet is a lifelong commitment and I am prepared to provide proper care, love, and attention to {pet?.name}.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #27AE60 0%, #219653 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '18px',
                  borderRadius: '12px',
                  fontSize: '18px',
                  fontWeight: '700',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  opacity: submitting ? 0.7 : 1,
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                }}
              >
                {submitting ? 'Submitting Application...' : 'Submit Adoption Application'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdoptionForm;