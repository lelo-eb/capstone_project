const db = require("../db");

class ShoppingListItem {
  static async getAllByUser(userId) {
    const query = `SELECT * FROM shopping_list_items WHERE userId = $1`;
    const shoppingListItemsRes = await db.query(query, [userId]);
    return shoppingListItemsRes.rows;
  }

  static async create({ name, quantity, userId }) {
    const query = `
      INSERT INTO shopping_list_items (name, quantity, userId)
      VALUES ($1, $2, $3)
      RETURNING id, name, quantity, userId`;

    const result = await db.query(query, [name, quantity, userId]);
    const newItem = result.rows[0];
    return newItem;
  }

  static async delete(id, userId) {
    const query = `
      DELETE FROM shopping_list_items
      WHERE id = $1 AND userId = $2
      RETURNING id`;

    const result = await db.query(query, [id, userId]);
    const deletedItem = result.rows[0];
    return deletedItem;
  }
}

module.exports = ShoppingListItem;