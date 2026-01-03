import React, { useState } from "react";
import { FiSearch, FiFilter, FiX } from "react-icons/fi";
import { useDebounce } from "../../hooks/useDebounce";

const JobSearch = ({ value = "", onChange, onFilterClick }) => {
  const [searchTerm, setSearchTerm] = useState(value);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  React.useEffect(() => {
    if (debouncedSearchTerm !== undefined) {
      onChange(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, onChange]);

  const handleClear = () => {
    setSearchTerm("");
    onChange("");
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FiSearch className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search jobs, companies, or keywords..."
        className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
      />
      {searchTerm && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-8 pr-3 flex items-center"
        >
          <FiX className="h-5 w-5 text-gray-400 hover:text-gray-600" />
        </button>
      )}
      {onFilterClick && (
        <button
          onClick={onFilterClick}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          <FiFilter className="h-5 w-5 text-gray-400 hover:text-gray-600" />
        </button>
      )}
    </div>
  );
};

export default JobSearch;
