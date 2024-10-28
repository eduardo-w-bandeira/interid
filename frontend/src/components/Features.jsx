import React from 'react';

const Features = () => {
  return (
    <section className="py-12 px-5 text-center bg-white">
      <div className="max-w-6xl mx-auto">
        <h3 className="mb-10 text-2xl font-bold">Why Choose InterId?</h3>
        <div className="flex flex-wrap justify-center gap-5">
          <div className="bg-sky-500 text-white p-6 rounded-lg max-w-xs">
            <h4 className="mb-4 text-xl font-semibold">International ID</h4>
            <p>Receive a permanent, unique, and immutable identifier recognized globally for all civil actions.</p>
          </div>
          <div className="bg-sky-500 text-white p-6 rounded-lg max-w-xs">
            <h4 className="mb-4 text-xl font-semibold">Public Declarations</h4>
            <p>Make formal, public statements ensuring transparency and accountability for significant decisions.</p>
          </div>
          <div className="bg-sky-500 text-white p-6 rounded-lg max-w-xs">
            <h4 className="mb-4 text-xl font-semibold">Secure Formal Agreements</h4>
            <p>Keep your agreements private, unless all parties consent to making them public.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;