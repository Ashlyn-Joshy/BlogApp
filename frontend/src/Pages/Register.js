import React, { useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(name, email, password);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-lg">
        <h1 className="text-4xl font-bold text-center py-5 text-emerald-800 uppercase">
          Create An Account
        </h1>
        <form className="space-y-4">
          <div>
            <label className="block text-2xl font-bold text-emerald-800">
              Name
            </label>
            <input
              type="text"
              className="w-full max-w-full outline outline-lime-100 rounded p-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
