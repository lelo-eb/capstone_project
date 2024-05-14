// routes/commentRoutes.js
const express = require('express');
const Comment = require('../models/comment');

const router = express.Router();

router.get('/', async function (req, res, next) {
  try {
    const comment = await Comment.getAll(req.params.commentId);
    return res.json({ comment });
  } catch (err) {
    return next(err);
  }
});
router.post('/', async function (req, res, next) {
  try {
    const comment = await Comment.add(req.body);
    return res.status(201).json({ comment });
  } catch (err) {
    return next(err);
  }
});

// Add other comment routes as needed

module.exports = router;
