import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './RecipeDetail.css';
import AddToShoppingListForm from './AddToShoppingListForm';

const RecipeDetail = () => {
  const [recipe, setRecipe] = useState(null);
  const [showForm, setShowForm] = useState(false);
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

  const handleAddToShoppingList = async (items) => {
    try {
        console.log('Items JSON:', JSON.stringify(items, null, 4));

        const response = await fetch('http://localhost:5000/shoppingListItems', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(items, null, 4), // Convert items to JSON string with 4 spaces indentation
        });

        if (!response.ok) {
            throw new Error('Failed to add items to shopping list');
        }

        // Assuming the response contains the newly created item
        const newItem = await response.json();
        console.log('Added item to shopping list:', newItem);
    } catch (error) {
        console.error(error);
    }
  };

  const handleAddToShoppingListClick = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

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
      {!showForm && (
        <button className="add-to-shopping-list-button" onClick={handleAddToShoppingListClick}>Add items to shopping list</button>
      )}
      {showForm && (
        <AddToShoppingListForm
          ingredients={ingredientsArray}
          onSubmit={handleAddToShoppingList}
          onClose={handleFormClose}
        />
      )}
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