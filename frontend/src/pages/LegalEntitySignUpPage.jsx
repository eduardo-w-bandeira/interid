import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import LegalEntitySignUpForm from '@/components/LegalEntitySignUpForm';
import Footer from '@/components/Footer';

const LegalEntitySignUpPage = () => {

  return (
    <div className="legal-entity-sign-up-page">
      <Navbar />
      <LegalEntitySignUpForm />
      <Footer />
    </div>
  );
};

export default LegalEntitySignUpPage;