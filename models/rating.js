// models/rating.js
const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");

class Rating {
  /** Rate a recipe.
   *
   * data should be { recipeId, userId, rating }
   *
   * Returns { id, recipeId, userId, rating, createdAt, updatedAt }
   **/
  static async rate({ recipeId, userId, rating }) {
    // Check if the user has already rated the recipe
    const existingRating = await db.query(
      `SELECT id
       FROM ratings
       WHERE recipeId = $1 AND userId = $2`,
      [recipeId, userId],
    );

    if (existingRating.rows[0]) {
      throw new BadRequestError(`User has already rated this recipe`);
    }

    const result = await db.query(
      `INSERT INTO ratings
       (recipeId, userId, rating)
       VALUES ($1, $2, $3)
       RETURNING id, recipeId, userId, rating, created_at AS "createdAt", updated_at AS "updatedAt"`,
      [recipeId, userId, rating],
    );
    const ratedRecipe = result.rows[0];
    return ratedRecipe;
  }

  /** Update a rating.
   *
   * data should be { recipeId, userId, rating }
   *
   * Returns { id, recipeId, userId, rating, createdAt, updatedAt }
   **/
  static async update({ recipeId, userId, rating }) {
    const result = await db.query(
      `UPDATE ratings
       SET rating = $3, updated_at = CURRENT_TIMESTAMP
       WHERE recipeId = $1 AND userId = $2
       RETURNING id, recipeId, userId, rating, created_at AS "createdAt", updated_at AS "updatedAt"`,
      [recipeId, userId, rating],
    );
    const updatedRating = result.rows[0];
    if (!updatedRating) throw new NotFoundError(`No rating found`);
    return updatedRating;
  }

  /** Remove a rating.
   *
   * data should be { recipeId, userId }
   **/
  static async remove({ recipeId, userId }) {
    const result = await db.query(
      `DELETE FROM ratings
       WHERE recipeId = $1 AND userId = $2`,
      [recipeId, userId],
    );
    if (result.rowCount === 0) throw new NotFoundError(`No rating found`);
  }
}

module.exports = Rating;
