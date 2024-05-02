const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");

class Favorite {
  /** Add a recipe to favorites for a user.
   *
   * data should be { recipeId, userId }
   *
   * Returns { id, recipeId, userId, createdAt, updatedAt }
   **/
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
  static async remove({ recipeId, userId }) {
    const result = await db.query(
      `DELETE FROM favorites
       WHERE recipeId = $1 AND userId = $2`,
      [recipeId, userId],
    );
    if (result.rowCount === 0) throw new NotFoundError(`No favorite found`);
  }
}

module.exports = Favorite;

