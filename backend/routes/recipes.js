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
    console.log('Route handler executed'); // Log for route handler execution
    const { title, picture, description, ingredients, instructions } = req.body;
    const createdBy = res.locals.user.id; // Access userId from res.locals.user
    console.log('User ID:', createdBy); // Log the userId to verify its presence
    const newRecipe = await Recipe.create({ title, picture, description, ingredients, instructions, createdBy });
    return res.status(201).json({ recipe: newRecipe });
  } catch (err) {
    console.log('Route handler error:', err); // Log any errors
    return next(err);
  }
});

module.exports = router;