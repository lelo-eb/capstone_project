// models/shoppingListItem.js
const db = require("../db");
const { NotFoundError } = require("../expressError");

class ShoppingListItem {
  /** Get all items in a shopping list.
   *
   * data should be { shoppingListId }
   * Returns [{ id, shoppingListId, name, createdAt, updatedAt }, ...]
   **/
  static async getAll() {
    let query = `SELECT name, quantity FROM shopping_list_items`;
    
    const shoppingListItemsRes = await db.query(query);
    return shoppingListItemsRes.rows;
  }
}

module.exports = ShoppingListItem;

