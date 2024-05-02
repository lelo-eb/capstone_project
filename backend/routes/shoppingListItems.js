// routes/shoppingListItemRoutes.js
const express = require('express');
const ShoppingListItem = require('../models/shoppingListItem');

const router = express.Router();

router.get('/:shoppingListId', async function (req, res, next) {
  try {
    const items = await ShoppingListItem.getAll(req.params.shoppingListId);
    return res.json({ items });
  } catch (err) {
    return next(err);
  }
});

// Add other shopping list item routes as needed

module.exports = router;
