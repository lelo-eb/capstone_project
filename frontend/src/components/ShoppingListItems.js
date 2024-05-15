import React, { useState, useEffect } from 'react';

const ShoppingListItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch shopping list items from the backend
    const fetchShoppingListItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/shoppingListItems');
        if (!response.ok) {
          throw new Error('Failed to fetch shopping list items');
        }
        const data = await response.json();
        setItems(data.items); // Corrected: use data.items instead of data.item
      } catch (error) {
        console.error(error);
      }
    };

    fetchShoppingListItems();
  }, []);

  const handleDeleteItem = async (itemId) => {
    // Delete the item from the backend
    try {
      const response = await fetch(`http://localhost:5000/shoppingListItems/${itemId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete item');
      }
      // Remove the item from the local state
      setItems(items.filter(item => item.id !== itemId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
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
  );
};

export default ShoppingListItems;


