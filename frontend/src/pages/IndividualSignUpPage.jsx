import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import IndividualSignUpForm from '@/components/IndividualSignUpForm';
import Footer from '@/components/Footer';

const IndividualSignUpPage = () => {

  return (
    <div>
      <Navbar />
      <IndividualSignUpForm />
      <Footer />
    </div>
  );
};

export default IndividualSignUpPage;