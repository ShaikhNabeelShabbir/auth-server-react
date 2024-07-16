import React from "react";
import "./TokenList.css";

interface Token {
  address: string;
  balance: number;
}

interface TokenListProps {
  tokens: Token[];
}

const TokenList: React.FC<TokenListProps> = ({ tokens }) => {
  return (
    <div className="token-list">
      <h2>Your Tokens</h2>
      {tokens.length > 0 ? (
        <ul>
          {tokens.map((token, index) => (
            <li key={index} className="token-item">
              <span className="token-address">Address: {token.address}</span>
              <span className="token-balance">Balance: {token.balance}</span>
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
