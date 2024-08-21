import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="py-5 bg-yellow-100">
      <Link to={"/"}>
        <h1 className="text-lime-600 font-bold text-2xl">Blog App</h1>
      </Link>
    </nav>
  );
};

export default Navbar;
