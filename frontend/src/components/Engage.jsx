import React from 'react';
import { Link } from 'react-router-dom';

const Engage = () => {
  return (
    <section className="text-center py-12 bg-amber-500 text-white">
      <h3 className="text-2xl font-semibold mb-6">Ready to Formalize Your Civil Actions?</h3>
      <Link to="/signup">
        <button className="bg-white text-orange-600 hover:bg-gray-200 py-2 px-8 rounded transition duration-200">
          Get Started with InterId
        </button>
      </Link>
    </section>
  );
};

export default Engage;