import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Signin from './src/components/Signin';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="main-nav">
          <Link to="/">
            <img
              className="main-nav-logo-image"
              src="./img/argentBankLogo.png"
              alt="Argent Bank Logo"
            />
            <h1 className="sr-only">Argent Bank</h1>
          </Link>
          <div>
            <Link to="/signin" className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              Sign In
            </Link>
          </div>
        </nav>
        <main>
          {/* Le reste de votre contenu */}
        </main>
        <footer className="footer">
          <p className="footer-text">Copyright 2020 Argent Bank</p>
        </footer>
      </div>
      <Route path="/signin" component={SignIn} />
    </Router>
  );
}

export default App;
