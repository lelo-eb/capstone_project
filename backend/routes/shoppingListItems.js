const express = require('express');
const ShoppingListItem = require('../models/shoppingListItem');
const { ensureLoggedIn } = require('../middleware/auth');

const router = express.Router();

// GET all shopping list items for the logged-in user
router.get('/', ensureLoggedIn, async function (req, res, next) {
  try {
    const userId = res.locals.user.id;
    const items = await ShoppingListItem.getAllByUser(userId);
    return res.json({ items });
  } catch (err) {
    return next(err);
  }
});

// POST new shopping list items for the logged-in user
router.post('/', ensureLoggedIn, async function (req, res, next) {
  try {
    const userId = res.locals.user.id; // Get the user ID from request context
    const items = req.body.shoppingListItems;
    if (!Array.isArray(items)) {
      return res.status(400).json({ error: 'Invalid request body format' });
    }
    const createdItems = [];
    for (const item of items) {
      const { name, quantity } = item;
      const newItem = await ShoppingListItem.create({ name, quantity, userId }); // Pass userId to create function
      createdItems.push(newItem);
    }
    return res.status(201).json({ items: createdItems });
  } catch (err) {
    return next(err);
  }
});

// DELETE a shopping list item for the logged-in user
router.delete('/:id', ensureLoggedIn, async function (req, res, next) {
  try {
    const userId = res.locals.user.id;
    const { id } = req.params;
    const deletedItem = await ShoppingListItem.delete(id, userId);
    if (!deletedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    return res.status(200).json({ message: 'Item deleted', id: deletedItem.id });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
