import React from 'react';

const KeyFeatures = () => {
  return (
    <section>
      <h2>Key Features</h2>
      <div className="feature">
        <img src="icon1.png" alt="Open International ID" />
        <p>Open International ID: Short description.</p>
      </div>
      <div className="feature">
        <img src="icon2.png" alt="Public Declarations" />
        <p>Public Declarations: Highlight examples.</p>
      </div>
      <div className="feature">
        <img src="icon3.png" alt="Formal Agreements" />
        <p>Formal Agreements: Explain privacy and consent features.</p>
      </div>
    </section>
  );
};

export default KeyFeatures;