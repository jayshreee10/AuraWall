import React, { useState, useEffect } from "react";
import { useWallContext } from "../Context/AuraWallContext";

function Search() {
  const { getWallPapers, url, wallpaper, setPage, page, loading, setLoading } =
    useWallContext();
  const [visible, setVisible] = useState(false);
  const height = document.documentElement.scrollHeight;
  const top = document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;
  useEffect(() => {
    setLoading(true);
    getWallPapers();
    setLoading(false);
  }, [page]);
  setLoading(false);
  const handleClick = () => {
    setVisible(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      console.log("height:" + height);
      console.log("top:" + top);
      console.log("windowHeight:" + windowHeight);

      //  logic : height = top + windowheight
      if (top + windowHeight + 1 >= height) {
        setPage((prev) => prev + 1);
      }
      setLoading(true);
      getWallPapers();
      setLoading(false);
    };
    setLoading(false);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll); // Clean up on unmount
    };
  }, []);

  return (
    <div className="w-[90vw] h-auto flex flex-col items-center justify-center ml-[120px] py-20">
      <button
        type="submit"
        className="text-white my-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={handleClick}
      >
        Search
      </button>
      {loading && <div>Loading...</div>}

      {visible && (
        <div className="grid grid-cols-5 gap-2 items-center h-auto">
          {wallpaper.map((value, index) => {
            return <img key={index} src={value.src.medium} />;
          })}
        </div>
      )}
    </div>
  );
}

export default Search;
