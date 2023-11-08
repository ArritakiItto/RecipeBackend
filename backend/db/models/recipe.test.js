const Recipe = require('../models/recipe');
const pool = require('../db.js').pool;

describe('Recipe Model', () => {
  beforeAll(async () => {
    // Setup: Connect to test database and create tables
  });

  afterAll(async () => {
    // Teardown: Disconnect from database
  });

  it('should create a new recipe', async () => {
    const recipe = await Recipe.create('Test Title', 'Test Description', 'Test Ingredients', 'Test Instructions');
    expect(recipe).toHaveProperty('recipe_id');
  });

  // ... other tests for retrieving, updating, and deleting recipes

  afterEach(async () => {
    await pool.query("DELETE FROM Recipes WHERE title='Test Title'");
  });
});



