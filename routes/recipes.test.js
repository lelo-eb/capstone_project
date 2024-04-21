// tests/recipeRoutes.test.js
const request = require('supertest');
const app = require('../app');
const db = require('../db');

beforeEach(async function () {
  await db.query('DELETE FROM recipes');
});

afterAll(async function () {
  await db.end();
});

describe('POST /recipes', function () {
  test('works', async function () {
    const response = await request(app)
      .post('/recipes')
      .send({
        title: 'Test Recipe',
        description: 'Test Description',
        ingredients: 'Test Ingredients',
        instructions: 'Test Instructions',
        createdBy: 'testuser'
      });
    expect(response.statusCode).toBe(201);
    expect(response.body.recipe.title).toBe('Test Recipe');
  });
});
