const express = require('express');
const Profile = require('../models/profile');
const verifyToken = require('../middleware/verify-token'); // هالملف يتحقق من JWT
const router = express.Router();

// CREATE OR UPDATE PROFILE ==================================================================
router.post('/', verifyToken, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user._id });
    if (profile) {
      profile = await Profile.findByIdAndUpdate(profile._id, req.body, { new: true });
    } else {
   
      profile = await Profile.create({ ...req.body, user: req.user._id });
    }

    res.status(200).json({ profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create/update profile' });
  }
});

// GET ==============================================================================================
router.get('/me', verifyToken, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id });
    res.status(200).json({ profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get profile' });
  }
});

//export the router ===============================================================================
module.exports = router;
