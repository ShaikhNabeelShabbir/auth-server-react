import React, { useState } from "react";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";
import "./styles.css";

interface User {
  username: string;
  password: string;
}

interface LoginProps {
  users: User[];
  onLogin: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ users, onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = users.find((u) => u.username === username);

    if (user && (await bcrypt.compare(password, user.password))) {
      onLogin(username);
      alert("user loged in successfully");

      navigate("/");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <span>{error}</span>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
