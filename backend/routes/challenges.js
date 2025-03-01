const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

// Create a new challenge
router.post('/', async (req, res) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    
    // Check if user exists
    const userResult = await db.query(
      'SELECT id, username, score FROM users WHERE id = $1',
      [userId]
    );
    
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const user = userResult.rows[0];
    
    // Create a new challenge
    const challengeId = uuidv4();
    const result = await db.query(
      'INSERT INTO challenges (id, user_id, created_at) VALUES ($1, $2, NOW()) RETURNING id, user_id, created_at',
      [challengeId, userId]
    );
    
    const challenge = result.rows[0];
    
    res.status(201).json({
      challenge,
      user
    });
  } catch (error) {
    console.error('Error creating challenge:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get challenge by ID (for when a friend opens the challenge link)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await db.query(
      `SELECT c.id, c.user_id, c.created_at, u.username, u.score 
       FROM challenges c 
       JOIN users u ON c.user_id = u.id 
       WHERE c.id = $1`,
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Challenge not found' });
    }
    
    const challenge = result.rows[0];
    
    res.json({
      challenge: {
        id: challenge.id,
        created_at: challenge.created_at
      },
      user: {
        id: challenge.user_id,
        username: challenge.username,
        score: challenge.score
      }
    });
  } catch (error) {
    console.error('Error fetching challenge:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
