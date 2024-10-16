import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="social-media">
        <a href="https://facebook.com">Facebook</a>
        <a href="https://twitter.com">Twitter</a>
        <a href="https://linkedin.com">LinkedIn</a>
      </div>
      <div className="links">
        <a href="/about">About</a>
        <a href="/features">Features</a>
        <a href="/support">Support</a>
      </div>
      <div className="contact-info">
        <p>Contact: info@interid.com</p>
        <p>FAQ</p>
        <p>Privacy Policy</p>
      </div>
    </footer>
  );
};

export default Footer;