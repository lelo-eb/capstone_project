const jwt = require('jsonwebtoken');
const { authenticateJWT, ensureLoggedIn, ensureCorrectUser } = require('./auth');
const { SECRET_KEY } = require('../config');
const { UnauthorizedError } = require('../expressError');

// Mock user object
const mockUser = {
  username: 'testuser',
};

// Mock request and response objects
const mockReq = {
  headers: {
    authorization: `Bearer ${jwt.sign(mockUser, SECRET_KEY)}`,
  },
};
const mockRes = {};

// Mock next function
const mockNext = jest.fn();

describe('authenticateJWT', () => {
  it('should set user data in res.locals when valid token provided', () => {
    authenticateJWT(mockReq, mockRes, mockNext);
    expect(mockRes.locals.user).toEqual(mockUser);
    expect(mockNext).toHaveBeenCalledTimes(1);
  });

  it('should call next function even if no token provided', () => {
    const reqWithoutToken = { headers: {} };
    authenticateJWT(reqWithoutToken, mockRes, mockNext);
    expect(mockNext).toHaveBeenCalledTimes(1);
  });

  it('should call next function with error if token is invalid', () => {
    const reqWithInvalidToken = { headers: { authorization: 'Bearer invalidtoken' } };
    authenticateJWT(reqWithInvalidToken, mockRes, mockNext);
    expect(mockNext).toHaveBeenCalledTimes(1);
    expect(mockNext).toHaveBeenCalledWith(expect.any(UnauthorizedError));
  });
});

describe('ensureLoggedIn', () => {
  it('should call next function if user is logged in', () => {
    const reqWithUser = { headers: { authorization: `Bearer ${jwt.sign(mockUser, SECRET_KEY)}` } };
    ensureLoggedIn(reqWithUser, mockRes, mockNext);
    expect(mockNext).toHaveBeenCalledTimes(1);
  });

  it('should call next function with error if user is not logged in', () => {
    ensureLoggedIn({}, mockRes, mockNext);
    expect(mockNext).toHaveBeenCalledTimes(1);
    expect(mockNext).toHaveBeenCalledWith(expect.any(UnauthorizedError));
  });
});

describe('ensureCorrectUser', () => {
  it('should call next function if user is correct', () => {
    const reqWithCorrectUser = { params: { username: 'testuser' }, res: { locals: { user: mockUser } } };
    ensureCorrectUser(reqWithCorrectUser, mockRes, mockNext);
    expect(mockNext).toHaveBeenCalledTimes(1);
  });

  it('should call next function with error if user is incorrect', () => {
    const reqWithIncorrectUser = { params: { username: 'incorrectuser' }, res: { locals: { user: mockUser } } };
    ensureCorrectUser(reqWithIncorrectUser, mockRes, mockNext);
    expect(mockNext).toHaveBeenCalledTimes(1);
    expect(mockNext).toHaveBeenCalledWith(expect.any(UnauthorizedError));
  });
});
