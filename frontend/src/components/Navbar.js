import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/recipes" className="nav-link">Recipes</Link>
        </li>
        <li className="nav-item">
          <Link to="/favorite-recipes" className="nav-link">Favorite Recipes</Link>
        </li>
        <li className="nav-item">
          <Link to="/shopping-list" className="nav-link">Shopping List</Link>
        </li>
        <li className="nav-item">
          <Link to="/logout" className="nav-link">Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
