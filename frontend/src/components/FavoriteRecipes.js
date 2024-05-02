import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FavoriteRecipes = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    // Fetch favorite recipes from the backend API
    const fetchFavoriteRecipes = async () => {
      try {
        const response = await axios.get('/favorites');
        setFavoriteRecipes(response.data.favoriteRecipes);
      } catch (error) {
        console.error('Error fetching favorite recipes:', error);
      }
    };

    fetchFavoriteRecipes();
  }, []);

  return (
    <div>
      <h2>Favorite Recipes</h2>
      <ul>
        {favoriteRecipes.map((recipe) => (
          <li key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
            {/* Render other details of the recipe */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteRecipes;
