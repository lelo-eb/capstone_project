const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError } = require("../expressError");

function authenticateJWT(req, res, next) {
  try {
    const authHeader = req.headers && req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace(/^[Bb]earer /, "").trim();
      res.locals.user = jwt.verify(token, SECRET_KEY);
    }
  } catch (err) {
    return next();
  }
  return next();
}

function ensureLoggedIn(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new UnauthorizedError();

    const token = authHeader.split(' ')[1]; // Assuming Bearer token
    const payload = jwt.verify(token, SECRET_KEY);
    res.locals.user = payload; // Attach user info to res.locals
    console.log('Middleware executed, user:', res.locals.user); // Add this log
    return next();
  } catch (err) {
    console.log('Middleware error:', err); // Add this log
    return next(new UnauthorizedError());
  }
}

module.exports = {
  authenticateJWT,
  ensureLoggedIn,
};