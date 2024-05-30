import React, { useState, useEffect } from 'react';

const FavoriteRecipes = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from local storage
        const response = await fetch('http://localhost:5000/favorites', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch favorite recipes');
        }
        const data = await response.json();
        setFavoriteRecipes(data.favorites); // Update to data.favorites if your API returns { favorites }

        // Log the favoriteRecipes array to verify the data
        console.log(data.favorites);
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
            {/* Render other details of the recipe if available */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteRecipes;
