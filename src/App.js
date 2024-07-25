import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [description, setDescription] = useState('');
  const [contractCode, setContractCode] = useState('');

  const handleGenerate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/generate', { description });
      setContractCode(response.data.contract_code);
    } catch (error) {
      console.error('Error generating contract:', error);
    }
  };

  return (
    <div className="App">
      <h1>Natural Language Smart Contract Generator</h1>
      <textarea
        placeholder="Describe your smart contract requirements here..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleGenerate}>Generate Contract</button>
      {contractCode && (
        <div>
          <h2>Generated Smart Contract</h2>
          <pre>{contractCode}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
