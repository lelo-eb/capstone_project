// tests/favorite.test.js
const db = require('../db');
const Favorite = require('../models/favorite');

beforeEach(async function () {
  await db.query('DELETE FROM favorites');
});

afterAll(async function () {
  await db.end();
});

describe('Favorite.add', function () {
  test('works', async function () {
    // Assuming you have existing recipes and users in your database
    // Replace 'recipeId' and 'userId' with actual values from your database
    const favorite = await Favorite.add({
      recipeId: 1, // Replace with actual recipeId
      userId: 1 // Replace with actual userId
    });
    expect(favorite.recipeId).toBe(1); // Replace with the actual recipeId
    expect(favorite.userId).toBe(1); // Replace with the actual userId
  });
});
