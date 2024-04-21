// tests/shoppingListItem.test.js
const db = require('../db');
const ShoppingListItem = require('../models/shoppingListItem');

beforeEach(async function () {
  await db.query('DELETE FROM shopping_list_items');
});

afterAll(async function () {
  await db.end();
});

describe('ShoppingListItem.getAll', function () {
  test('works', async function () {
    const shoppingListId = 1; // Assuming the shopping list ID exists
    await db.query(
      `INSERT INTO shopping_list_items (shopping_list_id, name)
       VALUES ($1, $2)`,
      [shoppingListId, 'Test Item']
    );
    const items = await ShoppingListItem.getAll({ shoppingListId }); // Pass shoppingListId within an object
    expect(items.length).toBe(1);
    expect(items[0].name).toBe('Test Item');
  });
});

