// routes/favoriteRoutes.js
const express = require('express');
const Favorite = require('../models/favorite');
const { ensureLoggedIn } = require('../middleware/auth');

const router = express.Router();

router.get('/', ensureLoggedIn, async function (req, res, next) {
  try {
    const userId = res.locals.user.id;
    const favorites = await Favorite.getAllByUser(userId);
    return res.json({ favorites });
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
