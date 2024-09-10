import React, { useState, useEffect } from "react";
import { useWallContext } from "../Context/AuraWallContext";
import SearchBar from "../Components/SearchBar";
import ViewImgs from "../Components/ViewImgs";

function Search() {
  const {
    getWallPapers,
    wallpaper,
    setPage,
    page,
    loading,
    setLoading,
    setWallpaper,
    searchValue,
  } = useWallContext();

  const [imgIndex, setImgIndex] = useState(null); // Track clicked image index
  const [openImg, setOpenImg] = useState(false); // Manage modal visibility

  const handleImgClick = (index) => {
    setImgIndex(index); // Set clicked image index
    setOpenImg(true); // Open modal
  };

  const closeModal = () => {
    setOpenImg(false); // Function to close modal
  };

  const downloadImg = async () => {
    if (imgIndex !== null && wallpaper[imgIndex]) {
      const imgSrc = wallpaper[imgIndex].original; // img link for viewimg modal

      try {
        const response = await fetch(imgSrc);
        const blob = await response.blob();
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        // Use the filename from the original image
        const filename = `wallpaper-${imgIndex}.jpg`;
        link.download = filename;

        // Append link to the DOM
        document.body.appendChild(link);

        // Trigger click event to start the download
        link.click();

        // Clean up
        URL.revokeObjectURL(link.href);
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error downloading image:", error);
      }
    }
  };

  // const shareImg = () => {};

  const fetchWallpapers = async (value) => {
    let finalValue = value;
    if (searchValue !== "") {
      finalValue = searchValue;
    }
    setLoading(true);
    await getWallPapers(finalValue);
    setLoading(false);
  };

  useEffect(() => {
    fetchWallpapers();
  }, [page]);

  const handleClick = (value) => {
    setWallpaper([]); // Clear wallpapers
    fetchWallpapers(value); // Fetch new wallpapers based on search value
    setPage(1); // Reset page number
  };

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

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
    <div className="w-full h-auto flex flex-col items-center justify-center ml-[110px] py-20 bg-slate-100">
      <p className="text-5xl  pb-5 uppercase font-nerko font-semibold tracking-wider">
        Uncover the Perfect Aura for Your Screen
      </p>
      <SearchBar onClick={handleClick} />
      {loading && <div>Loading...</div>}

      <div className="grid grid-cols-4 gap-2 items-center h-auto">
        {wallpaper.map((value, index) => (
          <div
            key={index}
            className="relative group " // Make the first item larger
          >
            <div className="h-[20rem] w-[22rem] rounded-md overflow-hidden cursor-pointer shadow-lg object-center">
              <img
                src={value.medium} // Use triple equals for comparison
                alt="Wallpaper"
                className="h-full w-full object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
              />
              {/* Overlay */}
              <div
                onClick={() => handleImgClick(index)}
                className="absolute inset-0 rounded-md bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
              >
                <div className="text-white text-lg w-full flex flex-col items-center justify-end h-full">
                  <p className="text-xs mb-[90px]">tap to view</p>
                  <p className="text-sm backdrop-blur-sm w-full flex items-center justify-center py-2">
                    By {value.photographer} ✨
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal component rendered outside of map and conditionally */}
      {openImg && imgIndex !== null && (
        <ViewImgs
          closeModal={closeModal}
          imgSrc={wallpaper[imgIndex].original}
          downloadImg={downloadImg}
          // shareImg={shareImg}
        />
      )}
    </div>
  );
}

export default Search;
