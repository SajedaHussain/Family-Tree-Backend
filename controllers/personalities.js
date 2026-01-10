const express = require('express');
const Personality = require('../models/personality');

const router = express.Router();

// CREATE ======================================================================================
router.post('/', async (req, res) => {
  try {
    const personality = await Personality.create(req.body);
    res.status(201).json({ personality });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to create personality' });
  }
});

// GET ALL ======================================================================================
router.get('/', async (req, res) => {
  try {
    const personalities = await Personality.find({});
    res.status(200).json({ personalities });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch personalities' });
  }
});

// DELETE ========================================================================================
router.delete('/:id', async (req, res) => {
  try {
    await Personality.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete' });
  }
});

// GET ONE =============================================================================================
router.get('/:id', async (req, res) => {
  try {
    const personality = await Personality.findById(req.params.id);
    if (!personality)
      return res.status(404).json({ error: 'Not found' });

    res.status(200).json({ personality });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch' });
  }
});

// UPDATE =============================================================================================
router.put('/:id', async (req, res) => {
  try {
    const personality = await Personality.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!personality)
      return res.status(404).json({ error: 'Not found' });

    res.status(200).json({ personality });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update' });
  }
});

//export the router ===============================================================================
module.exports = router;
