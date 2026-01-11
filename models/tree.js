//requir mongoose library =================================================================================
const mongoose = require('mongoose');

//creat the mongoose schema ===============================================================================
const treeSchema = new mongoose.Schema({
  lastName: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  numFamily: {
    type: Number,
    min:1,
    required: true,
  },
});

//initialize the mogose model ==============================================================================
const Tree= mongoose.model("Tree",treeSchema)

//export the model =========================================================================================
module.exports = Tree