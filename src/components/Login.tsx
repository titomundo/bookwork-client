import React, { useState } from "react";
import { useAuth } from "../utils/AuthContext";

import { useNavigate } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAuthenticated } = useAuth();

  const navigate = useNavigate();
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(email, password);

    if (isAuthenticated) {
      navigate("/dashboard");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        name="email"
        type="email"
        value={email}
        placeholder="E-mail"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        name="password"
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">login</button>
    </form>
  );
}
