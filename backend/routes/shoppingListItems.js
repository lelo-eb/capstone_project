const express = require('express');
const ShoppingListItem = require('../models/shoppingListItem');

const router = express.Router();

// GET all shopping list items
router.get('/', async function (req, res, next) {
  try {
    const items = await ShoppingListItem.getAll();
    return res.json({ items });
  } catch (err) {
    return next(err);
  }
});

// POST a new shopping list item
router.post('/', async function (req, res, next) {
  try {
    const { name, quantity } = req.body;
    const newItem = await ShoppingListItem.create({ name, quantity });
    return res.status(201).json({ item: newItem });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
