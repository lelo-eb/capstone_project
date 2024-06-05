// AddRecipeForm.js
import React, { useState } from 'react';

const AddRecipeForm = ({ onClose, onSubmit }) => {
  const [formValues, setFormValues] = useState({
    title: '',
    picture: '',
    description: '',
    ingredients: '',
    instructions: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = () => {
    let errors = {};
    if (!formValues.title) errors.title = 'Title is required';
    if (!formValues.description) errors.description = 'Description is required';
    if (!formValues.ingredients) errors.ingredients = 'Ingredients are required';
    if (!formValues.instructions) errors.instructions = 'Instructions are required';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formValues);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Add Recipe</h2>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formValues.title}
            onChange={handleChange}
          />
          {errors.title && <p className="error">{errors.title}</p>}
        </div>
        <div className="form-group">
          <label>Picture URL</label>
          <input
            type="text"
            name="picture"
            value={formValues.picture}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formValues.description}
            onChange={handleChange}
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </div>
        <div className="form-group">
          <label>Ingredients</label>
          <textarea
            name="ingredients"
            value={formValues.ingredients}
            onChange={handleChange}
          />
          {errors.ingredients && <p className="error">{errors.ingredients}</p>}
        </div>
        <div className="form-group">
          <label>Instructions</label>
          <textarea
            name="instructions"
            value={formValues.instructions}
            onChange={handleChange}
          />
          {errors.instructions && <p className="error">{errors.instructions}</p>}
        </div>
        <button type="submit">Submit</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default AddRecipeForm;