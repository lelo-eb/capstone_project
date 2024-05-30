const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

function createToken(user) {
  const payload = {
    username: user.username,
    // Include any other user data needed
  };

  return jwt.sign(payload, SECRET_KEY);
}

module.exports = { createToken };

