import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetail = ({ onAddToShoppingList }) => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  useEffect(() => {
    // Fetch recipe data from the backend using recipeId
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`/recipes/${recipeId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch recipe');
        }
        const data = await response.json();
        setRecipe(data.recipe);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  const handleIngredientToggle = (ingredient) => {
    if (selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(selectedIngredients.filter(item => item !== ingredient));
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const handleAddToShoppingList = () => {
    // Pass selected ingredients to the parent component (e.g., App) to add to the shopping list
    onAddToShoppingList(selectedIngredients);
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="recipe-detail">
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>
      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={selectedIngredients.includes(ingredient)}
              onChange={() => handleIngredientToggle(ingredient)}
            />
            <label>{ingredient}</label>
          </li>
        ))}
      </ul>
      <h3>Instructions</h3>
      <ol>
        {recipe.instructions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
      <button onClick={handleAddToShoppingList}>Add to Shopping List</button>
    </div>
  );
};

export default RecipeDetail;
