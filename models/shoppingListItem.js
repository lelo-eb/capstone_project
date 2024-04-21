// models/shoppingListItem.js
const db = require("../db");
const { NotFoundError } = require("../expressError");

class ShoppingListItem {
  /** Get all items in a shopping list.
   *
   * data should be { shoppingListId }
   * Returns [{ id, shoppingListId, name, createdAt, updatedAt }, ...]
   **/
  static async getAll({ shoppingListId }) {
    const result = await db.query(
      `SELECT id, shopping_list_id AS "shoppingListId", name, created_at AS "createdAt", updated_at AS "updatedAt"
       FROM shopping_list_items
       WHERE shopping_list_id = $1`,
      [shoppingListId],
    );
    return result.rows;
  }
}

module.exports = ShoppingListItem;

