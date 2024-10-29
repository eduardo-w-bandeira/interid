import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-5 text-center">
      <div className="footer-container">
        <p>&copy; 2024 InterId. All rights reserved.</p>
        <ul className="list-none flex justify-center mt-2">
          <li className="mx-2"><a href="#" className="text-blue-400 no-underline">Privacy Policy</a></li>
          <li className="mx-2"><a href="#" className="text-blue-400 no-underline">Terms of Service</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;