// frontend/src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MultiplyForm from './MultiplyForm';
import HelloPage from './HelloPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MultiplyForm />} />
      <Route path="/hello" element={<HelloPage />} />
    </Routes>
  );
};

export default App;