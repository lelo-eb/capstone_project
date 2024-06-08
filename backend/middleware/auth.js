const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError } = require("../expressError");

function authenticateJWT(req, res, next) {
  try {
    const authHeader = req.headers && req.headers.authorization;
    console.log("Auth header:", authHeader);
    if (authHeader) {
      const token = authHeader.replace(/^[Bb]earer /, "").trim();
      console.log("Token:", token);
      res.locals.user = jwt.verify(token, SECRET_KEY);
      console.log("User:", res.locals.user);
    }
  } catch (err) {
    console.error('Authentication error:', err);
    return next();
  }
  return next();
}

function ensureLoggedIn(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    console.log("Auth header:", authHeader);
    if (!authHeader) throw new UnauthorizedError();

    const token = authHeader.split(' ')[1]; // Assuming Bearer token
    console.log("Token:", token);
    const payload = jwt.verify(token, SECRET_KEY);
    console.log("Payload:", payload);
    res.locals.user = payload; // Attach user info to res.locals
    console.log('Middleware executed, user:', res.locals.user); // Add this log
    return next();
  } catch (err) {
    console.error('Middleware error:', err); // Add this log
    return next(new UnauthorizedError());
  }
}

module.exports = {
  authenticateJWT,
  ensureLoggedIn,
};