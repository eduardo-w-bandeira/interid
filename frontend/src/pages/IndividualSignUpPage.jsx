import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import IndividualSignupForm from '@/components/IndividualSignupForm';
import Footer from '@/components/Footer';

const IndividualSignupPage = () => {

  return (
    <div>
      <Navbar />
      <IndividualSignupForm />
      <Footer />
    </div>
  );
};

export default IndividualSignupPage;