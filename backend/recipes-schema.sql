CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    profilePicture VARCHAR,
    bio TEXT,
    joinedOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
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
CREATE TABLE ratings (
    id SERIAL PRIMARY KEY,
    recipeId INTEGER REFERENCES recipes(id),
    userId INTEGER REFERENCES users(id),
    rating NUMERIC(2,1) NOT NULL CHECK (rating >= 1 AND rating <= 5)
);
CREATE TABLE favorites (
    id SERIAL PRIMARY KEY,
    recipeId INTEGER REFERENCES recipes(id),
    userId INTEGER REFERENCES users(id)
);
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    recipeId INTEGER REFERENCES recipes(id),
    userId INTEGER REFERENCES users(id),
    comment TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE shopping_list_items (
    id SERIAL PRIMARY KEY,
    userId INTEGER REFERENCES users(id),
    name VARCHAR NOT NULL,
    quantity VARCHAR,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
