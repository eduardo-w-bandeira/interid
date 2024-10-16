import React from 'react';
import Navbar from '@/components/Navbar';
import Descr from '@/components/Descr';
import Features from '@/components/Features';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import '@/styles/Home.css';

function Home() {
  return (
    <div className="App">
      <Navbar />
      <Descr />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
}

export default Home;
