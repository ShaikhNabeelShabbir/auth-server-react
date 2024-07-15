import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import ChangePassword from "./ChangePassword";
import TokenList from "./TokenList";
import "./styles.css"; // Import the CSS file for styling
import CreateToken from "./CreateToken";

interface User {
  username: string;
  password: string;
}

interface Token {
  address: string;
  balance: number;
}

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  const [loggedIn, setLoggedIn] = useState<boolean>(() => {
    const savedLoggedIn = sessionStorage.getItem("loggedIn");
    return savedLoggedIn ? JSON.parse(savedLoggedIn) : false;
  });

  const [username, setUsername] = useState<string>(() => {
    const savedUsername = sessionStorage.getItem("username");
    return savedUsername || "";
  });

  const [tokens, setTokens] = useState<Token[]>(() => {
    const savedTokens = sessionStorage.getItem("tokens");
    return savedTokens ? JSON.parse(savedTokens) : [];
  });

  useEffect(() => {
    sessionStorage.setItem("loggedIn", JSON.stringify(loggedIn));
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("tokens", JSON.stringify(tokens));
  }, [loggedIn, username, tokens]);
  // Clear sessionStorage and localStorage on component unmount (browser tab close)
  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      handleBeforeUnload();
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleBeforeUnload = () => {
    sessionStorage.clear();
    localStorage.clear();
  };
  const handleRegister = (user: User) => {
    const updatedUsers = [...users, user];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const handleLogin = (username: string) => {
    setLoggedIn(true);
    setUsername(username);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername("");
    setTokens([]);
    sessionStorage.clear();
  };
  const handleChangePassword = (newPassword: string) => {
    const updatedUsers = users.map((user) =>
      user.username === username ? { ...user, password: newPassword } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const handleCreateToken = (address: string, balance: number) => {
    const newToken: Token = { address, balance };
    const updatedTokens = [...tokens, newToken];
    setTokens(updatedTokens);
  };

  return (
    <Router>
      <div className="container">
        {loggedIn ? (
          <div className="center">
            <h2>Hello {username}</h2>
            <button onClick={handleLogout}>Logout</button>
            <Link to="/change-password">
              <button>Change Password</button>
            </Link>
            <Link to="/create-token">
              <button>Create Token</button>
            </Link>
            <Link to="/show-tokens">
              <button>Show Tokens</button>
            </Link>
            <Routes>
              <Route
                path="/create-token"
                element={<CreateToken onCreateToken={handleCreateToken} />}
              />
              <Route
                path="/show-tokens"
                element={<TokenList tokens={tokens} />}
              />{" "}
              <Route
                path="/change-password"
                element={
                  <ChangePassword
                    onChangePassword={handleChangePassword}
                    users={users}
                    currentUser={username}
                  />
                }
              />
            </Routes>
          </div>
        ) : (
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Sign Up</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </ul>
            </nav>
            <Routes>
              <Route
                path="/"
                element={<SignUp onRegister={handleRegister} />}
              />
              <Route
                path="/login"
                element={<Login users={users} onLogin={handleLogin} />}
              />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
