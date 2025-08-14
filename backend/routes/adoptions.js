const express = require('express');
const router = express.Router();
const Adoption = require('../models/Adoption');
const Pet = require('../models/Pet');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Create adoption application
router.post('/', auth, async (req, res) => {
  try {
    console.log('Adoption request body:', req.body);
    console.log('User:', req.user);
    
    const { pet, applicationData } = req.body;
    if (!pet || !applicationData) {
      console.log('Missing fields - pet:', pet, 'applicationData:', applicationData);
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    const adoption = new Adoption({
      user: req.user._id,
      pet,
      applicationData,
      status: 'Adopted' // Set adoption status to Adopted immediately
    });
    
    console.log('Creating adoption:', adoption);
    await adoption.save();
    
    // Update only this specific pet's status to Adopted
    await Pet.findByIdAndUpdate(pet, { adoptionStatus: 'Adopted' });
    
    console.log('Adoption created successfully:', adoption._id);
    res.status(201).json(adoption);
  } catch (err) {
    console.error('Adoption creation error:', err);
    
    // Check for specific validation errors
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: errors 
      });
    }
    
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


router.get('/', auth, async (req, res) => {
  try {
    const adoptions = await Adoption.find().populate('user pet');
    res.json(adoptions);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/mine', auth, async (req, res) => {
  try {
    const adoptions = await Adoption.find({ user: req.user._id }).populate('pet');
    res.json(adoptions);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const adoption = await Adoption.findById(req.params.id).populate('user pet');
    if (!adoption) {
      return res.status(404).json({ message: 'Adoption not found' });
    }
    // Only allow owner or admin
    if (adoption.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    res.json(adoption);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Pending', 'Under Review', 'Approved', 'Rejected', 'Completed', 'Adopted'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    
    const adoption = await Adoption.findById(req.params.id);
    if (!adoption) {
      return res.status(404).json({ message: 'Adoption not found' });
    }
    
    adoption.status = status;
    
    if (status === 'Adopted' || status === 'Completed') {
      await Pet.findByIdAndUpdate(adoption.pet, { adoptionStatus: 'Adopted' });
    }
    
    await adoption.save();
    
    res.json(adoption);
  } catch (err) {
    console.error('Status update error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;



