import React from 'react';
import { Link } from 'react-router-dom';
import '@/styles/Engage.css';

const Engage = () => {
  return (
    <section className="engage">
      <h3>Ready to Formalize Your Civil Actions?</h3>
      <Link to="/selection_sign_up">
      <button className="btn engage-btn">Get Started with InterId</button>
      </Link>
    </section>
  );
};

export default Engage;
