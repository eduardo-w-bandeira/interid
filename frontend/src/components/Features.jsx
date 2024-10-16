import React from 'react';
import '@/styles/Features.css';

const Features = () => {
  return (
    <section className="features">
      <div className="container">
        <h3>Why Choose InterId?</h3>
        <div className="features-grid">
          <div className="feature-box">
            <h4>Open International ID</h4>
            <p>Receive a permanent, unique, and immutable identifier recognized globally for all civil actions.</p>
          </div>
          <div className="feature-box">
            <h4>Public Declarations</h4>
            <p>Make formal, public statements ensuring transparency and accountability for significant decisions.</p>
          </div>
          <div className="feature-box">
            <h4>Secure Formal Agreements</h4>
            <p>Keep your agreements private, unless all parties consent to making them public.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
