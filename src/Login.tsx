// Login.tsx

import React, { useState } from 'react';
import bcrypt from 'bcryptjs';
import { useNavigate } from 'react-router-dom';
import './styles.css'; // Import the CSS file for styling

interface User {
  username: string;
  password: string;
}

interface LoginProps {
  users: User[];
  onLogin: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ users, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = users.find(u => u.username === username);
    if (user && await bcrypt.compare(password, user.password)) {
      alert('User logged in successfully');
      onLogin(username);
      navigate('/');
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="container"> {/* Apply container class for centering and styling */}
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
