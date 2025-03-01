const express = require('express');
const router = express.Router();
const db = require('../db');

// Get a random destination with clues
router.get('/random', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT id, name FROM destinations ORDER BY RANDOM() LIMIT 1'
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No destinations found' });
    }

    const destination = result.rows[0];
    
    // Get clues for the destination
    const cluesResult = await db.query(
      'SELECT id, text FROM clues WHERE destination_id = $1 ORDER BY RANDOM() LIMIT 2',
      [destination.id]
    );

    // Get fun facts for the destination
    const factsResult = await db.query(
      'SELECT id, text FROM facts WHERE destination_id = $1 ORDER BY RANDOM() LIMIT 3',
      [destination.id]
    );

    // Get 3 wrong destinations for multiple choice
    const wrongDestinationsResult = await db.query(
      'SELECT id, name FROM destinations WHERE id != $1 ORDER BY RANDOM() LIMIT 3',
      [destination.id]
    );

    const response = {
      destination: {
        id: destination.id,
        name: destination.name,
      },
      clues: cluesResult.rows,
      facts: factsResult.rows,
      options: [
        { id: destination.id, name: destination.name },
        ...wrongDestinationsResult.rows
      ].sort(() => Math.random() - 0.5) // Shuffle the options
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching random destination:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a specific destination by ID (for revealing after the guess)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await db.query(
      'SELECT id, name FROM destinations WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    const destination = result.rows[0];
    
    // Get all facts for the destination
    const factsResult = await db.query(
      'SELECT id, text FROM facts WHERE destination_id = $1',
      [destination.id]
    );

    const response = {
      destination,
      facts: factsResult.rows
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching destination:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
