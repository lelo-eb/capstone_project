// routes/favoriteRoutes.js
const express = require('express');
const Favorite = require('../models/favorite');

const router = express.Router();

router.get('/', async function (req, res, next) {
  try {
    const favorite = await Favorite.getAll(req.params.favoriteId);
    return res.json({ favorite });
  } catch (err) {
    return next(err);
  }
});
router.post('/', async function (req, res, next) {
  try {
    const favorite = await Favorite.add(req.body);
    return res.status(201).json({ favorite });
  } catch (err) {
    return next(err);
  }
});

// Add other favorite routes as needed

module.exports = router;
