import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddRecipeForm from './AddRecipeForm';
import './RecipeList.css';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showRefreshAlert, setShowRefreshAlert] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://localhost:5000/recipes');
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();
        setRecipes(data.recipes);
        setFilteredRecipes(data.recipes); // Initialize filteredRecipes with all recipes
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    const filtered = recipes.filter(recipe =>
      recipe.recipe_title && recipe.recipe_title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRecipes(filtered);
  }, [recipes, searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddRecipeClick = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  const handleFormSubmit = async (formValues) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formValues)
      });

      if (!response.ok) {
        throw new Error('Failed to add recipe');
      }

      const newRecipe = await response.json();
      setRecipes(prevRecipes => [...prevRecipes, newRecipe.recipe]);
      setShowForm(false);
      setShowRefreshAlert(true);
      console.log('New recipe added:', newRecipe.recipe);
    } catch (error) {
      console.error('Form submit error:', error);
    }
  };

  if (!recipes) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      {showRefreshAlert && (
        <div className="alert">
          <span>Recipe added successfully! Refresh the page to see your recipe.</span>
        </div>
      )}
      <div className="header">
        <button className="add-recipe-button" onClick={handleAddRecipeClick}>Add Recipe</button>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search recipes"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      {showForm && (
        <AddRecipeForm onClose={handleFormClose} onSubmit={handleFormSubmit} />
      )}
      <div className="recipe-grid">
        {filteredRecipes.length === 0 ? (
          <p>Sorry, there are no results matching your search.</p>
        ) : (
          filteredRecipes.map(recipe => (
            <div key={recipe.recipe_id || recipe.id} className="recipe-card">
              <Link to={`/recipes/${recipe.recipe_id || recipe.id}`} style={{ textDecoration: 'none' }}>
                <div className="recipe-image">
                  <img src={recipe.recipe_picture || recipe.picture} alt={recipe.recipe_title || recipe.title} />
                </div>
                <div className="recipe-details">
                  <h3>{recipe.recipe_title || recipe.title}</h3>
                  <p>By: {recipe.created_by_username || recipe.createdby}</p>
                  <p>Average Rating: {recipe.average_rating ? parseFloat(recipe.average_rating).toFixed(2) : 'None'}</p>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecipeList;