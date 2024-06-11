import React, { useState, useEffect } from 'react';
import './FavoriteRecipes.css'; // Import the CSS file for styling

const FavoriteRecipes = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      try {
        const token = localStorage.getItem('token');
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
        setFavoriteRecipes(data.favorites);
      } catch (error) {
        console.error('Error fetching favorite recipes:', error);
      }
    };

    fetchFavoriteRecipes();
  }, []);

  const handleRemoveFavorite = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/favorites/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to remove from favorites');
      }
  
      // Filter out the removed recipe from the state
      const updatedFavorites = favoriteRecipes.filter(favorite => favorite.id !== id);
      setFavoriteRecipes(updatedFavorites);
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };  

  return (
    <div className="favorite-recipes-container">
      <h2>Favorite Recipes</h2>
      <ul className="favorite-recipes-list">
        {favoriteRecipes.map((recipe) => (
          <li key={recipe.id} className="favorite-recipe-item">
            <h3>{recipe.title}</h3>
            <button className="remove-button" onClick={() => handleRemoveFavorite(recipe.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteRecipes;
