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
    <div className="mx-auto w-full lg:w-2/3">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search properties..."
          value={query}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-800 px-4 py-2 pr-10 text-sm font-semibold"
        />
        <i
          className="fa-solid fa-magnifying-glass absolute top-1/2 right-8 -translate-y-1/2 transform text-teal-700 hover:cursor-pointer"
          onClick={handleSearch}
        ></i>
        <i
          className="fa-solid fa-x absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-900 hover:cursor-pointer"
          onClick={() => {
            setQuery("");
            onSearch("");
          }}
        ></i>
      </div>
    </div>
  );
};

export default SearchBar;
