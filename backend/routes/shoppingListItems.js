// routes/shoppingListItemRoutes.js
const express = require('express');
const ShoppingListItem = require('../models/shoppingListItem');

const router = express.Router();

router.get('/', async function (req, res, next) {
  try {
    const item = await ShoppingListItem.getAll(req.params.shoppingListItemId);
    return res.json({ item });
  } catch (err) {
    return next(err);
  }
});
router.post('/', async function (req, res, next) {
  try {
    const item = await ShoppingListItem.create(req.body);
    return res.status(201).json({ item });
  } catch (err) {
    return next(err);
  }
});

// Add other shopping list item routes as needed

module.exports = router;
