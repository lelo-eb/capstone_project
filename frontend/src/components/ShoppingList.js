import React, { useState, useEffect } from 'react';

const ShoppingList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch shopping list items from the backend
    const fetchShoppingList = async () => {
      try {
        const response = await fetch('/shopping-list');
        if (!response.ok) {
          throw new Error('Failed to fetch shopping list items');
        }
        const data = await response.json();
        setItems(data.items);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchShoppingList();
  }, []);

  const handleDeleteItem = async (itemId) => {
    // Delete the item from the backend
    try {
      const response = await fetch(`/shopping-list/${itemId}`, {
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="shopping-list">
      <h2>Shopping List</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingList;
