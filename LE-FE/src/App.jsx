import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import ItemList from './Components/ItemList';
import SynonymReplacer from './Components/SynonymReplacer';
import QuizApp from './Components/QuizApp';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Logout from './Components/Logout';
import ProtectedDataComponent from './Components/ProtectedDataComponent';

function App() {
  // State to track if the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  // Effect to monitor changes to localStorage (for login or logout)
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  // Function to handle logout and trigger re-render
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false); // Update state to trigger re-render
  };

  return (
    <Router>
      <div>
        <h1>My App</h1>
        {/* Render the Logout button if authenticated */}
        {isAuthenticated && <Logout handleLogout={handleLogout} />}
        <Routes>
          {!isAuthenticated ? (
            <>
              <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          ) : (
            <>
              <Route path="/" element={<ProtectedDataComponent />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </div>
      <div>
        <ItemList />
        <SynonymReplacer />
        <QuizApp />
        <SignUp />
      </div>
    </Router>
  );
}

export default App;


/*import { useEffect, useState } from 'react'
import axios from 'axios'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ItemList from './Components/ItemList'
import SynonymReplacer from './Components/SynonymReplacer';
import QuizApp from './Components/QuizApp'
import Login from './Components/Login';  // Import your Login component
import SignUp from './Components/SignUp';
import Logout from './Components/Logout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedDataComponent from './Components/ProtectedDataComponent'; // Import the ProtectedDataComponent



function App() {
  const [count, setCount] = useState(0)
  const isAuthenticated = !!localStorage.getItem('token');
  return (
    <>
      <div>
        <h1>My App</h1>
        {!isAuthenticated ? (
          <Login /> // Show login if not authenticated
        ) : (
          <ProtectedDataComponent /> // Show protected data if authenticated
        )}
      </div>
      <div>
        <Logout />
        <ItemList />
        <SynonymReplacer />
        <QuizApp />
        <SignUp />
      </div>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
*/