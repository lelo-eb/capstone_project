-- Create the users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(60) UNIQUE NOT NULL,
    password VARCHAR(20) NOT NULL,
    firstName VARCHAR(30),
    lastName VARCHAR(30),
    profilePicture VARCHAR,
    bio TEXT,
    joinedOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the recipes table
CREATE TABLE recipes (
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    picture VARCHAR,
    description VARCHAR,
    ingredients TEXT NOT NULL,
    instructions TEXT NOT NULL,
    createdBy INTEGER REFERENCES users(id),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the ratings table
CREATE TABLE ratings (
    id SERIAL PRIMARY KEY,
    recipeId INTEGER REFERENCES recipes(id),
    userId INTEGER REFERENCES users(id),
    rating NUMERIC(2,1) NOT NULL CHECK (rating >= 1 AND rating <= 5)
);

-- Create the favorites table
CREATE TABLE favorites (
    id SERIAL PRIMARY KEY,
    recipeId INTEGER REFERENCES recipes(id),
    userId INTEGER REFERENCES users(id)
);

-- Fix syntax error in comments table creation
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    recipeId INTEGER REFERENCES recipes(id),
    userId INTEGER REFERENCES users(id),
    comment TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Fix syntax error in shopping_lists table creation
CREATE TABLE shopping_lists (
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    userId INTEGER REFERENCES users(id),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the shopping_list_items table
CREATE TABLE shopping_list_items (
    id SERIAL PRIMARY KEY,
    shoppingListId INTEGER REFERENCES shopping_lists(id),
    name VARCHAR NOT NULL,
    quantity VARCHAR
);
