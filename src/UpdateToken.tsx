import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface UpdateTokenProps {
  tokens: Token[];
  onUpdateToken: (address: string, balance: number) => void;
}

interface Token {
  address: string;
  balance: number;
}

const UpdateToken: React.FC<UpdateTokenProps> = ({ tokens, onUpdateToken }) => {
  const { address } = useParams<{ address: string }>();
  const token = tokens.find((token) => token.address === address);
  const [balance, setBalance] = useState<number>(token ? token.balance : 0);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateToken(address!, balance);
    navigate("/show-tokens");
  };

  return (
    <div className="update-token">
      <h2>Update Token Balance</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Address:
          <input type="text" value={address} disabled />
        </label>
        <label>
          Balance:
          <input
            type="number"
            value={balance}
            onChange={(e) => setBalance(Number(e.target.value))}
          />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateToken;
