import { useState } from "react";
import { isAuthenticated } from "../services/auth/requests";
import { Link } from "react-router-dom";
import { signout } from "../services/auth/requests";

const Navbar = ({ showAddProperty = true }) => {
  const [isAuth, setIsAuth] = useState(!!isAuthenticated());

  return (
    <div className="bg-gray-700 p-3">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between">
        <Link
          className="text-sm font-semibold text-white hover:text-gray-300"
          to="/"
        >
          Home
        </Link>
        {/* Add Property and Sign Out for Authenticated Users */}
        {isAuth && (
          <div className="flex items-center space-x-4">
            {showAddProperty && (
              <Link
                className="text-sm font-semibold text-teal-400 hover:text-teal-300"
                to="/add/property"
              >
                Add Property
              </Link>
            )}
            <button
              className="text-sm font-semibold text-white hover:text-gray-300"
              onClick={() =>
                signout(() => {
                  setIsAuth(false);
                })
              }
            >
              Sign Out
            </button>
          </div>
        )}

        {/* Sign In and Sign Up for Unauthenticated Users */}
        {!isAuth && (
          <div className="flex items-center space-x-4">
            <Link
              className="text-sm font-semibold text-white hover:text-gray-300"
              to="/signin"
            >
              Sign In
            </Link>
            <Link
              className="text-sm font-semibold text-teal-400 hover:text-teal-300"
              to="/signup"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
