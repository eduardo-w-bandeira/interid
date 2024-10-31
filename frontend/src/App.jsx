// frontend/src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage.jsx';
import MultiplyPage from '@/pages/MultiplyPage';
import Bla from '@/pages/Bla.jsx';
import IndividualSignupPage from '@/pages/IndividualSignupPage';
import SignupPage from '@/pages/SignupPage';
import LegalEntitySignupPage from '@/pages/LegalEntitySignupPage';
import LoginPage from '@/pages/LoginPage';
import NotFoundPage from '@/pages/NotFoundPage';
import ProfilePage from './pages/ProfilePage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/multiply" element={<MultiplyPage />} />
      <Route path="/bla" element={<Bla />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/individual-signup" element={<IndividualSignupPage />} />
      <Route path="/legal-entity-signup" element={<LegalEntitySignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;