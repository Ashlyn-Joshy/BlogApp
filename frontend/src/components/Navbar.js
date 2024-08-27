import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="py-5 shadow-lg">
      <div className="flex flex-row justify-between px-10">
        <div>
          <Link to={"/"}>
            <h1 className="text-emerald-800 font-bold text-2xl">Blog App</h1>
          </Link>
        </div>
        <div>
          <Link to={"/register"}>
            <span className="text-emerald-800 font-semibold">Register</span>
          </Link>
          <Link to={"/login"}>
            <span className="text-emerald-800 font-semibold ml-2">Login</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
