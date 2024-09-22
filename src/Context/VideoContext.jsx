import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const VdoContext = createContext();
export const useVdoContext = () => {
  return useContext(VdoContext);
};

function VdoContextProvider({ children }) {
  const [url, setUrl] = useState("");

  async function getVideos() {
    try {
      const PEXEL_VDO_URL =
        "https://api.pexels.com/videos/search?query=nature&per_page=1";
      const userKey =
        "U7QlRU8f5PQyLggmw5TvYsYBOsbyLd64EJZ5auiPf9oZEMYVnxVb6Olr";
      const authAxios = axios.create({
        baseURL: PEXEL_VDO_URL,
        headers: {
          Authorization: userKey,
        },
      });

      console.log("getVideos function called");
      const response = await authAxios.get();
      const data = response.data;

      // Select an HD mp4 video file
      const videoFiles = data.videos[0].video_files;
      const hdVideo = videoFiles.find(
        (file) => file.quality === "hd" && file.file_type === "video/mp4"
      );
      // It extracts the array of video_files (which contains video URLs of different qualities) from the first video result.
      // Using .find(), it searches for an MP4 video in HD quality ("hd") and stores its link in the url state via setUrl(hdVideo.link).

      if (hdVideo) {
        setUrl(hdVideo.link);
        console.log("Video URL: ", hdVideo.link);
      } else {
        console.log("No suitable video file found.");
      }
    } catch (error) {
      console.error("Error fetching video", error);
    }
  }

  useEffect(() => {
    getVideos();
  }, []);

  const value = {
    getVideos,
    url,
  };

  return <VdoContext.Provider value={value}>{children}</VdoContext.Provider>;
}

export default VdoContextProvider;
