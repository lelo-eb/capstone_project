class ShoppingList {
  /** Create a new shopping list for a user.
   *
   * data should be { userId, title }
   *
   * Returns { id, userId, title, createdAt, updatedAt }
   **/
  static async create({ userId, title }) {
    const result = await db.query(
      `INSERT INTO shopping_lists
       (user_id, title)
       VALUES ($1, $2)
       RETURNING id, user_id AS "userId", title, created_at AS "createdAt", updated_at AS "updatedAt"`,
      [userId, title],
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
  static async addItem({ shoppingListId, name, quantity }) {
    const result = await db.query(
      `INSERT INTO shopping_list_items
       (shopping_list_id, name, quantity)
       VALUES ($1, $2, $3)
       RETURNING id, shopping_list_id AS "shoppingListId", name, quantity]`,
      [shoppingListId, name, quantity],
    );
    const item = result.rows[0];
    return item;
  }
}

