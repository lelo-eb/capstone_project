// models/recipe.js
const db = require("../db");
const { NotFoundError } = require("../expressError");

class Recipe {
  /** Create a new recipe.
   *
   * data should be { title, description, ingredients, instructions, createdBy }
   *
   * Returns { id, title, description, ingredients, instructions, createdBy, createdAt, updatedAt }
   **/
  static async create({ title, picture, description, ingredients, instructions, createdBy }) {
    const result = await db.query(
      `INSERT INTO recipes
       (title, picture, description, ingredients, instructions, created_by)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, title, description, ingredients, instructions, created_by AS "createdBy", created_at AS "createdAt", updated_at AS "updatedAt"`,
      [title, picture, description, ingredients, instructions, createdBy],
    );
    const recipe = result.rows[0];
    return recipe;
  }

  /** Find all recipes (optional filter on createdBy).
   *
   * Returns [{ id, title, description, ingredients, instructions, createdBy, createdAt, updatedAt }, ...]
   **/
  static async findAll({ createdBy }) {
    let query = `SELECT id, title, description, ingredients, instructions, created_by AS "createdBy", created_at AS "createdAt", updated_at AS "updatedAt"
                 FROM recipes`;
    const whereExpressions = [];
    const queryValues = [];

    if (createdBy !== undefined) {
      queryValues.push(createdBy);
      whereExpressions.push(`created_by = $${queryValues.length}`);
    }

    if (whereExpressions.length > 0) {
      query += " WHERE " + whereExpressions.join(" AND ");
    }

    const recipesRes = await db.query(query, queryValues);
    return recipesRes.rows;
  }

  /** Given a recipe ID, return data about recipe.
   *
   * Returns { id, title, description, ingredients, instructions, createdBy, createdAt, updatedAt }
   *   or throws NotFoundError if not found.
   **/
  static async getById(id) {
    const recipeRes = await db.query(
      `SELECT id, title, description, ingredients, instructions, created_by AS "createdBy", created_at AS "createdAt", updated_at AS "updatedAt"
       FROM recipes
       WHERE id = $1`,
      [id],
    );
    const recipe = recipeRes.rows[0];
    if (!recipe) throw new NotFoundError(`No recipe with ID: ${id}`);
    return recipe;
  }
}

module.exports = Recipe;