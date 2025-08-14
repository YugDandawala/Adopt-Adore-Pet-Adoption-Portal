const mongoose = require('mongoose');

const adoptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  pet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
    required: true
  },
  applicationData: {
    reason: {
      type: String,
      required: true,
      maxlength: 500
    },
    experience: {
      type: String,
      maxlength: 500
    },
    livingArrangement: {
      type: String,
      required: true,
      maxlength: 300
    },
    emergencyContact: {
      name: {
        type: String,
        required: true
      },
      phone: {
        type: String,
        required: true
      },
      relationship: {
        type: String,
        required: true
      }
    },
    references: [{
      name: String,
      phone: String,
      relationship: String
    }],
    agreedToTerms: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  status: {
    type: String,
    enum: ['Pending', 'Under Review', 'Approved', 'Rejected', 'Completed', 'Adopted'],
    default: 'Pending'
  },
  applicationDate: {
    type: Date,
    default: Date.now
  },
  reviewDate: {
    type: Date
  },
  completionDate: {
    type: Date
  },
  notes: {
    type: String,
    maxlength: 1000
  },
  reviewedBy: {
    type: String, // Admin/Staff name
    trim: true
  },
  estimatedPickupDate: {
    type: Date
  },
  actualPickupDate: {
    type: Date
  }
}, {
  timestamps: true
});

// Index for efficient queries
adoptionSchema.index({ user: 1, pet: 1 });
adoptionSchema.index({ status: 1 });
adoptionSchema.index({ applicationDate: -1 });

module.exports = mongoose.model('Adoption', adoptionSchema);