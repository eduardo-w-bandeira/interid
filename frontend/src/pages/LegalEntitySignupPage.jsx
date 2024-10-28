import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import LegalEntitySignupForm from '@/components/LegalEntitySignupForm';
import Footer from '@/components/Footer';

const LegalEntitySignupPage = () => {

  return (
    <div>
      <Navbar />
      <LegalEntitySignupForm />
      <Footer />
    </div>
  );
};

export default LegalEntitySignupPage;