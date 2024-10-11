import React, { useState } from 'react';

const MultiplyForm = () => {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the number to the backend
    const response = await fetch('http://localhost:8000/api/multiply/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ number: parseFloat(number) }),
    });

    const data = await response.json();
    if (response.ok) {
      setResult(data.result);
      alert(`The result is: ${data.result}`);
    } else {
      alert('An error occurred: ' + data.error);
    }
  };

  return (
    <div>
      <h1>Multiply by Two</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Enter a number"
          required
        />
        <button type="submit">Multiply</button>
      </form>
      {result && <p>Result: {result}</p>}
    </div>
  );
};

export default MultiplyForm;
