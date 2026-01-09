const express = require('express');
const Profile = require('../models/profile');

const router = express.Router();

// CREATE ====================================================================================================
router.post('/', async (req, res) => {
  try {
    const profile = await Profile.create(req.body);
    res.status(201).json({ profile });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create profile' });
  }
});

// GET all ==========================================================================================
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('tree_id', 'lastName');
    res.status(200).json({ profiles });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get profiles' });
  }
});

// GET one ====================================================================================================
router.get('/:id', async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    res.status(200).json({ profile });
  } catch (err) {
    res.status(500).json({ error: 'Profile not found' });
  }
});

// UPDATE ====================================================================================================
router.put('/:id', async (req, res) => {
  try {
    const profile = await Profile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({ profile });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

module.exports = router;
