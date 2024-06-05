const db = require("../db");
const { NotFoundError } = require("../expressError");

class Recipe {
  static async create({ title, picture, description, ingredients, instructions, createdBy }) {
    console.log('Recipe.create called with createdBy:', createdBy); // Add this log
    try {
      const query = `
        INSERT INTO recipes (title, picture, description, ingredients, instructions, createdBy)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id, title, picture, description, ingredients, instructions, createdBy, createdAt, updatedAt`;
      const result = await db.query(query, [title, picture, description, ingredients, instructions, createdBy]);
      const newRecipe = result.rows[0];
      return newRecipe;
    } catch (err) {
      console.log('Recipe.create error:', err); // Add this log
      throw err;
    }
  }

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
      COALESCE(AVG(ra.rating), 0) AS average_rating
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
        COALESCE(AVG(ra.rating), 0) AS average_rating
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