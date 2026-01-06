//requir mogose library
const mongoose=require('mongoose');

//creat the mongoose schema
const memberShema = new mongoose.Schema({
     firstName: {
    type: String,
    required: true,
    trim: true
  },
    lastName:{
        type: String,
        required: true,
        trim: true
    },
  gender: {
    enum: ["Male","Female"],
    required: true
  },
  dateOfBirth:{
    type:Date,
  required:true
  },
  image:{
type: String,
required:true}
})

//initialize the mogose model
const Member = mongoose.model('Member',memberShema)

//export the model
module.exports = Member;

