import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
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
      <div className="recipe-list">
        {filteredRecipes.map(recipe => (
          <div key={recipe.title} className="recipe-card"> {/* Assuming title is unique */}
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


