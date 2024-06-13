// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import jwt from 'jsonwebtoken';
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
import UserContext from './UserContext';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('https://capstone-project-6w7t.onrender.com/auth/verify-token', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        if (response.ok) {
          const { username, id } = jwt.decode(token);
          setCurrentUser({ username, id });
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

  const login = async (loginData) => {
    try {
      const response = await fetch('https://capstone-project-6w7t.onrender.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        const { username, id } = jwt.decode(data.token);
        setCurrentUser({ username, id });
        setIsLoggedIn(true);
        return { success: true };
      } else {
        return { success: false, errors: data.errors };
      }
    } catch (err) {
      console.error('Login failed:', err);
      return { success: false, errors: [err.message] };
    }
  };

  const signup = async (signupData) => {
    try {
      const response = await fetch('https://capstone-project-6w7t.onrender.com/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupData)
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        const { username, id } = jwt.decode(data.token);
        setCurrentUser({ username, id });
        setIsLoggedIn(true);
        return { success: true };
      } else {
        return { success: false, errors: data.errors };
      }
    } catch (err) {
      console.error('Signup failed:', err);
      return { success: false, errors: [err.message] };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('token');
  };

  if (currentUser === null && isLoggedIn) return <div>Loading...</div>;

  return (
    <Router>
      <UserContext.Provider value={{ currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn }}>
        {isLoggedIn && <Navbar />}
        <Routes>
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/" replace={true} /> : <Login login={login} />}
          />
          <Route
            path="/signup"
            element={isLoggedIn ? <Navigate to="/" replace={true} /> : <SignUp signup={signup} />}
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
              <Route path="/logout" element={<Logout logout={logout} />} />
              <Route path="*" element={<Error404 />} />
            </>
          )}
        </Routes>
        {isLoggedIn && <Footer />}
      </UserContext.Provider>
    </Router>
  );
}

export default App;