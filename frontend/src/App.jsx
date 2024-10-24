// frontend/src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home.jsx';
import MultiplyForm from './pages/MultiplyForm';
import Bla from '@/pages/Bla.jsx';
import SignUp from './pages/SignUp';
// import Register from '@/pages/Register.jsx';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/multiply" element={<MultiplyForm />} />
      <Route path="/bla" element={<Bla />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default App;