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
  static async getAll() {
    const query = `
    SELECT
    r.id AS recipe_id,
    r.title AS recipe_title,
    r.description AS recipe_description,
    r.ingredients AS recipe_ingredients,
    r.instructions AS recipe_instructions,
    r.picture AS recipe_picture,
    r.createdBy AS recipe_createdBy,
    r.createdAt AS recipe_createdAt,
    r.updatedAt AS recipe_updatedAt,
    u.username AS created_by_username,
    AVG(ra.rating) AS average_rating
    FROM
    recipes r
    LEFT JOIN
    ratings ra ON r.id = ra.recipeId
    LEFT JOIN
    users u ON r.createdBy = u.id
    GROUP BY
    r.id,
    u.username;
    `;
    const recipesRes = await db.query(query);
    return recipesRes.rows;
  }
  static async findById(id) {
    const query = `
      SELECT
        r.id AS recipe_id,
        r.title AS recipe_title,
        r.description AS recipe_description,
        r.ingredients AS recipe_ingredients,
        r.instructions AS recipe_instructions,
        r.picture AS recipe_picture,
        r.createdBy AS recipe_createdBy,
        r.createdAt AS recipe_createdAt,
        r.updatedAt AS recipe_updatedAt,
        u.username AS created_by_username,
        AVG(ra.rating) AS average_rating
      FROM
        recipes r
      LEFT JOIN
        ratings ra ON r.id = ra.recipeId
      LEFT JOIN
        users u ON r.createdBy = u.id
      WHERE
        r.id = $1
      GROUP BY
        r.id,
        u.username;
    `;
    
    const result = await db.query(query, [id]);
    return result.rows[0];
  }
}

module.exports = Recipe;