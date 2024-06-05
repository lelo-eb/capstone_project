import React, { useState, useEffect } from 'react';
import './ShoppingListItems.css';

const ShoppingListItems = () => {
  const [items, setItems] = useState([]);
  const [formValues, setFormValues] = useState({ name: '', quantity: '' });

  useEffect(() => {
    // Fetch shopping list items from the backend
    const fetchShoppingListItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/shoppingListItems', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch shopping list items');
        }
        const data = await response.json();
        setItems(data.items);
      } catch (error) {
        console.error(error);
      }
    };

    fetchShoppingListItems();
  }, []);

  const handleDeleteItem = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/shoppingListItems/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to delete item');
      }
      setItems(items.filter(item => item.id !== itemId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, quantity } = formValues;

    if (!name || !quantity || quantity === '0') {
      alert('Please provide a valid name and quantity greater than 0.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/shoppingListItems', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ shoppingListItems: [{ name, quantity }] }),
      });

      if (!response.ok) {
        throw new Error('Failed to add item');
      }

      const newItem = await response.json();
      setItems([...items, ...newItem.items]);
      setFormValues({ name: '', quantity: '' });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="shopping-list-items-container">
      <div className="shopping-list">
        <h2>Shopping List Items</h2>
        {items.length === 0 ? (
          <p>No shopping list items at this time.</p>
        ) : (
          <ul>
            {items.map(item => (
              <li key={item.id}>
                <strong>{item.name}</strong>: {item.quantity}
                <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="add-item-form">
        <h2>Add Item</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Quantity:
              <input
                type="text"
                name="quantity"
                value={formValues.quantity}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <button type="submit">Add to Shopping List</button>
        </form>
      </div>
    </div>
  );
};

export default ShoppingListItems;