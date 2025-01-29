import { useEffect, useState } from "react";
import { getAllProperties } from "./services/core/properties";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, signout } from "./services/auth/requests";

function App() {
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);

  useEffect(() => {
    getAllProperties().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProperties(data);
      }
    });
  }, []);

  return (
    <div>
      <nav>
        {!isAuthenticated() && (
          <>
            <ul>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
            </ul>
          </>
        )}
        {isAuthenticated() && (
          <>
            <Link
              onClick={() => {
                signout(() => {
                  navigate("/");
                });
              }}
            >
              Sign Out
            </Link>
            <Link to="/add/property">Add Property</Link>
          </>
        )}
      </nav>
      <h1>Available Properties</h1>
      <ul>
        {properties.map((p, i) => (
          <li key={i}>
            <h3>{p.address}</h3>
            <p>{p.city}</p>
            <small>Added by: {p.addedBy.name}</small>
            <div>
              <button>
                <Link to={`/property/${p._id}`}>Reviews</Link>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
