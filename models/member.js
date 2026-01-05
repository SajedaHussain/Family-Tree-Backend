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
    type: String,
    required: true
  },
  dateOfBirth:{
    type:String,
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

