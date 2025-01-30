import { useState } from "react";
import { isAuthenticated } from "../services/auth/requests";
import { Link } from "react-router-dom";
import { signout } from "../services/auth/requests";

const Navbar = ({ showAddProperty = true }) => {
  const [isAuth, setIsAuth] = useState(!!isAuthenticated());

  return (
    <div className="bg-gray-700 p-3">
      {isAuth && (
        <div className="text-right">
          {showAddProperty && (
            <Link
              className="text-teal-400 font-semibold hover:cursor-pointer hover:text-teal-300 mr-2"
              to="/add/property"
            >
              Add Property
            </Link>
          )}
          <button
            className="text-white font-semibold hover:cursor-pointer hover:text-gray-300"
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
      {!isAuth && (
        <div className="text-right">
          <Link
            className="text-white font-semibold hover:cursor-pointer hover:text-gray-300 mr-2"
            to="/signin"
          >
            Sign In
          </Link>
          <Link
            className="text-teal-400 font-semibold hover:cursor-pointer hover:text-teal-300"
            to="/signup"
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
