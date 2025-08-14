import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BrowsePets from './pages/BrowsePets';
import PetDetails from './components/PetDetails';
import Favourites from './pages/Favourites';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdoptionForm from './components/AdoptionForm';
import ConfirmationPage from './components/ConfirmationPage';
import './styles/App.css';

function App() {
  const [favourites, setFavourites] = useState([]);
  const [user, setUser] = useState(null);

  // Load favourites and user from localStorage on component mount
  useEffect(() => {
    const savedFavourites = JSON.parse(localStorage.getItem('favourites') || '[]');
    setFavourites(savedFavourites);
    
    const savedUser = JSON.parse(localStorage.getItem('user') || 'null');
    const savedToken = localStorage.getItem('token');
    
    if (savedUser && savedToken) {
      setUser(savedUser);
    }
  }, []);

  // Add/remove pet from favourites
  const toggleFavourite = (pet) => {
    const isAlreadyFavourite = favourites.some(fav => fav._id === pet._id);
    let updatedFavourites;

    if (isAlreadyFavourite) {
      updatedFavourites = favourites.filter(fav => fav._id !== pet._id);
    } else {
      updatedFavourites = [...favourites, pet];
    }

    setFavourites(updatedFavourites);
    localStorage.setItem('favourites', JSON.stringify(updatedFavourites));

    // Update server-side favorite count
    fetch(`http://localhost:5000/api/pets/${pet._id}/favorite`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: isAlreadyFavourite ? 'remove' : 'add'
      })
    }).catch(error => console.error('Error updating favourite:', error));
  };

  // Check if pet is in favourites
  const isFavourite = (petId) => {
    return favourites.some(fav => fav._id === petId);
  };

  // Handle user login
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Handle user logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('favourites');
    setFavourites([]);
  };

  return (
    <Router>
      <div className="App">
        <Navbar user={user} onLogout={handleLogout} />
        <main className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  toggleFavourite={toggleFavourite}
                  isFavourite={isFavourite}
                />
              } 
            />
            <Route 
              path="/browse" 
              element={
                <BrowsePets 
                  toggleFavourite={toggleFavourite}
                  isFavourite={isFavourite}
                />
              } 
            />
            <Route 
              path="/pet/:id" 
              element={
                <PetDetails 
                  toggleFavourite={toggleFavourite}
                  isFavourite={isFavourite}
                  user={user}
                />
              } 
            />
            <Route 
              path="/favourites" 
              element={
                <Favourites 
                  favourites={favourites}
                  toggleFavourite={toggleFavourite}
                />
              } 
            />
            <Route path="/about" element={<About />} />
            <Route 
              path="/login" 
              element={<Login onLogin={handleLogin} />} 
            />
            <Route 
              path="/signup" 
              element={<Signup onLogin={handleLogin} />} 
            />
            <Route 
              path="/adopt/:petId" 
              element={<AdoptionForm user={user} />} 
            />
            <Route 
              path="/confirmation/:adoptionId" 
              element={<ConfirmationPage />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;