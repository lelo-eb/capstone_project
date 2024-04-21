// tests/rating.test.js
const db = require('../db');
const Rating = require('../models/rating');

beforeEach(async function () {
  await db.query('DELETE FROM ratings');
});

afterAll(async function () {
  await db.end();
});

describe('Rating.rate', function () {
  test('works', async function () {
    const rating = await Rating.rate({
      recipeId: 1, // Provide the appropriate recipeId
      userId: 1,   // Provide the appropriate userId
      rating: 5
    });
    expect(rating.recipeId).toBe(1);
    expect(rating.userId).toBe(1);
    expect(rating.rating).toBe(5);
  });
});

