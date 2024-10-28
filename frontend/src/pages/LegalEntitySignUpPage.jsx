import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import LegalEntitySignUpForm from '@/components/LegalEntitySignUpForm';
import Footer from '@/components/Footer';

const LegalEntitySignUpPage = () => {

  return (
    <div>
      <Navbar />
      <LegalEntitySignUpForm />
      <Footer />
    </div>
  );
};

export default LegalEntitySignUpPage;