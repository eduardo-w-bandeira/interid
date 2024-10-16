// frontend/src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import MultiplyForm from './pages/MultiplyForm';
import Bla from './pages/Bla.jsx';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/multiply" element={<MultiplyForm />} />
      <Route path="/bla" element={<Bla />} />
    </Routes>
  );
};

export default App;