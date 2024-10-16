import React from 'react';
import Header from '../components/Header';
import Intro from '../components/Intro';
import KeyFeatures from '../components/KeyFeatures';
import HowItWorks from '../components/HowItWorks';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';
import '@/styles/Home.module.css';

const Home = () => {
  return (
    <div>
      <Header />
      <Intro />
      <KeyFeatures />
      <HowItWorks />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Home;