const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Import routes
const petRoutes = require('./routes/pets');
const userRoutes = require('./routes/users');
const adoptionRoutes = require('./routes/adoptions');

// Import database config
const { fixAdoptionStatuses } = require('./config/database');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('uploads')); // For serving uploaded images

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/petadoption', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('MongoDB connected successfully');
  // Fix any existing pending adoptions
  await fixAdoptionStatuses();
})
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/pets', petRoutes);
app.use('/api/users', userRoutes);
app.use('/api/adoptions', adoptionRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ message: 'Pet Adoption API is running!' });
});

// Error handling middleware
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});