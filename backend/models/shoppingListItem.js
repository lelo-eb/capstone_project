const db = require("../db");

class ShoppingListItem {
  static async getAll() {
    const query = `SELECT * FROM shopping_list_items`;
    
    const shoppingListItemsRes = await db.query(query);
    return shoppingListItemsRes.rows;
  }

  /** Create a new item in the shopping list.
   *
   * data should be { name, quantity }
   * Returns { id, name, quantity, createdAt, updatedAt }
   **/
  static async create({ name, quantity }) {
    const query = `
      INSERT INTO shopping_list_items (name, quantity)
      VALUES ($1, $2)
      RETURNING id, name, quantity`;

    const result = await db.query(query, [name, quantity]);
    const newItem = result.rows[0];

    return newItem;
  }
}

module.exports = ShoppingListItem;


