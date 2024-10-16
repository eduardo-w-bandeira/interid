import React from 'react';
import '@/styles/Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <p>&copy; 2024 InterId. All rights reserved.</p>
        <ul className="footer-links">
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms of Service</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
