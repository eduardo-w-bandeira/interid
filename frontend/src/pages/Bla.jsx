import React from 'react';
import { useParams } from 'react-router-dom';

const Bla = () => {
  const { userId } = useParams();

  return (
    <div>
      <h1>Item ID: {userId}</h1>
    </div>
  );
};

export default Bla;