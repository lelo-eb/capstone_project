import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './RecipeList.css'; // Import the CSS file

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://localhost:5000/recipes');
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();
        console.log(data); // Check the fetched data
        setRecipes(data.recipe); // Update to data.recipe
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchRecipes();
  }, []);

  useEffect(() => {
    // Filter recipes based on search term
    const filtered = recipes.filter(recipe =>
      recipe.recipe_title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRecipes(filtered);
  }, [recipes, searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  if (recipes.length === 0) {
    return <div>Loading...</div>;
  }

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
      <div className="recipe-grid">
        {filteredRecipes.length === 0 ? (
          <p>Sorry, there are no results matching your search.</p>
        ) : (
          filteredRecipes.map(recipe => (
            <div key={recipe.recipe_title} className="recipe-card">
              <Link to={`/recipes/${recipe.recipe_id}`} style={{ textDecoration: 'none' }}>
                <div className="recipe-image">
                  <img src={recipe.recipe_picture} alt={recipe.recipe_title} />
                </div>
                <div className="recipe-details">
                  <h3>{recipe.recipe_title}</h3>
                  <p>By: {recipe.created_by_username}</p>
                  <p>Average Rating: {typeof recipe.average_rating === 'string' ? parseFloat(recipe.average_rating).toFixed(2) : 'None'}</p>
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




