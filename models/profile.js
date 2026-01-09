const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  tree_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tree',
  },
  bio: String,
  personalityType: String, 
}, {
  timestamps: true
});

module.exports = mongoose.model('Profile', profileSchema);
