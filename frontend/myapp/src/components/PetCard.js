import React from 'react';
import { Link } from 'react-router-dom';

const PetCard = ({ pet, onToggleFavourite, isFavourite }) => {
  const handleFavouriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavourite(pet);
  };

  const getAgeText = (age) => {
    if (age < 1) return `${Math.round(age * 12)} months`;
    return age === 1 ? '1 year' : `${age} years`;
  };

  const getPrimaryImage = () => {
    if (pet.photos && pet.photos.length > 0) {
      return pet.photos[0];
    }
    // Fallback images based on species
    const fallbackImages = {
      Dog: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&h=600&fit=crop&crop=center&q=95',
      Cat: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=600&fit=crop&crop=center&q=95',
      Turtle: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=800&h=600&fit=crop&crop=center&q=95',
      Fish: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=800&h=600&fit=crop&crop=center&q=95',
      Rabbit: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=800&h=600&fit=crop&crop=center&q=95',
      Bird: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=800&h=600&fit=crop&crop=center&q=95',
      Other: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=600&fit=crop&crop=center&q=95'
    };
    return fallbackImages[pet.species] || fallbackImages.Other;
  };

  return (
    <div className="pet-card">
      <Link to={`/pet/${pet._id}`} className="pet-card-link">
        <div className="pet-card-image-container">
          <img 
            src={getPrimaryImage()} 
            alt={pet.name}
            className="pet-card-image"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=600&fit=crop&crop=center&q=95';
            }}
          />
          <button 
            className={`favourite-btn ${isFavourite ? 'favourite-active' : ''}`}
            onClick={handleFavouriteClick}
            aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
          >
            <span className="heart-icon">
              {isFavourite ? '❤️' : '🤍'}
            </span>
          </button>
          <div className="pet-card-badges">
            <span className="species-badge">{pet.species}</span>
            {pet.vaccinated && <span className="vaccinated-badge">Vaccinated</span>}
          </div>
        </div>

        <div className="pet-card-content">
          <div className="pet-card-header">
            <h3 className="pet-name">{pet.name}</h3>
            <div className="pet-age-gender">
              <span className="pet-age">{getAgeText(pet.age)}</span>
              <span className="pet-gender-icon">
                {pet.gender === 'Male' ? '♂️' : '♀️'}
              </span>
            </div>
          </div>

          <div className="pet-details">
            <div className="pet-detail-item">
              <span className="detail-label">Breed:</span>
              <span className="detail-value">{pet.breed}</span>
            </div>
            <div className="pet-detail-item">
              <span className="detail-label">Size:</span>
              <span className="detail-value">{pet.size}</span>
            </div>
            <div className="pet-detail-item">
              <span className="detail-label">Location:</span>
              <span className="detail-value">{pet.location.city}, {pet.location.state}</span>
            </div>
          </div>

          <div className="pet-description">
            <p className="pet-description-text">
              {pet.description.length > 100 
                ? `${pet.description.substring(0, 100)}...` 
                : pet.description
              }
            </p>
          </div>

          <div className="pet-card-footer">
            <div className="adoption-fee">
              <span className="fee-label">Adoption Fee:</span>
              <span className="fee-amount">₹{pet.adoptionFee}</span>
            </div>
            <button className="adopt-btn">
              View Details
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PetCard;