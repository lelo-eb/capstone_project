// tests/commentRoutes.test.js
const request = require('supertest');
const app = require('../app');
const db = require('../db');

beforeEach(async function () {
  await db.query('DELETE FROM comments');
});

afterAll(async function () {
  await db.end();
});

describe('POST /comments', function () {
  test('works', async function () {
    const response = await request(app)
      .post('/comments')
      .send({
        recipeId: 1, // Assuming the recipe ID exists
        user: 'testuser',
        comment: 'Test comment'
      });
    expect(response.statusCode).toBe(201);
    expect(response.body.comment.recipeId).toBe(1);
  });
});
