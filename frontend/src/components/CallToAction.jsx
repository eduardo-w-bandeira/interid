import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section>
      <h2>Join now for exclusive features</h2>
      <Link to="/register" className="btn">Register</Link>
      <Link to="/learn-more" className="btn">Learn More</Link>
    </section>
  );
};

export default CallToAction;