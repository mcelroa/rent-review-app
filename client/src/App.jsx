import { useEffect, useState } from "react";
import { getAllProperties } from "./services/properties";
import { Link } from "react-router-dom";

function App() {
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
    <>
      <nav>
        <h2>Rent/Review</h2>
        <Link to="/signup">Sign Up</Link>
        <Link to="/signin">Sign In</Link>
      </nav>
    </>
  );
}

export default App;
