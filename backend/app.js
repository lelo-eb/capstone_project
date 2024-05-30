"use strict";

/** Express app for your recipe sharing application. */

const express = require("express");
const cors = require("cors");

const { NotFoundError } = require("./expressError");

const { authenticateJWT } = require("./middleware/auth");
const recipes = require("./routes/recipes");
const ratings = require("./routes/ratings");
const favorites = require("./routes/favorites");
const comments = require("./routes/comments");
const shoppingListItems = require("./routes/shoppingListItems");
const authRoutes = require("./routes/auth");

const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT);

app.use("/recipes", recipes);
app.use("/ratings", ratings);
app.use("/favorites", favorites);
app.use("/comments", comments);
app.use("/shoppingListItems", shoppingListItems);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  return res.json({ message: "Welcome to Recipe Sharing API" });
});

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
