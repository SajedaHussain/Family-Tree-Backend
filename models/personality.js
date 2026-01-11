const mongoose = require('mongoose');

const personalitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  personalityType: {
    type: String,
    required: true, 
    // enum: [
    //         "INTJ", "INTP", "ENTJ", "ENTP",
    //         "INFJ", "INFP", "ENFJ", "ENFP",
    //         "ISTJ", "ISFJ", "ESTJ", "ESFJ",
    //         "ISTP", "ISFP", "ESTP", "ESFP"
    //     ]
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
