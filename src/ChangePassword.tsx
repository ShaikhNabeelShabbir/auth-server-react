import React, { useState } from "react";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";
import "./styles.css"; // Import the CSS file for styling

interface User {
  username: string;
  password: string;
}

interface ChangePasswordProps {
  onChangePassword: (newPassword: string) => void;
  users: User[];
  currentUser: string;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({
  onChangePassword,
  users,
  currentUser,
}) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const validate = async (): Promise<boolean> => {
    const newErrors: { [key: string]: string } = {};
    const user = users.find((u) => u.username === currentUser);

    if (!user) {
      newErrors.currentPassword = "User not found";
    } else if (!(await bcrypt.compare(currentPassword, user.password))) {
      newErrors.currentPassword = "Current password is incorrect";
    }

    if (!newPassword) newErrors.newPassword = "New password is required";
    if (newPassword.length < 6)
      newErrors.newPassword = "Password must be at least 6 characters";
    if (newPassword !== confirmNewPassword)
      newErrors.confirmNewPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await validate()) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      onChangePassword(hashedPassword);
      alert("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      navigate("/");
    }
  };

  return (
    <div className="container">
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Current Password:</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          {errors.currentPassword && <span>{errors.currentPassword}</span>}
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {errors.newPassword && <span>{errors.newPassword}</span>}
        </div>
        <div>
          <label>Confirm New Password:</label>
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
          {errors.confirmNewPassword && (
            <span>{errors.confirmNewPassword}</span>
          )}
        </div>
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;
