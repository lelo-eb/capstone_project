// tests/shoppingListRoutes.test.js
const request = require('supertest');
const app = require('../app');
const db = require('../db');

beforeEach(async function () {
  await db.query('DELETE FROM shopping_lists');
});

afterAll(async function () {
  await db.end();
});

describe('POST /shopping-lists', function () {
  test('works', async function () {
    const response = await request(app)
      .post('/shopping-lists')
      .send({
        user: 'testuser'
      });
    expect(response.statusCode).toBe(201);
    expect(response.body.shoppingList.user).toBe('testuser');
  });
});
