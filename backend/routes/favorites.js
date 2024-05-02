// routes/favoriteRoutes.js
const express = require('express');
const Favorite = require('../models/favorite');

const router = express.Router();

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
