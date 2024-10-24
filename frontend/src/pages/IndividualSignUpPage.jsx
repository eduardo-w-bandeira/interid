import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import IndividualSignUpForm from '../components/IndividualSignUpForm';
import Footer from '@/components/Footer';
import '@/styles/Global.css';

const IndividualSignUpPage = () => {

  return (
    <div className="SignUpPage">
      <Navbar />
      <IndividualSignUpForm />
      <Footer />
    </div>
  );
};

export default IndividualSignUpPage;