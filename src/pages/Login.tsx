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
    <div className="flex justify-center items-center text-gray-600 h-screen">
      <form
        className="w-lg my-4 text-left flex flex-col gap-2 text-xs bg-white shadow p-4 rounded-md"
        onSubmit={handleLogin}
      >
        <h3 className="text-base font-semibold text-center mb-5">User Login</h3>
        <div className="flex flex-col">
          <label className="font-medium ml-0.5" htmlFor="email">
            E-mail:
          </label>
          <input
            name="email"
            type="email"
            value={email}
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
            className="px-2 py-0.5 border rounded-md border-gray-200 bg-gray-50"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium ml-0.5" htmlFor="password">
            Password:
          </label>
          <input
            name="password"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="px-2 py-0.5 border rounded-md border-gray-200 bg-gray-50"
          />
        </div>
        <button
          type="submit"
          className="bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-700 font-medium rounded-md py-2 text-center w-full block"
        >
          Login
        </button>
      </form>
    </div>
  );
}
