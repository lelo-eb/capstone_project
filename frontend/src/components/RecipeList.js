import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    // Fetch list of recipes from the backend
    const fetchRecipes = async () => {
      try {
        const response = await fetch('/recipes');
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();
        setRecipes(data.recipes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    // Filter recipes based on search term
    const filtered = recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRecipes(filtered);
  }, [recipes, searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="dashboard">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search recipes"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="recipe-list">
        {filteredRecipes.map(recipe => (
          <div key={recipe.id} className="recipe-card">
            <Link to={`/recipes/${recipe.id}`}>
              <div className="recipe-image">
                <img src={recipe.picture} alt={recipe.title} />
              </div>
              <div className="recipe-details">
                <h3>{recipe.title}</h3>
                <p>By: {recipe.createdBy}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;

