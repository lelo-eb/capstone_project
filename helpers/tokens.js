const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

/** Return signed JWT from user data. */
function createToken(user) {
  const payload = {
    username: user.username,
    // You can include any other user data you want in the payload
  };

  return jwt.sign(payload, SECRET_KEY);
}

module.exports = { createToken };
