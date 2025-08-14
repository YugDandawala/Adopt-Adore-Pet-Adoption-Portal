import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PetCard from '../components/PetCard';

const Home = ({ toggleFavourite, isFavourite }) => {
  const [featuredPets, setFeaturedPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPets: 0,
    adopted: 0,
    shelters: 15
  });

  useEffect(() => {
    fetchFeaturedPets();
    fetchStats();
  }, []);

  const fetchFeaturedPets = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/pets');
      const data = await response.json();
      // Get 5 random pets from all available pets
      const shuffled = data.pets.sort(() => 0.5 - Math.random());
      setFeaturedPets(shuffled.slice(0, 5));
    } catch (error) {
      console.error('Error fetching featured pets:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/pets?limit=1');
      const data = await response.json();
      setStats(prev => ({
        ...prev,
        totalPets: data.pagination?.totalPets || 0
      }));
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content" style={{ marginLeft: '60px' }}>
          <div className="hero-text">
            <h1 className="hero-title">
              Find Your Perfect
              <span className="highlight"> Friend</span>
            </h1>
            <p className="hero-description">
              Discover loving pets waiting for their forever homes. Our mission is to connect 
              caring families with pets in need of love and care. Every adoption saves a life 
              and brings joy to both pet and family.
            </p>
            <div className="hero-buttons">
              <Link to="/browse" className="btn btn-primary btn-large">
                Browse Pets
              </Link>
              <Link to="/about" className="btn btn-secondary btn-large">
                Learn More
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-pets-grid">
              <div className="hero-pet-card">
                <img src="https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=400&h=350&fit=crop" alt="Happy dog" className="hero-pet-img" style={{ transition: 'transform 0.3s ease-in-out' }} />
              </div>
              <div className="hero-pet-card">
                <img src="https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=400&h=350&fit=crop" alt="Cute cat" className="hero-pet-img" style={{ transition: 'transform 0.3s ease-in-out' }} />
              </div>
              <div className="hero-pet-card">
                <img src="https://images.pexels.com/photos/58997/pexels-photo-58997.jpeg?auto=compress&cs=tinysrgb&w=400&h=350&fit=crop" alt="Cute dog" className="hero-pet-img" style={{ transition: 'transform 0.3s ease-in-out' }} />
              </div>
              <div className="hero-pet-card">
                <img src="https://images.pexels.com/photos/1056251/pexels-photo-1056251.jpeg?auto=compress&cs=tinysrgb&w=400&h=350&fit=crop" alt="Friendly cat" className="hero-pet-img" style={{ transition: 'transform 0.3s ease-in-out' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">🐕</div>
              <div className="stat-number">{stats.totalPets}+</div>
              <div style={{color: 'white', fontSize: '1.2rem', fontWeight: 'bold'}} className="stat-label">Pets Available</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🏠</div>
              <div className="stat-number">5+</div>
              <div style={{color: 'white', fontSize: '1.2rem', fontWeight: 'bold'}} className="stat-label">Partner Shelters</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⭐</div>
              <div className="stat-number">24/7</div>
              <div style={{color: 'white', fontSize: '1.2rem', fontWeight: 'bold'}} className="stat-label">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Pets Section */}
      <section className="featured-pets-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Pets</h2>
            <p className="section-subtitle">
              Meet some of our adorable pets looking for loving homes
            </p>
          </div>

          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading our adorable pets...</p>
            </div>
          ) : (
            <div className="home-pets-grid">
              {featuredPets.map(pet => (
                <PetCard
                  key={pet._id}
                  pet={pet}
                  onToggleFavourite={toggleFavourite}
                  isFavourite={isFavourite(pet._id)}
                />
              ))}
            </div>
          )}

          <div className="section-footer">
            <Link to="/browse" className="btn btn-primary">
              View All Pets
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">How Pet Adoption Works</h2>
            <p className="section-subtitle">
              Simple steps to find and adopt your perfect companion
            </p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-icon">🔍</div>
              <h3 className="step-title">Browse Pets</h3>
              <p className="step-description">
                Explore our database of loving pets waiting for homes. Filter by type, 
                age, size, and location to find your perfect match.
              </p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-icon">📝</div>
              <h3 className="step-title">Apply to Adopt</h3>
              <p className="step-description">
                Fill out our simple adoption application with your details and 
                preferences. We'll review it within 24 hours.
              </p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-icon">🏠</div>
              <h3 className="step-title">Meet & Take Home</h3>
              <p className="step-description">
                Meet your potential pet, and if it's a good match, complete the 
                adoption process and welcome your new family member home!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Change a Life?</h2>
            <p className="cta-description">
              Every pet deserves a loving home. Start your adoption journey today 
              and make a difference in a pet's life while gaining a loyal companion.
            </p>
            <div className="cta-buttons">
              <Link to="/browse" className="btn btn-primary btn-large">
                Start Adopting
              </Link>
              <Link to="/about" className="btn btn-outline btn-large">
                Learn About Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;