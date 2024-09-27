import React, { useState, useEffect } from "react";
import { useVdoContext } from "../Context/VideoContext";
import ViewVdos from "../Components/ViewVideos";
import SearchModal from "../Components/SearchModal"; // Import the SearchModal

function Videos() {
  const { vdoWall, setPage, getVideos, page } = useVdoContext();
  const [loadingIndexes, setLoadingIndexes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openVdo, setOpenVdo] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    getVideos();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 1) {
        setLoading(true);
        setPage((prev) => prev + 1);
      }
      setLoading(false);
    };
    setLoading(false);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setPage]);

  const handleLoadedData = (index) => {
    setLoadingIndexes((prev) => prev.filter((i) => i !== index));
  };

  const handleLoadStart = (index) => {
    setLoadingIndexes((prev) => [...prev, index]);
  };

  const handleOpenModal = (videoSrc) => {
    setSelectedVideo(videoSrc);
    setOpenVdo(true);
  };

  const handleCloseModal = () => {
    setOpenVdo(false);
    setSelectedVideo(null);
  };

  const downloadVdo = () => {
    if (selectedVideo) {
      const download = document.createElement("a");
      download.href = selectedVideo;
      download.download = "video.mp4";
      download.click();
    }
  };

  return (
    <div className="grid grid-cols-4 gap-4 w-full h-auto ml-[7rem] mt-4">
      {/* Render the SearchModal here */}
      {vdoWall.map((value, index) => (
        <div
          className="relative flex items-center justify-center w-[380px] h-[300px] overflow-hidden group cursor-pointer"
          key={index}
          onClick={() => handleOpenModal(value.hdVideoUrl)}
        >
          <div className="absolute inset-0 bg-black flex items-center justify-center text-white bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
            <p>Tap to view</p>
          </div>
          {loadingIndexes.includes(index) && (
            <div className="absolute top-0 bg-black text-white z-20">
              Loading...
            </div>
          )}
          <video
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg"
            muted
            loop
            onMouseEnter={(e) => e.target.play()}
            onMouseLeave={(e) => e.target.pause()}
            onLoadStart={() => handleLoadStart(index)}
            onLoadedData={() => handleLoadedData(index)}
          >
            <source src={value.hdVideoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ))}
      {loading && (
        <div className="absolute bottom-0 bg-black text-white z-20">
          Loading more videos...
        </div>
      )}
      {openVdo && selectedVideo && (
        <ViewVdos
          closeModal={handleCloseModal}
          vdoSrc={selectedVideo}
          download={downloadVdo}
        />
      )}
    </div>
  );
}

export default Videos;
