// db.js

const { Pool } = require('pg');

// Create a new pool of connections for the database
const pool = new Pool({
  user: 'kale',
  host: 'localhost',
  database: 'virtual_cookbook',
  // password: 'your_password',
  port: 5432,
});

// Function to insert a recipe into the database
async function insertRecipe(data) {
  const recipe = data.meals[0];
  try {
    await pool.query(
      'INSERT INTO Recipes(title, ingredients, instructions, image_url) VALUES($1, $2, $3, $4)',
      [recipe.strMeal, recipe.strIngredient1, recipe.strInstructions, recipe.strMealThumb]
    );
    console.log("Data inserted successfully!");
  } catch (err) {
    console.error("Error inserting data into database:", err);
    throw err;
  }
}

// Function to close the pool and end all the connections
async function closePool() {
  await pool.end();
}

// Export the pool's query method for passing queries directly
module.exports = {
  query: (text, params) => pool.query(text, params),
  insertRecipe,
  closePool,
  pool
};


