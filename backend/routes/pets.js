const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');

router.get('/', async (req, res) => {
  try {
    const {
      species,
      breed,
      age,
      size,
      gender,
      location,
      adoptionStatus,
      page = 1,
      limit = 12,
      search
    } = req.query;

    // Build filter object - don't filter by adoptionStatus by default to show all pets
    const filter = {};
    if (adoptionStatus) filter.adoptionStatus = adoptionStatus;
    if (species && species !== 'all') filter.species = species;
    if (breed && breed !== 'all') filter.breed = new RegExp(breed, 'i');
    if (size && size !== 'all') filter.size = size;
    if (gender && gender !== 'all') filter.gender = gender;
    if (location) filter['location.city'] = new RegExp(location, 'i');
    // Age filtering
    if (age) {
      switch (age) {
        case 'young':
          filter.age = { $lte: 2 };
          break;
        case 'adult':
          filter.age = { $gte: 3, $lte: 7 };
          break;
        case 'senior':
          filter.age = { $gte: 8 };
          break;
      }
    }
    // Search functionality
    if (search) {
      filter.$text = { $search: search };
    }

    // Get all pets that match the filter
    const allPets = await Pet.find(filter).sort({ dateAdded: -1 });
    const totalPets = allPets.length;

    // Use standard pagination for all cases
    const petsPerPage = parseInt(limit);
    const totalPages = Math.ceil(totalPets / petsPerPage);
    const currentPage = parseInt(page);
    const skip = (currentPage - 1) * petsPerPage;
    
    const selectedPets = allPets.slice(skip, skip + petsPerPage);

    res.json({
      pets: selectedPets,
      pagination: {
        currentPage: currentPage,
        totalPages: totalPages,
        totalPets: totalPets,
        hasMore: currentPage < totalPages,
        petsPerPage: petsPerPage
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pets', error: error.message });
  }
});

// GET single pet by ID
router.get('/:id', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pet', error: error.message });
  }
});

// GET featured pets for home page
router.get('/featured/home', async (req, res) => {
  try {
    const featuredPets = await Pet.find({ adoptionStatus: 'Available' })
      .sort({ favorites: -1, dateAdded: -1 })
      .limit(8);
    
    res.json(featuredPets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching featured pets', error: error.message });
  }
});

// POST new pet (for admin use)
router.post('/', async (req, res) => {
  try {
    const pet = new Pet(req.body);
    await pet.save();
    res.status(201).json({ message: 'Pet added successfully', pet });
  } catch (error) {
    res.status(400).json({ message: 'Error adding pet', error: error.message });
  }
});

// UPDATE pet favorite count
router.patch('/:id/favorite', async (req, res) => {
  try {
    const { action } = req.body; // 'add' or 'remove'
    const increment = action === 'add' ? 1 : -1;
    
    const pet = await Pet.findByIdAndUpdate(
      req.params.id,
      { $inc: { favorites: increment } },
      { new: true }
    );
    
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    
    res.json({ message: 'Favorite updated', favorites: pet.favorites });
  } catch (error) {
    res.status(500).json({ message: 'Error updating favorite', error: error.message });
  }
});

// GET pets by species for filtering
router.get('/filter/species', async (req, res) => {
  try {
    const species = await Pet.distinct('species', { adoptionStatus: 'Available' });
    res.json(species);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching species', error: error.message });
  }
});

// GET breeds by species
router.get('/filter/breeds/:species', async (req, res) => {
  try {
    const breeds = await Pet.distinct('breed', { 
      species: req.params.species,
      adoptionStatus: 'Available'
    });
    res.json(breeds);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching breeds', error: error.message });
  }
});

module.exports = router;