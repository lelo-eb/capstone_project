const db = require("../db");
const { NotFoundError } = require("../expressError");

class Comment {
  /** Add a comment to a recipe.
   *
   * data should be { recipeId, userId, comment }
   *
   * Returns { id, recipeId, userId, comment, createdAt, updatedOn }
   **/
  static async add({ recipeId, userId, comment }) {
    const result = await db.query(
      `INSERT INTO comments
       (recipeId, userId, comment)
       VALUES ($1, $2, $3)
       RETURNING id, recipeId, userId, comment, createdAt, updatedOn`,
      [recipeId, userId, comment],
    );
    const newComment = result.rows[0];
    return newComment;
  }

  /** Update a comment.
   *
   * data should be { id, userId, comment }
   *
   * Returns { id, recipeId, userId, comment, createdAt, updatedOn }
   **/
  static async update({ id, userId, comment }) {
    const result = await db.query(
      `UPDATE comments
       SET comment = $3, updatedOn = CURRENT_TIMESTAMP
       WHERE id = $1 AND userId = $2
       RETURNING id, recipeId, userId, comment, createdAt, updatedOn`,
      [id, userId, comment],
    );
    const updatedComment = result.rows[0];
    if (!updatedComment) throw new NotFoundError(`No comment found`);
    return updatedComment;
  }

  /** Remove a comment.
   *
   * data should be { id, userId }
   **/
  static async remove({ id, userId }) {
    const result = await db.query(
      `DELETE FROM comments
       WHERE id = $1 AND userId = $2`,
      [id, userId],
    );
    if (result.rowCount === 0) throw new NotFoundError(`No comment found`);
  }
}

module.exports = Comment;
