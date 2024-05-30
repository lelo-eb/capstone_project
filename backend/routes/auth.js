const express = require("express");
const User = require("../models/user");
const { createToken } = require("../helpers/tokens");
const { BadRequestError } = require("../expressError");
const { ensureLoggedIn } = require('../middleware/auth');

const router = new express.Router();

/** POST /auth/token: { username, password } => { token }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */
router.post("/token", async function (req, res, next) {
  try {
    const { username, password } = req.body;
    const user = await User.authenticate(username, password);
    const token = createToken(user);
    return res.json({ token });
  } catch (err) {
    return next(err);
  }
});

router.get('/verify-token', ensureLoggedIn, (req, res) => {
  res.json({ message: 'Token is valid' });
});

router.post("/register", async function (req, res, next) {
  try {
    const newUser = await User.register(req.body);
    const token = createToken(newUser);
    return res.status(201).json({ token });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;