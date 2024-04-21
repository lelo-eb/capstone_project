// tests/favoriteRoutes.test.js
const request = require('supertest');
const app = require('../app');
const db = require('../db');

beforeEach(async function () {
  await db.query('DELETE FROM favorites');
});

afterAll(async function () {
  await db.end();
});

describe('POST /favorites', function () {
  test('works', async function () {
    // Assuming you have valid recipeId and userId
    const response = await request(app)
      .post('/favorites')
      .send({
        recipeId: 1, // Replace with a valid recipeId
        userId: 1, // Replace with a valid userId
      });
    expect(response.statusCode).toBe(201);
    expect(response.body.favorite.recipeId).toBe(1); // Adjust based on the valid recipeId used
  });
});
