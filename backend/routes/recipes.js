// routes/recipeRoutes.js
const express = require('express');
const Recipe = require('../models/recipe');

const router = express.Router();

router.post('/', async function (req, res, next) {
  try {
    const recipe = await Recipe.create(req.body);
    return res.status(201).json({ recipe });
  } catch (err) {
    return next(err);
  }
});

// Add other recipe routes as needed

module.exports = router;
