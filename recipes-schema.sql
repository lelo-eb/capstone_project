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
    title VARCHAR(50) NOT NULL,
    description VARCHAR(30),
    ingredients TEXT NOT NULL,
    instructions TEXT NOT NULL,
    createdBy INTEGER REFERENCES users(id),
    createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the ratings table
CREATE TABLE ratings (
    id SERIAL PRIMARY KEY,
    recipeId INTEGER REFERENCES recipes(id),
    userId INTEGER REFERENCES users(id),
    rating NUMERIC(2,1) NOT NULL CHECK (rating >= 1 AND rating <= 5),
    createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the favorites table
CREATE TABLE favorites (
    id SERIAL PRIMARY KEY,
    recipeId INTEGER REFERENCES recipes(id),
    userId INTEGER REFERENCES users(id),
    createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the comments table
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    recipeId INTEGER REFERENCES recipes(id),
    userId INTEGER REFERENCES users(id),
    comment TEXT NOT NULL,
    createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the shopping_lists table
CREATE TABLE shopping_lists (
    id SERIAL PRIMARY KEY,
    userId INTEGER REFERENCES users(id),
    createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the shopping_list_items table
CREATE TABLE shopping_list_items (
    id SERIAL PRIMARY KEY,
    shoppingListId INTEGER REFERENCES shopping_lists(id),
    name VARCHAR NOT NULL,
    quantity VARCHAR,
    createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
