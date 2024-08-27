import React, { useState } from "react";
import { useLogin } from "../Hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-lg">
        <h1 className="text-4xl font-bold text-center py-5 text-emerald-800 uppercase">
          Login
        </h1>
        {error && (
          <div className="text-red-500 font-semibold py-4 bg-red-100 border border-red-500 rounded">
            <span className="m-2">{error}</span>
          </div>
        )}
        <form className="space-y-4">
          <div>
            <label className="block text-2xl font-bold text-emerald-800">
              Email
            </label>
            <input
              type="email"
              className="w-full max-w-full outline outline-lime-100 rounded p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-2xl font-bold text-emerald-800">
              Password
            </label>
            <input
              type="password"
              className="w-full max-w-full outline outline-lime-100 rounded p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="pt-4 text-center">
            <button
              className="bg-emerald-800 text-white rounded py-2 px-4 font-semibold"
              onClick={handleLogin}
              disabled={isLoading}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
