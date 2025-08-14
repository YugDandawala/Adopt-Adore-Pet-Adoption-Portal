const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true,
    min: 0
  },
  breed: {
    type: String,
    required: true,
    trim: true
  },
  species: {
    type: String,
    required: true,
    enum: ['Dog', 'Cat', 'Turtle', 'Fish', 'Rabbit']
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female']
  },
  size: {
    type: String,
    required: true,
    enum: ['Small', 'Medium', 'Large']
  },
  color: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  behaviour: {
    type: String,
    required: true,
    maxlength: 500
  },
  healthStatus: {
    type: String,
    required: true,
    enum: ['Excellent', 'Good', 'Fair', 'Needs Attention']
  },
  vaccinated: {
    type: Boolean,
    default: false
  },
  spayedNeutered: {
    type: Boolean,
    default: false
  },
  location: {
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zipCode: {
      type: String,
      required: true
    }
  },
  photos: [{
    type: String, // URL to the image
    required: true
  }],
  adoptionStatus: {
    type: String,
    enum: ['Available', 'Pending', 'Adopted'],
    default: 'Available'
  },
  adoptionFee: {
    type: Number,
    required: true,
    min: 0
  },
  shelter: {
    name: {
      type: String,
      required: true
    },
    contact: {
      phone: String,
      email: String
    }
  },
  dateAdded: {
    type: Date,
    default: Date.now
  },
  favorites: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for search functionality
petSchema.index({ name: 'text', breed: 'text', description: 'text' });

module.exports = mongoose.model('Pet', petSchema);