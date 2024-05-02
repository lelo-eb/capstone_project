import React from 'react';

const ShoppingListItem = ({ item, onDelete }) => {
  const handleDelete = () => {
    onDelete(item.id);
  };

  return (
    <div className="shopping-list-item">
      <p>{item.name}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default ShoppingListItem;
