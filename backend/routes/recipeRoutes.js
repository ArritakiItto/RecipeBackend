// const express = require('express');
// const axios = require('axios');
// const router = express.Router();
// const Recipe = require('../db/models/recipe');
// ; 

// const API_BASE_ENDPOINT = 'https://www.themealdb.com/api/json/v2/9973533/search=';

// const asyncHandler = fn => (req, res, next) => {
//   Promise.resolve(fn(req, res, next)).catch(next);
// };

// // Fetch a specific recipe from external API
// router.get('/fetch-data/:query', asyncHandler(async (req, res) => {
//     const { query } = req.params;
//     try {
//         const response = await axios.get(`${API_BASE_ENDPOINT}${query}`);
//         if (response.status !== 200) {
//             throw new Error(`External API returned status code: ${response.status}`);
//         }
//         res.json(response.data);
//     } catch (error) {
//         console.error("Error fetching data:", error);
//         if (error.response && error.response.status === 404) {
//             res.status(404).json({ error: 'Data not found on external API' });
//         } else {
//             res.status(500).json({ error: 'Failed to fetch data from external API' });
//         }
//     }
// }));
// // Add a new recipe
// router.post('/', async (req, res) => {
//     try {
//         const { title, description, ingredients, steps } = req.body;
//         if (!title || !description || !ingredients || !steps) {
//             return res.status(400).json({ error: 'All fields are required.' });
//         }
//         const newRecipe = await Recipe.create(title, description, ingredients, steps);
//         res.status(201).json(newRecipe);
//     } catch (error) {
//         console.error("Error adding recipe:", error);
//         res.status(500).json({ error: 'Failed to add recipe.' });
//     }
// });

// // Get a list of all recipes
// router.get('/', async (req, res) => {
//     try {
//         const recipes = await Recipe.findAll();
//         res.json(recipes);
//     } catch (error) {
//         console.error("Error fetching recipes:", error);
//         res.status(500).json({ error: 'Failed to fetch recipes.' });
//     }
// });

// // Get a specific recipe by its ID
// router.get('/:id', async (req, res) => {
//     try {
//         const recipe = await Recipe.findById(req.params.id);
//         if (!recipe) {
//             return res.status(404).json({ error: 'Recipe not found.' });
//         }
//         res.json(recipe);
//     } catch (error) {
//         console.error("Error fetching recipe:", error);
//         res.status(500).json({ error: 'Failed to fetch recipe.' });
//     }
// });

// // Update a specific recipe
// router.put('/:id', async (req, res) => {
//     try {
//         const updatedRecipe = await Recipe.update(req.params.id, req.body);
//         if (!updatedRecipe) {
//             return res.status(404).json({ error: 'Recipe not found.' });
//         }
//         res.json(updatedRecipe);
//     } catch (error) {
//         console.error("Error updating recipe:", error);
//         res.status(500).json({ error: 'Failed to update recipe.' });
//     }
// });

// // Delete a specific recipe
// router.delete('/:id', async (req, res) => {
//     try {
//         const deleted = await Recipe.delete(req.params.id);
//         if (!deleted) {
//             return res.status(404).json({ error: 'Recipe not found.' });
//         }
//         res.json({ message: 'Recipe deleted successfully.' });
//     } catch (error) {
//         console.error("Error deleting recipe:", error);
//         res.status(500).json({ error: 'Failed to delete recipe.' });
//     }
// });

// module.exports = router;

