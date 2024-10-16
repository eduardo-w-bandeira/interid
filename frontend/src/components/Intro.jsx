import React from 'react';

const Intro = () => {
  return (
    <section>
      <h2>Introduction to InterId</h2>
      <p>InterId is a platform that offers Open International ID, Public Declarations, and Formal Agreements.</p>
      <div className="features">
        <div className="feature">
          <img src="icon1.png" alt="Open International ID" />
          <p>Open International ID</p>
        </div>
        <div className="feature">
          <img src="icon2.png" alt="Public Declarations" />
          <p>Public Declarations</p>
        </div>
        <div className="feature">
          <img src="icon3.png" alt="Formal Agreements" />
          <p>Formal Agreements</p>
        </div>
      </div>
    </section>
  );
};

export default Intro;