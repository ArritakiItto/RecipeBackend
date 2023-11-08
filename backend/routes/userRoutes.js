const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');
const router = express.Router();
const User = require('../db/models/user');
const db = require('../db/db');

// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { username, password, email } = req.body;
        if (!username || !password || !email) {
            return res.status(400).json({ error: 'All fields are required.' });
        }
        const newUser = await User.create(username, password, email);
        res.status(201).json(newUser);
    } catch (error) {
        if (error.code === '23505') {
            res.status(400).json({ error: 'This email address is already registered.' });
        } else {
            console.error("Error registering user:", error);
            res.status(500).json({ error: 'Failed to register user.' });
        }
    }
});


// User login
router.post('/login', async (req, res) => {
    console.log("Login request received with data:", req.body); // Log the received request data

    const { username, password } = req.body;

    // Check if user exists in the database
    const result = await db.pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];

    console.log("User fetched from database:", user); // Log the fetched user data

    if (!user) {
        console.log("No user found with the provided username:", username);
        return res.status(401).json({ error: 'Invalid username or password' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    console.log("Password comparison result:", isPasswordCorrect); // Log the result of the bcrypt password comparison

    if (!isPasswordCorrect) {
        console.log("Provided password does not match the hashed password in the database.");
        return res.status(401).json({ error: 'Invalid username or password' });
    }

    // If credentials are correct, generate a JWT token
    const token = jwt.sign({ id: user.id }, config.JWT_SECRET, { expiresIn: '1h' });

    // Send the token back to the client
    res.json({ token });
});


// Get the profile of a specific user
router.get('/profile/:id', async (req, res) => {
    // Logic to get the profile of a specific user
    // This will involve fetching the user's details from the database using the provided ID
});

// Update the profile of a specific user
router.put('/profile/:id', async (req, res) => {
    // Logic to update the profile of a specific user
    // This will involve updating the user's details in the database using the provided ID and data
});

// Delete a specific user
router.delete('/profile/:id', async (req, res) => {
    // Logic to delete a specific user
    // This will involve removing the user's record from the database using the provided ID
});

module.exports = router;



