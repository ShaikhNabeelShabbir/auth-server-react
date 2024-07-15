import React, { useState } from "react";

interface CreateTokenProps {
  onCreateToken: (address: string, balance: number) => void;
}

const CreateToken: React.FC<CreateTokenProps> = ({ onCreateToken }) => {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateToken(address, balance);
    alert("Token created successfully");
    setAddress("");
    setBalance(0);
  };

  return (
    <div>
      <h2>Create Token</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Token Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Balance:</label>
          <input
            type="number"
            value={balance}
            onChange={(e) => setBalance(Number(e.target.value))}
            required
          />
        </div>
        <button type="submit">Create Token</button>
      </form>
    </div>
  );
};

export default CreateToken;
