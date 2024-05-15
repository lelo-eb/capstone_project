// RecipeDetail.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './RecipeDetail.css';

const RecipeDetail = () => {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipeResponse = await fetch(`http://localhost:5000/recipes/${id}`);
        if (!recipeResponse.ok) {
          throw new Error('Failed to fetch recipe');
        }
        const recipeData = await recipeResponse.json();
        setRecipe(recipeData);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  const ingredientsArray = recipe.recipe_ingredients.split(',').map(ingredient => ingredient.trim());

  return (
    <div className="recipe-detail-container">
      <h2 className="recipe-title">{recipe.recipe_title}</h2>
      <img src={recipe.recipe_picture} alt={recipe.recipe_title} className="recipe-image" />
      <div className="rating">
        <h3>Rating:</h3>
        <p>{typeof recipe.average_rating === 'string' ? parseFloat(recipe.average_rating).toFixed(2) : 'None'}</p>
      </div>
      <div className="ingredients-list">
        <h3>Ingredients:</h3>
        <ul>
          {ingredientsArray.map((ingredient, index) => (
            <li key={index}>{ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}</li>
          ))}
        </ul>
      </div>
      <div className="recipe-description">
        <h3>Recipe Description:</h3>
        <p>{recipe.recipe_description}</p>
      </div>
      <div className="recipe-instructions">
        <h3>Instructions:</h3>
        <p>{recipe.recipe_instructions}</p>
      </div>
      <div className="recipe-info">
        <div>
          <h3>Created By:</h3>
          <p className="created-by">{recipe.created_by_username}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;