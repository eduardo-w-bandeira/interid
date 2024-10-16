import React from 'react';
import '@/styles/Navbar.css';

const Navbar = () => {
  return (
    <header>
      <nav className="navbar">
        <div className="logo">
          <h1>InterId</h1>
        </div>
        <ul className="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">Features</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
        <div className="auth-buttons">
          <button className="btn login">Login</button>
          <button className="btn signup">Sign Up</button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
