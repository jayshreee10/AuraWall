import React, { useState } from "react";
import { useWallContext } from "../Context/AuraWallContext";
import { Validation } from "../Utility/validation";

function SearchBar({ onClick }) {
  const { searchValue, setSearchValue } = useWallContext();

  const handleSearch = () => {
    const validatedValue = Validation.inputValidation(searchValue);
    onClick(validatedValue);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchValue("");
  };

  return (
    <div className="w-[80vw]">
      <div className="flex flex-col p-2 py-6 m-h-screen">
        <div className="bg-white border-white border items-center justify-between w-full flex rounded-full shadow-md p-3 mb-5 sticky">
          <input
            className="font-bold rounded-full w-full py-4 pl-4 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline lg:text-sm text-xs"
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          {searchValue && (
            <button
              className="absolute right-20 text-gray-600 focus:outline-none"
              onClick={clearSearch}
            >
              ✕
            </button>
          )}

          <div
            id="searchbutton"
            className="bg-gray-600 p-2 hover:bg-blue-400 cursor-pointer mx-2 rounded-full"
            onClick={handleSearch}
          >
            <svg
              className="w-6 h-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
