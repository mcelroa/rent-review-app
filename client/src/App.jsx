import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import { searchProperties } from "./services/core/properties";
import PropertyCard from "./components/PropertyCard";
import { Link } from "react-router-dom";
import { isAuthenticated, signout } from "./services/auth/requests";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState("");
  const [isAuth, setIsAuth] = useState(!!isAuthenticated());

  useEffect(() => {
    setIsAuth(!!isAuthenticated()); // Update auth state on component mount
  }, []);

  const handleSearch = async (query) => {
    setError("");
    setLoading(true);
    const data = await searchProperties(query);
    setProperties(data);
    setLoading(false);
    setHasSearched(true);

    if (data.length < 1) {
      setError("No properties match your search.");
    }
  };

  return (
    <>
      <div className="bg-gray-700 p-3">
        {isAuth && (
          <button
            className="text-white font-semibold hover:cursor-pointer hover:text-gray-300"
            onClick={() =>
              signout(() => {
                setIsAuth(false); // Update state to trigger re-render
              })
            }
          >
            Sign Out
          </button>
        )}
        {!isAuth && (
          <div>
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
      <div className="p-10">
        <div className="text-center">
          <h2 className="text-gray-900 text-4xl font-bold mb-4">
            Rent<span className="text-teal-700">Review</span>
          </h2>
        </div>
        <SearchBar onSearch={handleSearch} />
        {error && <p className="text-teal-700 font-semibold">{error}</p>}
        {loading && <p className="text-teal-700 font-semibold">Loading...</p>}
        {hasSearched &&
          properties.map((p, i) => <PropertyCard key={i} property={p} />)}
      </div>
    </>
  );
};

export default PropertyList;
