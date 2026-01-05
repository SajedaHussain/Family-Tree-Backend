const mongoose = require('mongoose');
const treeSchema = new mongoose.Schema({
  lastName: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  numFamily: {
    type: Number,
    min:1,
    required: true,
  },
});
const Tree= mongoose.model("Tree",treeSchema)

module.exports = Tree