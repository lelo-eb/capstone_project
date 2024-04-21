// tests/shoppingList.test.js
const db = require('../db');
const ShoppingList = require('../models/shoppingList');

beforeEach(async function () {
  await db.query('DELETE FROM shopping_lists');
});

afterAll(async function () {
  await db.end();
});

describe('ShoppingList.create', function () {
  test('works', async function () {
    const shoppingList = await ShoppingList.create({
      userId: 'testuser'
    });
    expect(shoppingList.user).toBe('testuser');
  });
});
