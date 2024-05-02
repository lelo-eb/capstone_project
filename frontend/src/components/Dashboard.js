import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('/recipes');
        setRecipes(response.data.recipes);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <h3>Recent Recipes</h3>
      {recipes.length === 0 ? (
        <p>No recipes yet.</p>
      ) : (
        <ul>
          {recipes.map(recipe => (
            <li key={recipe.id}>
              <p>{recipe.title}</p>
              <p>By: {recipe.createdBy}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;