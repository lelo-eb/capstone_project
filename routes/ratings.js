// routes/ratingRoutes.js
const express = require('express');
const Rating = require('../models/rating');

const router = express.Router();

router.post('/', async function (req, res, next) {
  try {
    const rating = await Rating.rate(req.body);
    return res.status(201).json({ rating });
  } catch (err) {
    return next(err);
  }
});

// Add other rating routes as needed

module.exports = router;
