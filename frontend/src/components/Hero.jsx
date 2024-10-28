import React from 'react';
import '@/styles/Hero.css';

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-[#06bcec]/90 to-[#ffa724]/90 text-center text-white py-24 px-5">
        <h2 className='text-5xl'>A Global Platform for Formal Civil Actions</h2>
        <p className='text-lg mb-8 mt-3'>Register public declarations, create formal agreements, and access legal services, all with the security of your unique International ID.</p>
        <button className="bg-white text-sky-500 px-8 py-2.5 rounded-md cursor-pointer">Explore More</button>
    </section>
  );
};

export default Hero;
