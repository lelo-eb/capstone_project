import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './RecipeDetail.css';
import AddToShoppingListForm from './AddToShoppingListForm';

const RecipeDetail = () => {
  const [recipe, setRecipe] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [userRating, setUserRating] = useState(null); // New state to store user's rating
  const { id } = useParams();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipeResponse = await fetch(`https://capstone-project-5-e3an.onrender.com/recipes/${id}`);
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

  useEffect(() => {
    // Check if the user has rated the recipe
    const storedRating = localStorage.getItem(`userRating_${id}`);
    if (storedRating) {
      setUserRating(parseInt(storedRating));
    }
  }, [id]);

  const handleAddToShoppingList = async (items) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://capstone-project-5-e3an.onrender.com/shoppingListItems', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ shoppingListItems: items }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add items to shopping list');
      }
  
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

  const handleAddToFavorites = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = JSON.parse(atob(token.split('.')[1])).id;

      const response = await fetch('https://capstone-project-5-e3an.onrender.com/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ recipeId: id, userId }),
      });

      if (response.status === 400) {
        console.log('Recipe is already in favorites');
      } else if (!response.ok) {
        throw new Error('Failed to add to favorites');
      } else {
        const favorite = await response.json();
        console.log('Added to favorites:', favorite);
        setSuccessMessage('Recipe added to favorites successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRateRecipe = async (rating) => {
    try {
      // Check if the user has already rated the recipe
      if (userRating) {
        console.log('You have already rated this recipe.');
        return;
      }

      // If the user hasn't rated the recipe, proceed with rating
      const token = localStorage.getItem('token');
      const userId = JSON.parse(atob(token.split('.')[1])).id;
      const response = await fetch('https://capstone-project-5-e3an.onrender.com/ratings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ recipeId: id, rating, userId }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to rate recipe');
      }

      const ratedRecipe = await response.json();
      console.log('Rated recipe:', ratedRecipe);

      // Update state to reflect user's rating
      setUserRating(rating);

      // Update the average rating of the recipe
      // You might need to fetch the updated recipe data here
      // and then set it to the state
    } catch (error) {
      console.error(error);
    }
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  const ingredientsArray = recipe.recipe_ingredients.split(',').map(ingredient => ingredient.trim());

  return (
    <div className="recipe-detail-container">
      {successMessage && <div className="success-message">{successMessage}</div>}
      <h2 className="recipe-title">{recipe.recipe_title}</h2>
      <img src={recipe.recipe_picture} alt={recipe.recipe_title} className="recipe-image" />
      <div className="rating">
        <h3>Rating:</h3>
        <p>{typeof recipe.average_rating === 'string' ? parseFloat(recipe.average_rating).toFixed(2) : 'None'}</p>
        {/* Render rating buttons if user hasn't rated yet */}
        {!userRating && (
          <div>
            <button onClick={() => handleRateRecipe(1)}>1</button>
            <button onClick={() => handleRateRecipe(2)}>2</button>
            <button onClick={() => handleRateRecipe(3)}>3</button>
            <button onClick={() => handleRateRecipe(4)}>4</button>
            <button onClick={() => handleRateRecipe(5)}>5</button>
          </div>
        )}
        {/* Show user's rating if they have rated */}
        {userRating && <p>You rated this recipe: {userRating}</p>}
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
      <button className="add-to-favorites-button" onClick={handleAddToFavorites}>Add to Favorites</button>
    </div>
  );
};

export default RecipeDetail;