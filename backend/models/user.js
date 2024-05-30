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
    const query = `
      SELECT
        u.username,
        u.firstName,
        u.lastName,
        u.email,
        u.profilePicture,
        u.bio,
        u.password
      FROM users u
      WHERE u.username = $1
    `;
    
    const result = await db.query(query, [username]);
    const user = result.rows[0];

    if (user && await bcrypt.compare(password, user.password)) {
      delete user.password;
      return {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profilePicture: user.profilePicture,
        bio: user.bio
      };
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
    // Check for duplicate username
    const duplicateCheckQuery = `
      SELECT username
      FROM users
      WHERE username = $1
    `;
    const duplicateCheck = await db.query(duplicateCheckQuery, [username]);
  
    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Username already taken: ${username}`);
    }
  
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);
  
    // Insert new user into the database
    const insertUserQuery = `
      INSERT INTO users
      (username, password, firstName, lastName, email)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING username, firstName, lastName, email, profilePicture, bio, joinedOn
    `;
    const result = await db.query(insertUserQuery, [
      username,
      hashedPassword,
      firstName,
      lastName,
      email,
    ]);
    
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
