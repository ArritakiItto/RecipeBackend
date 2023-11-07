const { pool } = require('../db.js');
const sqlUtils = require('../../helpers/sql');
const bcrypt = require('bcrypt');

class User {
  static async create(username, password, email) {
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    let query = `
      INSERT INTO Users (username, password, email, created_at)
      VALUES ($1, $2, $3, NOW())
      RETURNING user_id;
    `;
    const values = [username, hashedPassword, email];
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw sqlUtils.handleSQLError(error);
    }
  }

  // ... other methods for retrieving, updating, and deleting users
}

module.exports = User;




