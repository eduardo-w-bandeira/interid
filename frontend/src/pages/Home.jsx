import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Engage from '@/components/Engage';
import Footer from '@/components/Footer';
import '@/styles/Home.css';

function Home() {
  return (
    <div className="Home">
      <Navbar />
      <Hero />
      <Features />
      <Engage />
      <Footer />
    </div>
  );
}

export default Home;
