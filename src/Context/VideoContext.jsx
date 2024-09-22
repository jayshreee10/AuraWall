import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const VdoContext = createContext();
export const useVdoContext = () => {
  return useContext(VdoContext);
};

function VdoContextProvider({ children }) {
  const [vdoWall, setVdoWall] = useState([]);
  const [page, setPage] = useState(1);

  async function getVideos() {
    try {
      const PEXEL_VDO_URL = `https://api.pexels.com/videos/search/?page=${page}&query=food&per_page=12`;
      const userKey =
        "U7QlRU8f5PQyLggmw5TvYsYBOsbyLd64EJZ5auiPf9oZEMYVnxVb6Olr";

      const response = await axios.get(PEXEL_VDO_URL, {
        headers: {
          Authorization: userKey,
        },
      });

      console.log("getVideos function called");
      const videoFiles = response.data.videos;

      const videos = [];
      videoFiles.map((value) => {
        const finalData = {
          id: value.id,
          image: value.image,
          user: value.user.name,
          hdVideoUrl: value.video_files.find(
            (file) => file.quality === "hd" && file.file_type === "video/mp4"
          )?.link, // Get the link directly
          uhdVideoUrl: value.video_files.find(
            (file) => file.quality === "uhd" && file.file_type === "video/mp4"
          )?.link, // Get the link directly
          sdVideoUrl: value.video_files.find(
            (file) => file.quality === "sd" && file.file_type === "video/mp4"
          )?.link, // Get the link directly
        };
        videos.push(finalData);
      });

      setVdoWall((prev) => [...prev, ...videos]);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  }

  useEffect(() => {
    getVideos(); // Call getVideos when the component mounts
  }, [page]);

  const value = {
    vdoWall,
    setPage,
  };

  return <VdoContext.Provider value={value}>{children}</VdoContext.Provider>;
}

export default VdoContextProvider;
