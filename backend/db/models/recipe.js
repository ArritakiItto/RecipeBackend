const pool = require('../db.js').pool;
const sqlUtils = require('../../helpers/sql');


class Recipe {
  static async create(title, description, ingredients, instructions) {
    let query = `
      INSERT INTO Recipes (title, description, ingredients, instructions, created_at)
      VALUES ($1, $2, $3, $4, NOW())
      RETURNING recipe_id;
    `;
    // use sqlUtils here, if we have other mods and pagination
    const values = [title, description, ingredients, instructions];
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw sqlUtils.handleSQLError(error);
    }
  }
 
}

module.exports = Recipe;
