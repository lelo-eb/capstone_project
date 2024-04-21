// tests/recipe.test.js
const db = require('../db');
const Recipe = require('../models/recipe');

beforeEach(async function () {
  await db.query('DELETE FROM recipes');
});

afterAll(async function () {
  await db.end();
});

describe('Recipe.create', function () {
  test('works', async function () {
    const recipe = await Recipe.create({
      title: 'Test Recipe',
      description: 'Test Description',
      ingredients: 'Test Ingredients',
      instructions: 'Test Instructions',
      createdBy: 'testuser'
    });
    expect(recipe.title).toBe('Test Recipe');
    expect(recipe.description).toBe('Test Description');
    expect(recipe.ingredients).toBe('Test Ingredients');
    expect(recipe.instructions).toBe('Test Instructions');
    expect(recipe.createdBy).toBe('testuser');
  });
});
