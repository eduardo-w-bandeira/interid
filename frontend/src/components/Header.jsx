import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <h1>Empowering Civil Actions with Transparency</h1>
      <p>Register, declare, and formalize your actions with confidence.</p>
      <div>
        <Link to="/register" className="btn">Get Started</Link>
        <Link to="/about" className="btn">Learn More</Link>
      </div>
    </header>
  );
};

export default Header;