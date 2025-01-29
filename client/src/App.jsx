import { useState } from "react";
import SearchBar from "./components/SearchBar";
import { searchProperties } from "./services/core/properties";
import PropertyCard from "./components/PropertyCard";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState("");

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
    <div className="p-10">
      <div className="text-center">
        <h2 className="text-gray-900 text-4xl font-bold mb-4">
          Rent<span className="text-teal-600">Review</span>
        </h2>
      </div>
      <SearchBar onSearch={handleSearch} />
      {error && <p className="text-teal-600 font-semibold">{error}</p>}
      {loading && <p className="text-teal-600 font-semibold">Loading...</p>}
      {hasSearched &&
        properties.map((p, i) => <PropertyCard key={i} property={p} />)}
    </div>
  );
};

export default PropertyList;
