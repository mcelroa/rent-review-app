import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search properties..."
        value={query}
        onChange={handleChange}
        className="w-full px-4 py-2 pr-10 border border-gray-800 rounded-md font-semibold"
      />
      <i
        className="fa-solid fa-magnifying-glass absolute right-8 top-1/2 transform -translate-y-1/2 text-teal-600 hover:cursor-pointer"
        onClick={handleSearch}
      ></i>
      <i
        className="fa-solid fa-x absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-900 hover:cursor-pointer"
        onClick={() => {
          setQuery("");
          onSearch("");
        }}
      ></i>
    </div>
  );
};

export default SearchBar;
