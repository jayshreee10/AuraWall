import React, { useState, useEffect } from "react";
import { useWallContext } from "../Context/AuraWallContext";
import SearchBar from "../Components/SearchBar";

function Search() {
  const {
    getWallPapers,
    wallpaper,
    setPage,
    page,
    loading,
    setLoading,
    setWallpaper,
  } = useWallContext();

  const fetchWallpapers = async (value) => {
    setLoading(true);
    await getWallPapers(value);
    setLoading(false);
  };

  useEffect(() => {
    fetchWallpapers();
  }, [page]);

  const handleClick = (value) => {
    setWallpaper([]);
    fetchWallpapers(value);
    setPage(1);
  };

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      console.log("height:", scrollHeight);
      console.log("top:", scrollTop);
      console.log("windowHeight:", clientHeight);

      // Check if the user scrolled to the bottom
      if (scrollTop + clientHeight >= scrollHeight - 1) {
        setPage((prev) => prev + 1); // Increment page number
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-[90vw] h-auto flex flex-col items-center justify-center ml-[120px] py-20">
      <SearchBar onClick={handleClick} />
      {loading && <div>Loading...</div>}

      <div className="grid grid-cols-4 gap-2 items-center h-auto">
        {wallpaper.map((value, index) => (
          <img key={index} src={value.src.medium} alt="Wallpaper" />
        ))}
      </div>
    </div>
  );
}

export default Search;
