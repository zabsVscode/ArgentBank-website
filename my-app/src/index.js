import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Assurez-vous d'importer 'Routes'
import './index.css';
import App from './App';
import Signin from './Signin';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';

// Utilisez createRoot de la même manière que vous l'avez fait auparavant
const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
