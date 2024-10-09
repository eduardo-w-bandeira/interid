import { useState } from 'react';

function App() {
  const [number, setNumber] = useState('');
  
  const handleInputChange = (e) => {
    setNumber(e.target.value);
  };

  const handleSubmit = async () => {
    if (!number) {
      alert('Insert a number.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/multiply/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ number: Number(number) }), // Send the number as JSON
      });

      const data = await response.json();

      if (response.ok) {
        alert(`The result is: ${data.result}`);
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error('Error sending number:', error);
      alert('Error communicating with the backend.');
    }
  };

  return (
    <div>
      <h1>Number Multiplier</h1>
      <input
        type="number"
        value={number}
        onChange={handleInputChange}
        placeholder="Type a number"
      />
      <button onClick={handleSubmit}>Multiply by 2</button>
    </div>
  );
}

export default App;
