const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;
    console.log('Registration attempt for email:', email);
    
    // Validate required fields
    if (!name || !email || !password || !mobile) {
      console.log('Missing required fields');
      return res.status(400).json({ message: 'Please fill all required fields: name, email, password, and mobile' });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      console.log('User already exists');
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Create new user with all required fields
    user = new User({ 
      name, 
      email, 
      password,
      mobile
    });
    
    console.log('Saving new user...');
    await user.save();
    console.log('User saved successfully');
    
    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '7d' });
    
    // Return user data without password
    const userResponse = { ...user.toObject() };
    delete userResponse.password;
    
    console.log('Registration successful for user:', user.email);
    res.status(201).json({ 
      token, 
      user: userResponse,
      message: 'User registered successfully'
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for email:', email);
    
    if (!email || !password) {
      console.log('Missing email or password');
      return res.status(400).json({ message: 'Please provide email and password' });
    }
    
    // Find user by email
    const user = await User.findOne({ email });
    console.log('User found:', user ? 'Yes' : 'No');
    if (!user) {
      console.log('User not found');
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    
    // Check password
    console.log('Comparing passwords...');
    const isMatch = await user.comparePassword(password);
    console.log('Password match:', isMatch);
    if (!isMatch) {
      console.log('Password does not match');
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    
    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '7d' });
    
    // Return user data without password
    const userResponse = { ...user.toObject() };
    delete userResponse.password;
    
    console.log('Login successful for user:', user.email);
    res.json({ 
      token, 
      user: userResponse,
      message: 'Login successful'
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    const userResponse = { ...req.user.toObject() };
    delete userResponse.password;
    res.json({ user: userResponse });
  } catch (err) {
    console.error('Get user error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get current user profile
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (err) {
    console.error('Get user profile error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

