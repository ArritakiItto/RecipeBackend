const User = require('../models/user');
const pool = require('../db.js').pool;

describe('User Model', () => {
  beforeAll(async () => {
    // Setup: Connect to test database and create tables
  });

  afterAll(async () => {
    // Teardown: Disconnect from database
  });

  it('should create a new user', async () => {
    const user = await User.create('TestUsername', 'TestPassword', 'test@email.com');
    expect(user).toHaveProperty('user_id');
  });

  // ... other tests for retrieving, updating, and deleting users

  afterEach(async () => {
    await pool.query("DELETE FROM Users WHERE email='test@email.com'");
  });
});


