// tests/shoppingListItemRoutes.test.js
const request = require('supertest');
const app = require('../app');
const db = require('../db');

beforeEach(async function () {
  await db.query('DELETE FROM shopping_list_items');
});

afterAll(async function () {
  await db.end();
});

describe('GET /shopping-list-items/:shoppingListId', function () {
  test('works', async function () {
    // Add test data to the database before testing
    const shoppingListId = 1; // Assuming the shopping list ID exists
    await db.query(
      `INSERT INTO shopping_list_items (shopping_list_id, name)
       VALUES ($1, $2)`,
      [shoppingListId, 'Test Item']
    );

    const response = await request(app)
      .get(`/shopping-list-items/${shoppingListId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.items.length).toBe(1);
    expect(response.body.items[0].name).toBe('Test Item');
  });
});
