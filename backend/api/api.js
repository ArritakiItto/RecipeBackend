const express = require('express');
const axios = require('axios');
const router = express.Router();
const { query, pool } = require('../db/db');

// const API_ENDPOINT = process.env.API_ENDPOINT || 'https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata';
const API_ENDPOINT = process.env.API_ENDPOINT || 'https://www.themealdb.com/api/json/v2/9973533/latest.php';




const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Fetch data from external API
router.get('/fetch-data', async (req, res) => {
    const searchQuery = req.query.search;
    if (!searchQuery) {
        return res.status(400).json({ error: 'Search term is required.' });
    }
    const searchEndpoint = `https://www.themealdb.com/api/json/v2/9973533/search.php?s=${searchQuery}`;
    try {
        const response = await axios.get(searchEndpoint);
        if (response.status !== 200) {
            throw new Error(`External API returned status code: ${response.status}`);
        }
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching data from external API:", error.message);
        res.status(500).json({ error: 'Failed to fetch data from external API' });
    }
});



// Internal CRUD routes for users
router.get('/users', (req, res) => {
    // Fetch all users from the database
    res.json({ users: [] });
});

router.post('/users', (req, res) => {
    // Add a new user to the database
    res.json({ message: 'User added!' });
});

router.put('/users/:id', (req, res) => {
    // Update a user in the database
    res.json({ message: 'User updated!' });
});

router.delete('/users/:id', (req, res) => {
    // Delete a user from the database
    res.json({ message: 'User deleted!' });
});

router.post('/favorites', async (req, res) => {
    const { userId, recipeId, recipeName, recipeImage } = req.body;
    if (!userId || !recipeId || !recipeName || !recipeImage) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    console.log("test1")
    try {
        console.log("test22")
        const existingFavorite = await query('SELECT * FROM favorites WHERE user_id = $1 AND recipe_id = $2', [userId, recipeId]);
        console.log("testtt",existingFavorite)
        if (existingFavorite.rowCount > 0) {
            return res.status(400).json({ error: 'Recipe already favorited' });
        }
        await query('INSERT INTO favorites (user_id, recipe_id, recipe_name, recipe_image) VALUES ($1, $2, $3, $4)', [userId, recipeId, recipeName, recipeImage]);
        res.json({ message: 'Recipe added to favorites!' });
    } catch (error) {
        console.error("Error saving favorite:", error.message);
        res.status(500).json({ error: 'Failed to save favorite' });
    }
});

router.get('/user/:userId/favorites', asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    console.log("userId:", userId); 
    const result = await pool.query(`
    SELECT recipe_id, recipe_name, recipe_image
    FROM favorites
    WHERE user_id = $1
`, [userId]);
    console.log("Query Result:", result.rows); 
    res.json(result.rows);
}));


router.delete('/favorites/:userId/:recipeId', async (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    const recipeId = req.params.recipeId;

    try {
        // Construct the SQL query and log it
        const sqlQuery = 'DELETE FROM favorites WHERE user_id = $1 AND recipe_id = $2';
        const sqlParams = [userId, recipeId];
        console.log('SQL Query:', sqlQuery);
        console.log('SQL Params:', sqlParams);

        // Check if the recipe exists in the user's favorites
        const existingFavorite = await query(sqlQuery, sqlParams);

        if (existingFavorite.rowCount === 0) {
            return res.status(404).json({ error: 'Recipe not found in favorites' });
        }

        // Remove the recipe from the favorites table
        await query('DELETE FROM favorites WHERE user_id = $1 AND recipe_id = $2', [userId, recipeId]);

        res.json({ message: 'Recipe removed from favorites!' });
    } catch (error) {
        console.error("Error removing favorite:", error.message);
        res.status(500).json({ error: 'Failed to remove favorite' });
    }
});

router.get('/fetch-recipe/:recipeId', asyncHandler(async (req, res) => {
    const recipeId = parseInt(req.params.recipeId, 10);
    try {
      // Fetch the recipe details from your database or external API using the recipeId
      const recipeDetails = await fetchRecipeDetailsById(recipeId); // Replace with your implementation
  
      if (!recipeDetails) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
  
      res.json({ recipe: recipeDetails });
    } catch (error) {
      console.error('Error fetching recipe details:', error);
      res.status(500).json({ error: 'Failed to fetch recipe details' });
    }
  }));

module.exports = router;
