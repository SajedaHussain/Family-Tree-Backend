//requir mogose library
const mongoose=require('mongoose');

//creat the mongoose schema
const duckShema = new mongoose.Schema({
     firstName: {
    type: String,
    required: true,
  },
    lastName:{
        type: String,
        required: true
    },
  gender: {
    type: Enum,
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
const Duck = mongoose.model('Duck',duckShema)

//export the model
module.exports = Duck;

