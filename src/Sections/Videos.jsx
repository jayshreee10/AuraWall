import React from "react";
import { useVdoContext } from "../Context/VideoContext";
import { useEffect } from "react";

function Videos() {
  const { vdoWall, setPage } = useVdoContext();

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
    <div className="grid grid-cols-3 gap-4 w-full h-auto ml-[7rem] mt-4">
      {vdoWall.map((value, index) => (
        <div className="flex items-center justify-center" key={index}>
          <video width="500" controls>
            <source src={value.hdVideoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ))}
    </div>
  );
}

export default Videos;
