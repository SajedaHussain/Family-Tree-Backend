//requir mogose library
const mongoose = require('mongoose');

//creat the mongoose schema
const memberShema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  gender: {
    enum: ["Male", "Female" , "Parents"],
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  generation: {
    type: Number,
    min: 1, // رقم الجيل اذا1 الجد اذا 2 الاب اذا 3 الاولاد 
    required: true
  },
  // 1.نربط الشجره بالعائله لنستخدم المكتبه 
  treeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tree',
    required: true
  },

  // 2. ربط الشخص بوالده 
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Duck',
    default: null //اذا اخترنا null يكون الجد 
  }
})

//initialize the mogose model
const Member = mongoose.model('Member', memberShema)

//export the model
module.exports = Member;

