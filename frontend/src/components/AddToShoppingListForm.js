import React, { useState } from 'react';
import './AddToShoppingListForm.css';

const AddToShoppingListForm = ({ ingredients, onSubmit, onClose }) => {
  const [formValues, setFormValues] = useState({});

  const handleChange = (ingredient, e) => {
    const updatedValues = {
      ...formValues,
      [ingredient]: e.target.value.trimStart() // Trim only leading spaces
    };
    setFormValues(updatedValues);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const itemsArray = Object.entries(formValues)
      .filter(([_, value]) => value && value !== '0') // Filter out empty or '0' quantities
      .map(([name, quantity]) => ({
        name,
        quantity: quantity.trim() // Ensure trailing spaces are trimmed
      }));
    if (itemsArray.length > 0) {
      onSubmit({ shoppingListItems: itemsArray }); // Wrap itemsArray in an object with key shoppingListItems
      onClose(); // Close the form after submission
    } else {
      alert('Please fill out valid quantities for items before submitting.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-to-shopping-list-form">
      <h2>Add Items to Shopping List</h2>
      {ingredients.map((ingredient, index) => (
        <div key={index}>
          <label>
            {ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}:
            <input
              type="text"
              value={formValues[ingredient] || ''}
              onChange={(e) => handleChange(ingredient, e)}
            />
          </label>
        </div>
      ))}
      <button type="submit" className="form-button">Add to Shopping List</button>
      <button type="button" className="form-button close-button" onClick={onClose}>Close</button>
    </form>
  );
};

export default AddToShoppingListForm;