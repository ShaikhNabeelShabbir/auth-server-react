import React from "react";
import { Link } from "react-router-dom";
import "./TokenList.css";

interface Token {
  address: string;
  balance: number;
}

interface TokenListProps {
  tokens: Token[];
  onDeleteToken: (address: string) => void;
  onUpdateToken: (address: string, balance: number) => void; // Add this line
}

const TokenList: React.FC<TokenListProps> = ({ tokens, onDeleteToken }) => {
  return (
    <div className="token-list">
      <h2>Your Tokens</h2>
      {tokens.length > 0 ? (
        <ul>
          {tokens.map((token, index) => (
            <li key={index} className="token-item">
              <span className="token-address">Address: {token.address}</span>
              <span className="token-balance">Balance: {token.balance}</span>
              <Link to={`/update-token/${token.address}`}>
                <button>Update</button>
              </Link>
              <button onClick={() => onDeleteToken(token.address)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tokens created.</p>
      )}
    </div>
  );
};

export default TokenList;
