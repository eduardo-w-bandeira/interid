// frontend/src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage.jsx';
import MultiplyPage from './pages/MultiplyPage';
import Bla from '@/pages/Bla.jsx';
import IndividualSignUpPage from './pages/IndividualSignUpPage';
import SelectionSignUpPage from './pages/SelectionSignUpPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/multiply" element={<MultiplyPage />} />
      <Route path="/bla" element={<Bla />} />
      <Route path="/selection_sign_up" element={<SelectionSignUpPage />} />
      <Route path="/individual_sign_up" element={<IndividualSignUpPage />} />
    </Routes>
  );
};

export default App;