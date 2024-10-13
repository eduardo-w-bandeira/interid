// frontend/src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MultiplyForm from './MultiplyForm';
import HelloPage from './HelloPage';
import BlaPage from './BlaPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MultiplyForm />} />
      <Route path="/hello" element={<HelloPage />} />
      <Route path="/bla" element={<BlaPage />} />
    </Routes>
  );
};

export default App;