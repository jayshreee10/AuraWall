import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Validation } from "../Utility/validation";
const AuraWallContext = createContext();
export const useWallContext = () => {
  return useContext(AuraWallContext);
};
function WallPapersContextProvider({ children }) {
  const [wallpaper, setWallpaper] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  async function getWallPapers(queryValue) {
    try {
      const validatedValue = Validation.inputValidation(queryValue);
      console.log(validatedValue);
      const PEXEL_URL = `https://api.pexels.com/v1/search/?page=${page}&per_page=50&query=${validatedValue}`;
      const userKey =
        "U7QlRU8f5PQyLggmw5TvYsYBOsbyLd64EJZ5auiPf9oZEMYVnxVb6Olr";
      const authAxios = axios.create({
        baseURL: PEXEL_URL,
        headers: {
          Authorization: userKey,
        },
      });
      console.log("getWallPapers function called");
      const response = await authAxios.get();
      const data = response.data;
      const wallPapers = data.photos;
      setWallpaper((prev) => [...prev, ...wallPapers]);
    } catch {
      console.error();
    }
  }

  const value = {
    getWallPapers,
    wallpaper,
    setPage,
    page,
    setLoading,
    loading,
    setWallpaper,
    searchValue,
    setSearchValue,
  };
  return (
    <AuraWallContext.Provider value={value}>
      {children}
    </AuraWallContext.Provider>
  );
}

export default WallPapersContextProvider;
