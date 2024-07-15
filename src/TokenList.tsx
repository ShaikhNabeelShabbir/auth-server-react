import React from "react";

interface Token {
  address: string;
  balance: number;
}

interface TokenListProps {
  tokens: Token[];
}

const TokenList: React.FC<TokenListProps> = ({ tokens }) => {
  return (
    <div>
      <h2>Token List</h2>
      {tokens.length === 0 ? (
        <p>No tokens created yet.</p>
      ) : (
        <ul>
          {tokens.map((token, index) => (
            <li key={index}>
              <strong>Address:</strong> {token.address} |{" "}
              <strong>Balance:</strong> {token.balance}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TokenList;
