import React, { useState } from "react";
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
import "./styles.css"; // Import the CSS file for styling

interface User {
  username: string;
  password: string;
}

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");

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
  };

  const handleChangePassword = (newPassword: string) => {
    const updatedUsers = users.map((user) =>
      user.username === username ? { ...user, password: newPassword } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  return (
    <Router>
      <div className="container">
        {loggedIn ? (
          <div>
            <h2>Hello {username}</h2>
            <button onClick={handleLogout}>Logout</button>
            <Link to="/change-password">
              <button>Change Password</button>
            </Link>
          </div>
        ) : (
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
        )}
        <Routes>
          <Route path="/" element={<SignUp onRegister={handleRegister} />} />
          <Route
            path="/login"
            element={<Login users={users} onLogin={handleLogin} />}
          />
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
    </Router>
  );
};

export default App;
