//requir mongoose library
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
  relation: {
    type: String,
    enum: ["Grandparents","Parents","Son","Daughter"],
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  image: {
    type: String,
   /* required: true*/
  },
  generation: {
    type: Number,
    min: 1, // رقم الجيل اذا1 الجد اذا 2 الاب اذا 3 الاولاد 
    required: true
  },
  // 1.ناخذ الايدي مالت الشجرة و نستخدمها في الاسكيمامالت الممبر لان في ربط بينهم بالريفرينس 
  tree_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tree',
    required: true
  },
  // 2. ربط الشخص بوالده و نخليه يرتبط باشخاص في نفس السكيما  
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
    default: null //اذا اخترنا null يكون الجد 
  }
})

//initialize the mogose model
const Member = mongoose.model('Member', memberShema)

//export the model
module.exports = Member;

