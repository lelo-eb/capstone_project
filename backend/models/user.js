// models/user.js
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { BadRequestError, UnauthorizedError, NotFoundError } = require("../expressError");

class User {
  /** Authenticate user with username, password.
   *
   * Returns { username, firstName, lastName, email, profilePicture, bio }
   *
   * Throws UnauthorizedError if user not found or wrong password.
   **/
  static async authenticate(username, password) {
    const result = await db.query(
      `SELECT username,
              firstName,
              lastName,
              email,
              profilePicture,
              bio,
              password
       FROM users
       WHERE username = $1`,
      [username],
    );
    const user = result.rows[0];

    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        delete user.password;
        return user;
      }
    }

    throw new UnauthorizedError("Invalid username/password");
  }

  /** Register user with data.
   *
   * Returns { username, firstName, lastName, email, profilePicture, bio }
   *
   * Throws BadRequestError on duplicates.
   **/
  static async register({ username, password, firstName, lastName, email }) {
    const duplicateCheck = await db.query(
      `SELECT username
       FROM users
       WHERE username = $1`,
      [username],
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Username already taken: ${username}`);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await db.query(
      `INSERT INTO users
       (username,
        password,
        firstName,
        lastName,
        email)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING username, firstName, lastName, email, profilePicture, bio, joinedOn`,
      [username, hashedPassword, firstName, lastName, email],
    );
    const user = result.rows[0];

    return user;
  }

  /** Given a username, return data about user.
   *
   * Returns { username, firstName, lastName, email, profilePicture, bio }
   *   (note: no password)
   *
   * Throws NotFoundError if user not found.
   **/
  static async getByUsername(username) {
    const result = await db.query(
      `SELECT username,
              firstName,
              lastName,
              email,
              profilePicture,
              bio,
              joinedOn
       FROM users
       WHERE username = $1`,
      [username],
    );

    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    return user;
  }
}

module.exports = User;
