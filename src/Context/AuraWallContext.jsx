import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
const AuraWallContext = createContext();
export const useWallContext = () => {
  return useContext(AuraWallContext);
};
function WallPapersContextProvider({ children }) {
  const [searchValue, setSearchValue] = useState("hd wallpapers");
  const [url, setUrl] = useState(null);
  const [wallpaper, setWallpaper] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const PEXEL_URL = `https://api.pexels.com/v1/search/?page=${page}&per_page=50&query=${searchValue}`;
  const userKey = "U7QlRU8f5PQyLggmw5TvYsYBOsbyLd64EJZ5auiPf9oZEMYVnxVb6Olr";
  const authAxios = axios.create({
    baseURL: PEXEL_URL,
    headers: {
      Authorization: userKey,
    },
  });
  async function getWallPapers() {
    try {
      console.log("getWallPapers function called");
      const response = await authAxios.get();
      const data = response.data;
      const wallPapers = data.photos;
      setWallpaper((prev) => [...prev, ...wallPapers]);
      const image = wallPapers.src.medium;
      setUrl(image);
    } catch {
      console.error();
    }
  }
  console.log("img url" + " " + url);
  // console.log(wallpaper);
  const value = {
    getWallPapers,
    url,
    wallpaper,
    setPage,
    page,
    setLoading,
    loading,
  };
  return (
    <AuraWallContext.Provider value={value}>
      {children}
    </AuraWallContext.Provider>
  );
}

export default WallPapersContextProvider;
