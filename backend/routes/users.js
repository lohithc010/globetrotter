const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

// Register a new user or update existing user
router.post('/', async (req, res) => {
  try {
    const { username } = req.body;
    
    if (!username) {
      return res.status(400).json({ message: 'Username is required' });
    }
    
    // Check if user already exists
    const existingUserResult = await db.query(
      'SELECT id, username, score FROM users WHERE username = $1',
      [username]
    );
    
    if (existingUserResult.rows.length > 0) {
      // User exists, return the user data
      return res.json(existingUserResult.rows[0]);
    }
    
    // Create a new user
    const userId = uuidv4();
    const result = await db.query(
      'INSERT INTO users (id, username, score) VALUES ($1, $2, $3) RETURNING id, username, score',
      [userId, username, 0]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating/updating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await db.query(
      'SELECT id, username, score FROM users WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user score
router.put('/:id/score', async (req, res) => {
  try {
    const { id } = req.params;
    const { score } = req.body;
    
    if (score === undefined) {
      return res.status(400).json({ message: 'Score is required' });
    }
    
    const result = await db.query(
      'UPDATE users SET score = $1 WHERE id = $2 RETURNING id, username, score',
      [score, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating user score:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get leaderboard
router.get('/', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT id, username, score FROM users ORDER BY score DESC LIMIT 10'
    );
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
