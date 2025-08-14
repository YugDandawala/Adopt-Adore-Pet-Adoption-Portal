import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const ConfirmationPage = () => {
  const { adoptionId } = useParams();
  const [adoption, setAdoption] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (adoptionId) {
      fetchAdoptionDetails();
    }
  }, [adoptionId]);

  const fetchAdoptionDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/adoptions/${adoptionId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setAdoption(data);
      } else {
        setError('Failed to fetch adoption details');
      }
    } catch (err) {
      setError('Error fetching adoption details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)'
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          border: '4px solid #e0e0e0',
          borderTop: '4px solid #27AE60',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h2>Error</h2>
          <p>{error}</p>
          <Link to="/" style={{
            background: '#27AE60',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '8px',
            textDecoration: 'none'
          }}>
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Adopted':
        return '#27AE60';
      case 'Pending':
        return '#F59E0B';
      case 'Approved':
        return '#3B82F6';
      case 'Rejected':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      padding: '40px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'relative',
      zIndex: 1
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        animation: 'slideIn 0.6s ease-out'
      }}>
        {/* Header Section */}
        <div style={{
          background: 'linear-gradient(135deg, #27AE60 0%, #219653 100%)',
          padding: '60px 40px',
          textAlign: 'center',
          color: 'white',
          position: 'relative'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 30px',
            fontSize: '40px',
            animation: 'bounce 1s ease-in-out'
          }}>
            {adoption?.status === 'Adopted' ? '✅' : '📋'}
          </div>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            margin: '0 0 15px',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}>
            {adoption?.status === 'Adopted' ? '🎉 Adoption Successful!' : `📋 Adoption ${adoption?.status}`}
          </h1>
          <p style={{
            fontSize: '1.1rem',
            opacity: '0.9',
            margin: '0 0 20px',
            lineHeight: '1.6'
          }}>
            {adoption?.status === 'Adopted' 
              ? `Congratulations! ${adoption?.pet?.name} is now part of your family!`
              : `Your adoption application for ${adoption?.pet?.name} is currently ${adoption?.status?.toLowerCase()}.`
            }
          </p>
          
          {/* Status Badge */}
          <div style={{
            display: 'inline-block',
            background: getStatusColor(adoption?.status),
            color: 'white',
            padding: '8px 20px',
            borderRadius: '25px',
            fontSize: '1rem',
            fontWeight: '600',
            marginTop: '10px'
          }}>
            Status: {adoption?.status}
          </div>
        </div>

        {/* Content Section */}
        <div style={{ padding: '50px 40px' }}>
          {/* Pet Details */}
          {adoption?.pet && (
            <div style={{ 
              background: '#f8fafc', 
              borderRadius: '15px', 
              padding: '30px', 
              marginBottom: '40px',
              border: '1px solid #e2e8f0'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#1f2937',
                margin: '0 0 20px',
                textAlign: 'center'
              }}>
                🐾 Meet {adoption.pet.name}
              </h3>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
                alignItems: 'center'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <img
                    src={adoption.pet.photos?.[0] || 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=200&h=200&fit=crop'}
                    alt={adoption.pet.name}
                    style={{
                      width: '150px',
                      height: '150px',
                      objectFit: 'cover',
                      borderRadius: '12px',
                      marginBottom: '15px'
                    }}
                  />
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '15px',
                    marginBottom: '20px'
                  }}>
                    <div>
                      <strong>Breed:</strong><br />
                      {adoption.pet.breed}
                    </div>
                    <div>
                      <strong>Age:</strong><br />
                      {adoption.pet.age} years
                    </div>
                    <div>
                      <strong>Gender:</strong><br />
                      {adoption.pet.gender}
                    </div>
                    <div>
                      <strong>Size:</strong><br />
                      {adoption.pet.size}
                    </div>
                  </div>
                  
                  <div style={{
                    background: 'white',
                    padding: '15px',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <strong>Adoption Fee:</strong> ₹{adoption.pet.adoptionFee}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div style={{ marginBottom: '50px' }}>
            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: '600',
              color: '#1f2937',
              margin: '0 0 30px',
              textAlign: 'center'
            }}>
              What to expect now?
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '25px'
            }}>
              {[
                {
                  number: '1',
                  title: 'Adoption Confirmed',
                  description: 'Your adoption has been processed and confirmed in our system'
                },
                {
                  number: '2', 
                  title: 'Pet Preparation',
                  description: 'Your pet is being prepared with all necessary documents and care'
                },
                {
                  number: '3',
                  title: 'Pickup Arrangement',
                  description: 'We\'ll contact you within 24 hours to arrange pickup details'
                },
                {
                  number: '4',
                  title: 'Welcome Home!',
                  description: 'Take your new family member home and start your journey together!'
                }
              ].map((step, index) => (
                <div key={index} style={{
                  background: '#f8fafc',
                  borderRadius: '15px',
                  padding: '25px',
                  border: '1px solid #e2e8f0',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`
                }} onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-5px)';
                  e.target.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
                }} onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '15px'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      background: 'linear-gradient(135deg, #27AE60 0%, #219653 100%)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '1.1rem',
                      marginRight: '15px'
                    }}>
                      {step.number}
                    </div>
                    <h3 style={{
                      margin: '0',
                      fontSize: '1.2rem',
                      fontWeight: '600',
                      color: '#1f2937'
                    }}>
                      {step.title}
                    </h3>
                  </div>
                  <p style={{
                    margin: '0',
                    color: '#6b7280',
                    lineHeight: '1.5',
                    fontSize: '0.95rem'
                  }}>
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Info Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '25px',
            marginBottom: '50px'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
              borderRadius: '15px',
              padding: '25px',
              border: '1px solid #f59e0b'
            }}>
              <h4 style={{
                margin: '0 0 15px',
                color: '#92400e',
                fontSize: '1.1rem',
                fontWeight: '600'
              }}>
                ⏰ Pickup Timeline
              </h4>
              <p style={{
                margin: '0',
                color: '#78350f',
                lineHeight: '1.5',
                fontSize: '0.95rem'
              }}>
                You can expect to hear from us within <strong>24 hours</strong> to arrange pickup of your new pet.
              </p>
            </div>
            
            <div style={{
              background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
              borderRadius: '15px',
              padding: '25px',
              border: '1px solid #3b82f6'
            }}>
              <h4 style={{
                margin: '0 0 15px',
                color: '#1e40af',
                fontSize: '1.1rem',
                fontWeight: '600'
              }}>
                ❓ Questions?
              </h4>
              <p style={{
                margin: '0',
                color: '#1e3a8a',
                lineHeight: '1.5',
                fontSize: '0.95rem'
              }}>
                If you have any questions about your application, please contact us at <strong>adopt@adoptandadore.com</strong>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link to="/browse" style={{
              background: 'linear-gradient(135deg, #27AE60 0%, #219653 100%)',
              color: 'white',
              padding: '15px 30px',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
              display: 'inline-block'
            }} onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
            }} onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
            }}>
              🐾 Browse More Pets
            </Link>
            
            <Link to="/" style={{
              background: 'white',
              color: '#27AE60',
              padding: '15px 30px',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '1rem',
              border: '2px solid #27AE60',
              transition: 'all 0.3s ease',
              display: 'inline-block'
            }} onMouseEnter={(e) => {
              e.target.style.background = '#27AE60';
              e.target.style.color = 'white';
            }} onMouseLeave={(e) => {
              e.target.style.background = 'white';
              e.target.style.color = '#27AE60';
            }}>
              🏠 Return Home
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        /* Override any existing confirmation styles */
        .confirmation-page {
          all: unset !important;
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </div>
  );
};

export default ConfirmationPage;