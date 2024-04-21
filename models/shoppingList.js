// models/shoppingList.js
const db = require("../db");
const { NotFoundError } = require("../expressError");

class ShoppingList {
  /** Create a new shopping list for a user.
   *
   * data should be { user }
   *
   * Returns { id, user, createdAt, updatedAt }
   **/
  static async create({ userId }) {
    const result = await db.query(
      `INSERT INTO shopping_lists
       (user_id)
       VALUES ($1)`,
      [userId],
    );
    const shoppingList = result.rows[0];
    return shoppingList;
  }


  /** Add an item to a shopping list.
   *
   * data should be { shoppingListId, name }
   *
   * Returns { id, shoppingListId, name, createdAt, updatedAt }
   **/
  static async addItem({ shoppingListId, name }) {
    const result = await db.query(
      `INSERT INTO shopping_list_items
       (shopping_list_id, name)
       VALUES ($1, $2)
       RETURNING id, shopping_list_id AS "shoppingListId", name, created_at AS "createdAt", updated_at AS "updatedAt"`,
      [shoppingListId, name],
    );
    const item = result.rows[0];
    return item;
  }

  /** Remove an item from a shopping list.
   *
   * data should be { itemId }
   **/
  static async removeItem({ itemId }) {
    const result = await db.query(
      `DELETE FROM shopping_list_items
       WHERE id = $1`,
      [itemId],
    );
    if (result.rowCount === 0) throw new NotFoundError(`No item found`);
  }
}

module.exports = ShoppingList;
