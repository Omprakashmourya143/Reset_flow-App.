// index.js (or root entry point)
import React from 'react';
import ReactDOM from 'react-dom/client';  // React 18
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));  // React 18

root.render(
  <React.StrictMode>
    <BrowserRouter>  {/* Make sure your app is wrapped in BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
