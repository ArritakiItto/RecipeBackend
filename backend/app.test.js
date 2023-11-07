const request = require('supertest');
const app = require('./app'); // Path to app.js

describe('App Main Entry Point', () => {
  it('should respond with a 200 status for the root route', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
  });
});
