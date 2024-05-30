import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FavoriteRecipes from './components/FavoriteRecipes';
import ShoppingListItems from './components/ShoppingListItems';
import Logout from './components/Logout';
import Error404 from './components/Error404';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:5000/auth/verify-token', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem('token');
        }
      })
      .catch(err => {
        console.error('Token verification failed:', err);
        localStorage.removeItem('token');
      });
    }
  }, []);

  return (
    <Router>
      {isLoggedIn && <Navbar />}
      <Routes>
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/" replace={true} />
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            isLoggedIn ? (
              <Navigate to="/" replace={true} />
            ) : (
              <SignUp setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />
        {!isLoggedIn ? (
          <Route
            path="/*"
            element={
              <div>
                <h2>Please log in or sign up</h2>
                <p>
                  Don't have an account? <a href="/signup">Sign up here</a>
                </p>
              </div>
            }
          />
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<RecipeList />} />
            <Route path="/recipes/:id" element={<RecipeDetail />} />
            <Route path="/favorite-recipes" element={<FavoriteRecipes />} />
            <Route path="/shopping-list-items" element={<ShoppingListItems />} />
            <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="*" element={<Error404 />} />
          </>
        )}
      </Routes>
      {isLoggedIn && <Footer />}
    </Router>
  );
}

export default App;