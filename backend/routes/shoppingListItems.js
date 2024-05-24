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

// POST new shopping list items
router.post('/', async function (req, res, next) {
  try {
    const items = req.body.shoppingListItems;
    if (!Array.isArray(items)) {
      return res.status(400).json({ error: 'Invalid request body format' });
    }
    const createdItems = [];
    for (const item of items) {
      const { name, quantity } = item;
      const newItem = await ShoppingListItem.create({ name, quantity });
      createdItems.push(newItem);
    }
    return res.status(201).json({ items: createdItems });
  } catch (err) {
    return next(err);
  }
});

// DELETE a shopping list item
router.delete('/:id', async function (req, res, next) {
  try {
    const { id } = req.params;
    const deletedItem = await ShoppingListItem.delete(id);
    if (!deletedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    return res.status(200).json({ message: 'Item deleted', id: deletedItem.id });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
