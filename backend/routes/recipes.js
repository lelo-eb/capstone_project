// routes/recipeRoutes.js
const express = require('express');
const Recipe = require('../models/recipe');
const { ensureLoggedIn } = require('../middleware/auth');

const router = express.Router();

router.get('/', async function (req, res, next) {
  try {
    const recipes = await Recipe.getAll();
    return res.json({ recipes });
  } catch (err) {
    return next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const recipeId = req.params.id;
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    return res.json(recipe);
  } catch (err) {
    next(err);
  }
});

router.post('/', ensureLoggedIn, async (req, res, next) => {
  try {
    console.log('Route handler executed'); // Add this log
    const { title, picture, description, ingredients, instructions } = req.body;
    const createdBy = res.locals.user.id;
    console.log('User ID:', createdBy); // Add this log
    const newRecipe = await Recipe.create({ title, picture, description, ingredients, instructions, createdBy });
    return res.status(201).json({ recipe: newRecipe });
  } catch (err) {
    console.log('Route handler error:', err); // Add this log
    return next(err);
  }
});

module.exports = router;