import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const PetDetails = ({ toggleFavourite, isFavourite, user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    fetchPetDetails();
  }, [id]);

  const fetchPetDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/pets/${id}`);
      if (response.ok) {
        const data = await response.json();
        setPet(data);
      } else {
        console.error('Pet not found');
      }
    } catch (error) {
      console.error('Error fetching pet details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdoptClick = () => {
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }
    navigate(`/adopt/${pet._id}`);
  };

  const handleFavouriteClick = () => {
    toggleFavourite(pet);
  };

  const getAgeText = (age) => {
    if (age < 1) return `${Math.round(age * 12)} months old`;
    return age === 1 ? '1 year old' : `${age} years old`;
  };

  const getPetImages = () => {
    if (pet.photos && pet.photos.length > 0) {
      return pet.photos;
    }
    const fallbackImages = {
      Dog: [
        'https://images.unsplash.com/photo-1552053831-71594a27632d?w=1600&h=1200&fit=crop&crop=center&q=95',
        'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=1600&h=1200&fit=crop&crop=center&q=95',
        'https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?w=1600&h=1200&fit=crop&crop=center&q=95'
      ],
      Cat: [
        'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1600&h=1200&fit=crop&crop=center&q=95',
        'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=1600&h=1200&fit=crop&crop=center&q=95',
        'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=1600&h=1200&fit=crop&crop=center&q=95'
      ],
      Turtle: [
        'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=1600&h=1200&fit=crop&crop=center&q=95',
        'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=1600&h=1200&fit=crop&crop=center&q=95'
      ],
      Fish: [
        'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=1600&h=1200&fit=crop&crop=center&q=95',
        'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=1600&h=1200&fit=crop&crop=center&q=95'
      ],
      Rabbit: [
        'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=1600&h=1200&fit=crop&crop=center&q=95',
        'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=1600&h=1200&fit=crop&crop=center&q=95'
      ],
      Bird: [
        'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=1600&h=1200&fit=crop&crop=center&q=95'
      ],
      Other: [
        'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1600&h=1200&fit=crop&crop=center&q=95'
      ]
    };
    return fallbackImages[pet.species] || fallbackImages.Other;
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e0f2fe 0%, #ffffff 50%, #f3e8ff 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
                  <div style={{
          width: '64px',
          height: '64px',
          border: '4px solid #E6E8FF',
          borderTop: '4px solid #27AE60',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <p style={{ color: '#6b7280', fontSize: '18px', fontWeight: '500' }}>Loading your new friend...</p>
        </div>
      </div>
    );
  }

  if (!pet) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e0f2fe 0%, #ffffff 50%, #f3e8ff 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center', maxWidth: '400px', padding: '32px' }}>
          <div style={{ fontSize: '96px', marginBottom: '24px' }}>🐾</div>
          <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px' }}>Pet Not Found</h2>
          <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '32px', lineHeight: '1.6' }}>
            The furry friend you're looking for doesn't exist or has been adopted already.
          </p>
          <Link 
            to="/browse" 
            style={{
              background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
              color: 'white',
              padding: '12px 32px',
              borderRadius: '9999px',
              fontWeight: '600',
              textDecoration: 'none',
              display: 'inline-block',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease'
            }}
          >
            Find Other Pets
          </Link>
        </div>
      </div>
    );
  }

  const images = getPetImages();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e0f2fe 0%, #ffffff 50%, #f3e8ff 100%)'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>

        {/* Main Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '48px',
          paddingTop: '32px',
          paddingBottom: '64px'
        }}>
          {/* Left: Image Gallery */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                aspectRatio: '3/4',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
                background: 'white',
                maxWidth: '450px',
                margin: '0 auto',
                position: 'relative'
              }}>
                <img
                  src={images[currentImageIndex]}
                  alt={`${pet.name} - Image ${currentImageIndex + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'center',
                    imageRendering: 'crisp-edges',
                    transition: 'transform 0.7s ease',
                    filter: 'none'
                  }}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1600&h=1200&fit=crop&crop=center&q=95';
                  }}
                />
                
                {/* Favorite Button - Back in top right corner */}
                <button
                  onClick={handleFavouriteClick}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    width: '40px',
                    height: '40px',
                    background: 'rgba(255,255,255,0.95)',
                    borderRadius: '50%',
                    border: '2px solid #e5e7eb',
                    boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(8px)',
                    zIndex: 10
                  }}
                >
                  {isFavourite(pet._id) ? '❤️' : '🤍'}
                </button>
                
                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex(prev => 
                        prev === 0 ? images.length - 1 : prev - 1
                      )}
                      style={{
                        position: 'absolute',
                        left: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '40px',
                        height: '40px',
                        background: 'rgba(255,255,255,0.9)',
                        backdropFilter: 'blur(8px)',
                        borderRadius: '50%',
                        border: 'none',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0,
                        transition: 'all 0.3s ease',
                        zIndex: 5
                      }}
                    >
                      ‹
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex(prev => 
                        prev === images.length - 1 ? 0 : prev + 1
                      )}
                      style={{
                        position: 'absolute',
                        right: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '40px',
                        height: '40px',
                        background: 'rgba(255,255,255,0.9)',
                        backdropFilter: 'blur(8px)',
                        borderRadius: '50%',
                        border: 'none',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0,
                        transition: 'all 0.3s ease',
                        zIndex: 5
                      }}
                    >
                      ›
                    </button>
                  </>
                )}
              </div>
            </div>
            
            {images.length > 1 && (
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                       style={{
                       width: '70px',
                       height: '56px',
                       borderRadius: '12px',
                       overflow: 'hidden',
                       border: index === currentImageIndex ? '3px solid #27AE60' : '2px solid #e5e7eb',
                       cursor: 'pointer',
                       opacity: index === currentImageIndex ? 1 : 0.7,
                       transition: 'all 0.3s ease'
                     }}
                  >
                    <img
                      src={image}
                      alt={`${pet.name} thumbnail ${index + 1}`}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        objectPosition: 'center',
                        imageRendering: 'crisp-edges',
                        filter: 'none'
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Pet Information */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Header */}
            <div>
              <h1 style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: '16px',
                lineHeight: '1.1'
              }}>
                {pet.name}
              </h1>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {[
                                { label: getAgeText(pet.age), color: '#E6E8FF', textColor: '#27AE60' },
              { label: `${pet.gender} ${pet.gender === 'Male' ? '♂' : '♀'}`, color: '#f3e8ff', textColor: '#27AE60' },
                  { label: pet.breed, color: '#dbeafe', textColor: '#1e40af' }
                ].map((tag, index) => (
                  <span key={index} style={{
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    fontSize: '14px',
                    fontWeight: '600',
                    background: tag.color,
                    color: tag.textColor
                  }}>
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {[
                { label: 'Species', value: pet.species, icon: '🐾' },
                { label: 'Size', value: pet.size, icon: '📏' },
                { label: 'Color', value: pet.color, icon: '🎨' },
                { label: 'Location', value: pet.location.city, icon: '📍' }
              ].map((stat, index) => (
                <div key={index} style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  transition: 'box-shadow 0.3s ease'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '24px' }}>{stat.icon}</span>
                    <div>
                      <p style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500', margin: '0 0 4px 0' }}>{stat.label}</p>
                      <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', margin: '0' }}>{stat.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* About Section */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '32px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>💫</span> About {pet.name}
              </h3>
              <p style={{
                fontSize: '18px',
                lineHeight: '1.6',
                color: '#374151',
                margin: '0'
              }}>
                {pet.description}
              </p>
            </div>

            {/* Personality */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '32px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>🌟</span> Personality & Behavior
              </h3>
              <p style={{
                fontSize: '18px',
                lineHeight: '1.6',
                color: '#374151',
                margin: '0'
              }}>
                {pet.behaviour}
              </p>
            </div>

            {/* Health Cards */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '32px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>🏥</span> Health & Care
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                {[
                  { 
                    label: 'Health Status', 
                    value: pet.healthStatus,
                    color: {
                          'Excellent': { bg: '#E6E8FF', text: '#27AE60', border: '#C7D2FE' },
    'Good': { bg: '#dbeafe', text: '#1e40af', border: '#bfdbfe' },
    'Fair': { bg: '#fef3c7', text: '#92400e', border: '#fde68a' }
  }[pet.healthStatus] || { bg: '#fee2e2', text: '#991b1b', border: '#fecaca' }
                  },
                                      { 
                      label: 'Vaccinated',
                      value: pet.vaccinated ? 'Yes' : 'No',
                      color: pet.vaccinated ? 
                      { bg: '#E6E8FF', text: '#27AE60', border: '#C7D2FE' } :
                      { bg: '#fee2e2', text: '#991b1b', border: '#fecaca' }
                    },
                    { 
                      label: 'Spayed/Neutered',
                      value: pet.spayedNeutered ? 'Yes' : 'No',
                      color: pet.spayedNeutered ? 
                      { bg: '#E6E8FF', text: '#27AE60', border: '#C7D2FE' } :
                      { bg: '#fee2e2', text: '#991b1b', border: '#fecaca' }
                    }
                ].map((health, index) => (
                  <div key={index} style={{
                    padding: '16px',
                    borderRadius: '12px',
                    border: `2px solid ${health.color.border}`,
                    textAlign: 'center',
                    background: health.color.bg,
                    color: health.color.text
                  }}>
                    <p style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', margin: '0 0 4px 0' }}>{health.label}</p>
                    <p style={{ fontSize: '18px', fontWeight: 'bold', margin: '0' }}>{health.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Shelter Info */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '32px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>🏠</span> Shelter Information
              </h3>
              <div style={{
                background: '#f9fafb',
                borderRadius: '12px',
                padding: '24px'
              }}>
                <h4 style={{ fontWeight: 'bold', fontSize: '20px', color: '#1f2937', margin: '0 0 12px 0' }}>
                  {pet.shelter.name}
                </h4>
                {pet.shelter.contact && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {pet.shelter.contact.phone && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#6b7280' }}>
                        <span>📞</span>
                        <span style={{ fontWeight: '500' }}>{pet.shelter.contact.phone}</span>
                      </div>
                    )}
                    {pet.shelter.contact.email && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#6b7280' }}>
                        <span>📧</span>
                        <span style={{ fontWeight: '500' }}>{pet.shelter.contact.email}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Adoption CTA */}
            <div style={{
              background: 'linear-gradient(135deg, #27AE60 0%, #219653 100%)',
              borderRadius: '16px',
              padding: '32px',
              color: 'white',
              boxShadow: '0 25px 50px rgba(0,0,0,0.15)'
            }}>
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <p style={{ color: '#d1fae5', margin: '0 0 8px 0', fontWeight: '500' }}>Adoption Fee</p>
                <p style={{ fontSize: '48px', fontWeight: 'bold', margin: '0 0 12px 0' }}>₹{pet.adoptionFee}</p>
                <span style={{
                  display: 'inline-block',
                  background: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(8px)',
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                  {pet.adoptionStatus}
                </span>
              </div>
              
              {pet.adoptionStatus === 'Available' && (
                <button 
                  onClick={handleAdoptClick}
                  style={{
                    width: '100%',
                    background: 'white',
                    color: '#27AE60',
                    border: 'none',
                    padding: '16px',
                    borderRadius: '12px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Adopt {pet.name} Today! 🎉
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Login Modal */}
        {showLoginPrompt && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '16px'
          }} onClick={() => setShowLoginPrompt(false)}>
            <div style={{
              background: 'white',
              borderRadius: '24px',
              padding: '32px',
              maxWidth: '400px',
              width: '100%',
              textAlign: 'center',
              boxShadow: '0 25px 50px rgba(0,0,0,0.2)'
            }} onClick={e => e.stopPropagation()}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '96px', marginBottom: '16px' }}>🔐</div>
                <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', marginBottom: '12px' }}>Login Required</h3>
                <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '32px', lineHeight: '1.5' }}>
                  Please login to start the adoption process for {pet.name}.
                </p>
                <div style={{ display: 'flex', gap: '16px' }}>
                                      <Link 
                      to="/login"
                      style={{
                        flex: 1,
                        background: 'linear-gradient(135deg, #27AE60 0%, #219653 100%)',
                        color: 'white',
                        padding: '12px 24px',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        fontWeight: '600',
                        fontSize: '14px',
                        textAlign: 'center'
                      }}
                    >
                      Login
                    </Link>
                  <button 
                    onClick={() => setShowLoginPrompt(false)}
                    style={{
                      flex: 1,
                      background: '#f3f4f6',
                      color: '#374151',
                      border: 'none',
                      padding: '12px 24px',
                      borderRadius: '12px',
                      fontWeight: '600',
                      fontSize: '14px',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PetDetails;