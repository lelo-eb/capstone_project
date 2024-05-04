import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FavoriteRecipes from './components/FavoriteRecipes';
import ShoppingList from './components/ShoppingList';
import Logout from './components/Logout';
import Error404 from './components/Error404';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<RecipeList />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/favorite-recipes" element={<FavoriteRecipes />} />
          <Route path="/shopping-list" element={<ShoppingList />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
