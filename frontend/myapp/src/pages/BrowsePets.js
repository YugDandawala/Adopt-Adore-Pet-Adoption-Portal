import React, { useState, useEffect } from 'react';
import PetCard from '../components/PetCard';

const BrowsePets = ({ toggleFavourite, isFavourite }) => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    species: 'all',
    age: 'all',
    size: 'all',
    gender: 'all',
    location: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  
  // Get saved page from localStorage or default to 1
  const savedPage = parseInt(localStorage.getItem('browsePetsPage')) || 1;
  const [pagination, setPagination] = useState({
    currentPage: savedPage,
    totalPages: 1,
    totalPets: 0
  });
  const [availableSpecies] = useState(['Dog', 'Cat', 'Turtle', 'Fish', 'Rabbit']);

  // Remove the fetchAvailableSpecies useEffect since we have static species

  useEffect(() => {
    fetchPets();
  }, [filters, searchTerm, pagination.currentPage]);


  const fetchPets = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: pagination.currentPage,
        limit: 12,
        ...filters,
        ...(searchTerm && { search: searchTerm })
      });

      const response = await fetch(`http://localhost:5000/api/pets?${queryParams}`);
      const data = await response.json();
      
      setPets(data.pets);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching pets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const clearFilters = () => {
    setFilters({
      species: 'all',
      age: 'all',
      size: 'all',
      gender: 'all',
      location: ''
    });
    setSearchTerm('');
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, currentPage: newPage }));
    // Save current page to localStorage
    localStorage.setItem('browsePetsPage', newPage.toString());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="browse-pets-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Browse Pets</h1>
          <p className="page-subtitle">
            Find your perfect companion from our loving pets waiting for homes
          </p>
        </div>

        {/* Search Bar */}
        <div className="search-section">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search pets by name, breed, or description..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
            <button className="search-btn">
              🔍
            </button>
          </div>
        </div>

        <div className="browse-content">
          {/* Filters Sidebar */}
          <div className="filters-sidebar">
            <div className="filters-header">
              <h3 className="filters-title">Filters</h3>
              <button className="clear-filters-btn" onClick={clearFilters}>
                Clear All
              </button>
            </div>

            <div className="filter-group">
              <label className="filter-label">Species</label>
              <select
                value={filters.species}
                onChange={(e) => handleFilterChange('species', e.target.value)}
                className="filter-select"
              >
                <option value="all">All Species</option>
                {availableSpecies.map(species => (
                  <option key={species} value={species}>{species}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Age</label>
              <select
                value={filters.age}
                onChange={(e) => handleFilterChange('age', e.target.value)}
                className="filter-select"
              >
                <option value="all">All Ages</option>
                <option value="young">Young (0-2 years)</option>
                <option value="adult">Adult (3-7 years)</option>
                <option value="senior">Senior (8+ years)</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Size</label>
              <select
                value={filters.size}
                onChange={(e) => handleFilterChange('size', e.target.value)}
                className="filter-select"
              >
                <option value="all">All Sizes</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Gender</label>
              <select
                value={filters.gender}
                onChange={(e) => handleFilterChange('gender', e.target.value)}
                className="filter-select"
              >
                <option value="all">All Genders</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Location</label>
              <input
                type="text"
                placeholder="Enter city name..."
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="filter-input"
              />
            </div>

            {/* Filter Summary */}
            <div className="filter-summary">
              <p className="results-count">
                {pagination.totalPets} pets found
              </p>
            </div>
          </div>

          {/* Pets Grid */}
          <div className="pets-section">
            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading pets...</p>
              </div>
            ) : pets.length === 0 ? (
              <div className="no-results">
                <div className="no-results-icon">🐾</div>
                <h3>No pets found</h3>
                <p>Try adjusting your filters or search terms to find more pets.</p>
                <button className="btn btn-primary" onClick={clearFilters}>
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className={`pets-grid ${pets.length <= 2 ? 'few-pets' : ''}`}>
                  {pets.map(pet => (
                    <PetCard
                      key={pet._id}
                      pet={pet}
                      onToggleFavourite={toggleFavourite}
                      isFavourite={isFavourite(pet._id)}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="pagination">
                    <button
                      className="pagination-btn"
                      onClick={() => handlePageChange(pagination.currentPage - 1)}
                      disabled={pagination.currentPage === 1}
                    >
                      Previous
                    </button>
                    
                    <div className="pagination-numbers">
                      {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                        .filter(page => 
                          page === 1 || 
                          page === pagination.totalPages || 
                          Math.abs(page - pagination.currentPage) <= 2
                        )
                        .map((page, index, array) => (
                          <React.Fragment key={page}>
                            {index > 0 && array[index - 1] !== page - 1 && (
                              <span className="pagination-ellipsis">...</span>
                            )}
                            <button
                              className={`pagination-number ${
                                page === pagination.currentPage ? 'active' : ''
                              }`}
                              onClick={() => handlePageChange(page)}
                            >
                              {page}
                            </button>
                          </React.Fragment>
                        ))
                      }
                    </div>

                    <button
                      className="pagination-btn"
                      onClick={() => handlePageChange(pagination.currentPage + 1)}
                      disabled={pagination.currentPage === pagination.totalPages}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowsePets;