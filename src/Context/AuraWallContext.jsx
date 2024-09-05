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
      const PEXEL_URL = `https://api.pexels.com/v1/search/?page=${page}&per_page=20&query=${validatedValue}`;
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

      const wallPapers = [];
      data.photos.map((value, index) => {
        const finalData = {
          id: value.id,
          color: value.avg_color,
          original: value.src.original,
          large: value.src.large,
          medium: value.src.medium,
          small: value.src.small,
          portrait: value.src.portrait,
          landscape: value.src.landscape,
          photographer: value.photographer,
        };
        wallPapers.push(finalData);
      });

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
// {
//   "id": 439818,
//   "color": "#576650",
//  "original": "https://images.pexels.com/photos/439818/pexels-photo-439818.jpeg",
// "large": "https://images.pexels.com/photos/439818/pexels-photo-439818.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
//  "medium": "https://images.pexels.com/photos/439818/pexels-photo-439818.jpeg?auto=compress&cs=tinysrgb&h=350",
// "small": "https://images.pexels.com/photos/439818/pexels-photo-439818.jpeg?auto=compress&cs=tinysrgb&h=130",
// "portrait": "https://images.pexels.com/photos/439818/pexels-photo-439818.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
// "landscape": "https://images.pexels.com/photos/439818/pexels-photo-439818.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
// }
