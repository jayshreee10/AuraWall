import React, { useState, useEffect } from "react";
import { IoVideocamOutline } from "react-icons/io5";
import { TbPhotoHexagon } from "react-icons/tb";
import { AiTwotoneHeart } from "react-icons/ai";
import SearchModal from "./SearchModal";
import { useLocation, useNavigate } from "react-router-dom";
import { useWallContext } from "../Context/AuraWallContext";
function Menubar() {
  const {
    getWallPapers,

    setPage,

    setLoading,
    setWallpaper,
    searchValue,
  } = useWallContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const size = "22px";

  // Update visibility based on current route
  useEffect(() => {
    setVisible(location.pathname.includes("/photos"));
  }, [location.pathname]);

  // Utility function for navigation
  const handleNavigate = (path) => navigate(path);

  const fetchWallpapers = async (value) => {
    let finalValue = value;
    if (searchValue !== "") {
      finalValue = searchValue;
    }
    setLoading(true);
    await getWallPapers(finalValue);
    setLoading(false);
  };
  const handleClick = (value) => {
    setWallpaper([]); // Clear wallpapers
    fetchWallpapers(value); // Fetch new wallpapers based on search value
    setPage(1); // to be fixed
  };

  return (
    <section className="fixed h-[100vh] w-[110px] bg-black shadow-lg shadow-black text-white z-30 flex flex-col items-center">
      <p
        className="text-base mt-10 cursor-pointer"
        onClick={() => handleNavigate("/")}
      >
        AURAWALL
      </p>

      <SearchModal onClick={handleClick} />

      {/* Conditional rendering for Photo/Video icons */}
      <div
        className="hover:bg-gray-700 hover:bg-opacity-50 p-2 flex items-center justify-center rounded-full"
        onClick={() => handleNavigate(visible ? "/videos" : "/photos")}
      >
        {visible ? (
          <IoVideocamOutline size={size} cursor="pointer" />
        ) : (
          <TbPhotoHexagon size={size} cursor="pointer" />
        )}
      </div>

      {/* Heart icon */}
      <div className="hover:bg-gray-700 hover:bg-opacity-50 p-2 flex items-center justify-center rounded-full">
        <AiTwotoneHeart size={size} cursor="pointer" />
      </div>
    </section>
  );
}

export default Menubar;
