import { useEffect, useState } from "react";
import { getAllProperties } from "./services/properties";

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
      </nav>
      <div>{JSON.stringify(properties)}</div>
    </>
  );
}

export default App;
