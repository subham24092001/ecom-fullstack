import React, { useState } from "react";
import authAPI from "../API/authAPI";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await authAPI.post("/auth/login", { username, password });
    
    // Save token in localStorage
    localStorage.setItem("token", response.data.token);

    // Set token in Axios default headers
    authAPI.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;

    alert("Login successful!");
    navigate("/"); // redirect to home
  } catch (error) {
    console.error("Login error:", error);
    alert("Invalid credentials");
  }
};

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}
