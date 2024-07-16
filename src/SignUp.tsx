import React, { useState } from 'react';
import bcrypt from 'bcryptjs';
import { useNavigate } from 'react-router-dom';
import './styles.css';

interface User {
  username: string;
  password: string;
}

interface SignUpProps {
  onRegister: (user: User) => void;
}

const SignUp: React.FC<SignUpProps> = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validate = (): boolean => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    onRegister({ username, password: hashedPassword });
    alert("user created successfully");
    navigate('/login');
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
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
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <span>{error}</span>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
