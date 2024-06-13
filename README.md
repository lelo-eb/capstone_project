# Capstone Project: Recipe Sharing Platform

## Overview

This project is a Recipe Sharing Platform where users can sign up, log in, add their own recipes, view recipes added by others, favorite recipes, and manage a shopping list. The application is built using a modern JavaScript stack, including React for the frontend and Node.js with Express for the backend. The database used is PostgreSQL, and the entire application is deployed on Render.

## Features

- User Authentication (Signup, Login, Logout)
- Add, View, Edit, and Delete Recipes
- Favorite Recipes
- Manage Shopping List
- Rate Recipes
- Responsive UI

## Technologies Used

### Frontend
- React
- React Router
- Context API

### Backend
- Node.js
- Express.js
- PostgreSQL
- JWT for Authentication
- Bcrypt for Password Hashing

### Deployment
- Render for hosting

## Installation

### Prerequisites
- Node.js
- PostgreSQL

### Setup

1. Clone the repository:

   git clone https://github.com/lelo-eb/capstone_project.git
   cd your-repo

2. install dependencies
    
    npm install (frontend and backend)

3. run the server

    nodemon server.js

4. run the React application

    npm start

## Usage
- Sign Up: Create a new account.
- Log In: Log in to your account.
- Add Recipe: Share your favorite recipes.
- View Recipes: Browse recipes added by other users.
- Favorite Recipes: Save recipes to your favorites.
- Manage Shopping List: Add ingredients to your shopping list.
- Rate recipes

## API Endpoints
1. Authentication
POST /auth/signup: Register a new user
POST /auth/login: Log in a user
GET /auth/verify-token: Verify JWT token
2. Recipes
GET /recipes: Get all recipes
POST /recipes: Add a new recipe
GET /recipes/:id: Get a single recipe
PUT /recipes/:id: Update a recipe
DELETE /recipes/:id: Delete a recipe
3. Favorites
GET /favorites: Get all favorite recipes
POST /favorites: Add a recipe to favorites
DELETE /favorites/:id: Remove a recipe from favorites
4. Shopping List
GET /shopping-list: Get all shopping list items
POST /shopping-list: Add an item to the shopping list
DELETE /shopping-list/:id: Remove an item from the shopping list
5. Ratings
GET /ratings: Get average rating of recipes
POST /ratings: add a rating for a recipe

## Deployment
The application is deployed on Render. You can access it at:
https://capstone-project-6w7t.onrender.com/



