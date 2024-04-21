const { createToken } = require('./tokens');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

describe('createToken', () => {
  it('should create a JWT token with the correct payload', () => {
    const user = { username: 'testuser' };
    const token = createToken(user);

    const decoded = jwt.verify(token, SECRET_KEY);

    expect(decoded).toHaveProperty('username', 'testuser');
  });
});
