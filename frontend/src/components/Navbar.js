import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../Hooks/useLogout";
import { useAuthContext } from "../Hooks/useAuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="py-5 shadow-lg">
      <div className="flex flex-row justify-between px-10">
        <div>
          <Link to={"/"}>
            <h1 className="text-emerald-800 font-bold text-2xl">Blog App</h1>
          </Link>
        </div>
        <div>
          {user && (
            <>
              <span className="text-emerald-800 font-semibold">
                Hello {user.email}
              </span>
              <button
                className="text-white rounded bg-emerald-800 px-4 py-2 ml-2"
                onClick={handleLogout}
              >
                Log Out{" "}
                <span className="material-symbols-outlined">logout</span>
              </button>
            </>
          )}

          {!user && (
            <>
              <Link to={"/register"}>
                <span className="text-emerald-800 font-semibold">Register</span>
              </Link>
              <Link to={"/login"}>
                <span className="text-emerald-800 font-semibold ml-2">
                  Login
                </span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
