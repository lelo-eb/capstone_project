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
    const items = req.body.shoppingListItems; // Extract the array of items from the request body

    // Ensure that items is an array
    if (!Array.isArray(items)) {
      return res.status(400).json({ error: 'Invalid request body format' });
    }

    // Create a new array to store the results of item creations
    const createdItems = [];

    // Loop through each item in the array and create it
    for (const item of items) {
      const { name, quantity } = item;
      const newItem = await ShoppingListItem.create({ name, quantity });
      createdItems.push(newItem);
    }

    return res.status(201).json({ items: createdItems }); // Return an array of created items
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
