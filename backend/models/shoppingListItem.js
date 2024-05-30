const db = require("../db");

class ShoppingListItem {
  static async getAll() {
    const query = `SELECT * FROM shopping_list_items`;
    const shoppingListItemsRes = await db.query(query);
    return shoppingListItemsRes.rows;
  }

  static async create({ name, quantity }) {
    const query = `
      INSERT INTO shopping_list_items (name, quantity)
      VALUES ($1, $2)
      RETURNING id, name, quantity`;

    const result = await db.query(query, [name, quantity]);
    const newItem = result.rows[0];
    return newItem;
  }

  static async delete(id) {
    const query = `
      DELETE FROM shopping_list_items
      WHERE id = $1
      RETURNING id`;

    const result = await db.query(query, [id]);
    const deletedItem = result.rows[0];
    return deletedItem;
  }
}

module.exports = ShoppingListItem;