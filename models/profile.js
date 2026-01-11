//requir mongoose library =================================================================================
const mongoose = require('mongoose');

//creat the mongoose schema ===============================================================================
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
    avatar: {
        type: String, 
        default: "",
    },
    bio: String,
    personalityType: String,
}, {
    timestamps: true
});

//initialize the mogose model ==============================================================================
const Profile =mongoose.model('Profile', profileSchema);

//export the model =========================================================================================
module.exports = Profile
