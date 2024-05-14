// routes/shoppingListRoutes.js
const express = require('express');
const ShoppingList = require('../models/shoppingList');

const router = express.Router();

router.get('/', async function (req, res, next) {
  try {
    const shoppingList = await ShoppingList.getAll(req.params.shoppingListId);
    return res.json({ shoppingList });
  } catch (err) {
    return next(err);
  }
});
router.post('/', async function (req, res, next) {
  try {
    const shoppingList = await ShoppingList.create(req.body);
    return res.status(201).json({ shoppingList });
  } catch (err) {
    return next(err);
  }
});

// Add other shopping list routes as needed

module.exports = router;