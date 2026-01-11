//requir mongoose library ================================================================================
const mongoose = require('mongoose');

//creat the mongoose schema ===============================================================================
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


//initialize the mogose model ==============================================================================
const Personality =mongoose.model('Personality', personalitySchema);

//export the model =========================================================================================
module.exports = Personality
