import React, { createContext, useContext, useState } from "react";
import axios from "axios";

// Create the context for videos
const VdoContext = createContext();

// Custom hook to access the context
export const useVdoContext = () => {
  return useContext(VdoContext);
};

// VdoContextProvider component to manage and provide video data
function VdoContextProvider({ children }) {
  const [vdoWall, setVdoWall] = useState([]); // Store the list of videos
  const [page, setPage] = useState(1); // Track pagination

  // Function to fetch videos from the API
  async function getVideos() {
    try {
      const PEXEL_VDO_URL = `https://api.pexels.com/videos/search/?page=${page}&query=food&per_page=12`;
      const userKey =
        "U7QlRU8f5PQyLggmw5TvYsYBOsbyLd64EJZ5auiPf9oZEMYVnxVb6Olr";

      // Make the API call to fetch videos
      const response = await axios.get(PEXEL_VDO_URL, {
        headers: {
          Authorization: userKey,
        },
      });

      console.log("getVideos function called");
      const videoFiles = response.data.videos;

      // Process the video data and extract useful information
      const videos = videoFiles.map((value) => ({
        id: value.id,
        image: value.image,
        user: value.user.name,
        hdVideoUrl: value.video_files.find(
          (file) => file.quality === "hd" && file.file_type === "video/mp4"
        )?.link, // Get HD video URL
        uhdVideoUrl: value.video_files.find(
          (file) => file.quality === "uhd" && file.file_type === "video/mp4"
        )?.link, // Get UHD video URL
        sdVideoUrl: value.video_files.find(
          (file) => file.quality === "sd" && file.file_type === "video/mp4"
        )?.link, // Get SD video URL
      }));

      // Append the new videos to the existing list
      setVdoWall((prev) => [...prev, ...videos]);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  }

  // Provide the video data, the `setPage` function, and `getVideos` to be used in other components
  const value = {
    vdoWall,
    setPage,
    page,
    getVideos, // Expose the getVideos function so it can be called in other components
  };

  // Provide the context to the component tree
  return <VdoContext.Provider value={value}>{children}</VdoContext.Provider>;
}

export default VdoContextProvider;
