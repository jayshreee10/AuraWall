import React, { useState, useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci"; // Importing the search icon from react-icons
import { useWallContext } from "../Context/AuraWallContext";
import { Validation } from "../Utility/validation";

function SearchModal({ onClick }) {
  const { searchValue, setSearchValue } = useWallContext();
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const modalRef = useRef(null); // Reference to the modal

  // Handle clicks outside the modal to close it
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsModalOpen(false); // Close the modal if clicked outside
    }
  };

  // Handle pressing the Enter key to close the modal
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setIsModalOpen(false); // Close modal on pressing Enter
      console.log("Search Query:", searchQuery); // Handle search query submission
    }
  };

  const handleSearch = (value) => {
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

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyPress);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isModalOpen, searchQuery]);

  return (
    <div>
      <div className="rounded-full hover:bg-gray-700 hover:bg-opacity-50">
        <button
          onClick={() => setIsModalOpen(true)} // Open modal on button click
          className="text-gray-600 hover:text-gray-800 focus:outline-none p-2"
        >
          <CiSearch size={24} color="white" />
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-black p-6 rounded-lg shadow-lg w-80 max-w-md z-60"
          >
            <h2 className="text-lg font-semibold mb-4">Search</h2>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyDown} // Update search query
              placeholder="Type your search query..."
              className="w-full border border-gray-300 p-2 text-black font-mono rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
            />
            {/* <button
              onClick={() => setIsModalOpen(false)} // Close modal on button click
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Close
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchModal;
