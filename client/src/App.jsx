import { useState } from "react";
import SearchBar from "./components/SearchBar";
import { searchProperties } from "./services/core/properties";
import PropertyCard from "./components/PropertyCard";
import Navbar from "./components/Navbar";

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
    <>
      <Navbar />
      <div className="p-10">
        <div className="text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900">
            Rent<span className="text-teal-700">Review</span>
          </h2>
        </div>
        <SearchBar onSearch={handleSearch} />
        {error && <p className="font-semibold text-teal-700">{error}</p>}
        {loading && <p className="font-semibold text-teal-700">Loading...</p>}
        <div className="flex flex-wrap gap-2 xl:gap-1">
          {hasSearched &&
            properties.map((p, i) => (
              <div
                key={i}
                className="w-full sm:w-[calc(50%-0.25rem)] xl:w-[calc(33.333%-0.25rem)]"
              >
                <PropertyCard property={p} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default PropertyList;
