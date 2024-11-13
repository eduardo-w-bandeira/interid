// frontend/src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage.jsx';
import MultiplyPage from '@/pages/MultiplyPage.jsx';
import Bla from '@/pages/Bla.jsx';
import IndividualSignupPage from '@/pages/IndividualSignupPage.jsx';
import SignupPage from '@/pages/SignupPage.jsx';
import LegalEntitySignupPage from '@/pages/LegalEntitySignupPage.jsx';
import LoginPage from '@/pages/LoginPage.jsx';
import NotFoundPage from '@/pages/NotFoundPage.jsx';
import SelfProfilePage from '@/pages/SelfProfilePage.jsx';
import ThirdProfilePage from '@/pages/ThirdProfilePage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/multiply" element={<MultiplyPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/individual-signup" element={<IndividualSignupPage />} />
      <Route path="/legal-entity-signup" element={<LegalEntitySignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profile" element={<SelfProfilePage />} />
      <Route path="/:userId" element={<ThirdProfilePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;