import React from 'react';
import { Link } from 'react-router-dom';
import PetCard from '../components/PetCard';

const Favourites = ({ favourites, toggleFavourite }) => {
  const isFavourite = (petId) => {
    return favourites.some(fav => fav._id === petId);
  };

  return (
    <div className="favourites-page" style={{ minHeight: '100vh', background: '#f4fbf6', padding: '40px 0' }}>
      <div className="container">
        <div className="page-header" style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 className="page-title" style={{ fontSize: '42px', fontWeight: '800', color: '#27AE60', marginBottom: '12px' }}>
            Your Favourite Pets
          </h1>
          <p className="page-subtitle" style={{ fontSize: '18px', color: '#666', marginBottom: '24px' }}>
            Keep track of the pets you're interested in adopting
          </p>
          {favourites.length > 0 && (
            <div style={{ 
              background: 'linear-gradient(135deg, #27AE60 0%, #219653 100%)', 
              color: 'white', 
              padding: '12px 24px', 
              borderRadius: '25px', 
              display: 'inline-block',
              fontSize: '16px',
              fontWeight: '600',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
            }}>
              You have {favourites.length} favourite pet{favourites.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>

        {favourites.length === 0 ? (
          <div className="empty-favourites" style={{ 
            textAlign: 'center', 
            padding: '80px 20px',
            background: 'white',
            borderRadius: '20px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            <div className="empty-icon" style={{ 
              fontSize: '80px', 
              marginBottom: '24px',
              filter: 'grayscale(1)',
              opacity: '0.6'
            }}>💔</div>
            <h3 style={{ 
              fontSize: '28px', 
              fontWeight: '700', 
              color: '#333', 
              marginBottom: '16px' 
            }}>No favourites yet</h3>
            <p style={{ 
              fontSize: '16px', 
              color: '#666', 
              marginBottom: '32px',
              lineHeight: '1.6'
            }}>
              Start browsing pets and click the heart icon to add them to your favourites!
            </p>
            <Link to="/browse" style={{
              background: 'linear-gradient(135deg, #27AE60 0%, #219653 100%)',
              color: 'white',
              padding: '14px 32px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '16px',
              display: 'inline-block',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
              transition: 'all 0.3s ease'
            }}>
              Browse Pets
            </Link>
          </div>
        ) : (
          <div className={`pets-grid ${favourites.length <= 2 ? 'few-pets' : ''}`} style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
            gap: '32px',
            marginTop: '32px'
          }}>
            {favourites.map(pet => (
              <div key={pet._id} style={{
                background: 'white',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                transition: 'all 0.3s ease',
                border: '1px solid rgba(0,0,0,0.05)'
              }}>
                <PetCard
                  pet={pet}
                  onToggleFavourite={toggleFavourite}
                  isFavourite={isFavourite(pet._id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourites;