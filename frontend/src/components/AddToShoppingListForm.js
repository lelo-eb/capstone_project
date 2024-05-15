import React, { useState } from 'react';

const AddToShoppingListForm = ({ ingredients, onSubmit, onClose }) => {
  const [formValues, setFormValues] = useState({});
  const [formValid, setFormValid] = useState(false);

  const handleChange = (ingredient, e) => {
    const updatedValues = {
      ...formValues,
      [ingredient]: e.target.value
    };
    setFormValues(updatedValues);
    setFormValid(Object.values(updatedValues).every(value => value)); // Check if all fields are filled out
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const itemsArray = Object.entries(formValues)
    .filter(([_, value]) => value) // Remove items with quantity of 0
    .map(([name, quantity]) => ({ name, quantity }));
  if (itemsArray.length > 0) {
    onSubmit(itemsArray);
    onClose(); // Close the form after submission
  } else {
    alert('Please fill out all fields before submitting.');
  }
};

  return (
    <form onSubmit={handleSubmit}>
      {ingredients.map((ingredient, index) => (
        <div key={index}>
          <label>
            {ingredient}:
            <input type="number" min="0" value={formValues[ingredient] || ''} onChange={(e) => handleChange(ingredient, e)} required />
          </label>
        </div>
      ))}
      <button type="submit" disabled={!formValid}>Add to Shopping List</button>
    </form>
  );
};

export default AddToShoppingListForm;
