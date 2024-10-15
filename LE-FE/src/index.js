import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Optional, for global styles
import App from './App'; // This imports your main App component
import reportWebVitals from './reportWebVitals'; // Optional
import 'bootstrap/dist/css/bootstrap.min.css'; // If using Bootstrap
import './index.css'; // If you have custom global styles


// Rendering the App component to the root DOM node
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // Ensure that you have a 'root' div in your index.html file
);

// Optional for measuring performance
reportWebVitals();
