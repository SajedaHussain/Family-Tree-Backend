const mongoose = require('mongoose');

const personalitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  personalityType: {
    type: String,
    required: true, 
  },
  occupation: {
    type: String,
    enum: ['Student', 'Employee', 'Unemployed', 'Other'],
    required: true,
  },
  description: String, 
}, {
  timestamps: true
});

module.exports = mongoose.model('Personality', personalitySchema);
