const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");

class Favorite {
  /** Add a recipe to favorites for a user.
   *
   * data should be { recipeId, userId }
   *
   * Returns { id, recipeId, userId, createdAt, updatedAt }
   **/
  static async getAll() {
    let query = 
    `SELECT favorites.id, recipes.title
    FROM favorites
    JOIN recipes 
    ON favorites.recipeId = recipes.id`;
  
    const favoritesRes = await db.query(query);
    return favoritesRes.rows;
  }

  static async getAllByUser(userId) {
    const query = `
      SELECT favorites.id, recipes.title
      FROM favorites
      JOIN recipes ON favorites.recipeId = recipes.id
      WHERE favorites.userId = $1`;

    const favoritesRes = await db.query(query, [userId]);
    return favoritesRes.rows;
  }

  static async add({ recipeId, userId }) {
    // Check if the recipe is already in favorites for the user
    const existingFavorite = await db.query(
      `SELECT id
       FROM favorites
       WHERE recipeId = $1 AND userId = $2`,
      [recipeId, userId],
    );

    if (existingFavorite.rows[0]) {
      throw new BadRequestError(`Recipe is already in favorites`);
    }

    const result = await db.query(
      `INSERT INTO favorites
       (recipeId, userId)
       VALUES ($1, $2)
       RETURNING id, recipeId, userId`,
      [recipeId, userId],
    );
    const favorite = result.rows[0];
    return favorite;
  }

  /** Remove a recipe from favorites for a user.
   *
   * data should be { recipeId, userId }
   **/
  static async delete({ id, userId }) {
    const query = `
      DELETE FROM favorites
       WHERE id = $1 AND userId = $2
       RETURNING id`;
    
    const result = await db.query(query, [id, userId]);
    const deletedFavorite = result.rows[0];
    return deletedFavorite;
  }
}

module.exports = Favorite;

