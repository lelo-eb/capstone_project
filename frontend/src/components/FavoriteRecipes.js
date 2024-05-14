import React, { useState, useEffect } from 'react';

const FavoriteRecipes = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    // Fetch favorite recipes from the backend API
    const fetchFavoriteRecipes = async () => {
      try {
        const response = await fetch('/favorites');
        if (!response.ok) {
          throw new Error('Failed to fetch favorite recipes');
        }
        const data = await response.json();
        setFavoriteRecipes(data.favoriteRecipes);
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