import React from "react";
import { useWallContext } from "../Context/AuraWallContext";
function Menubar() {
  const { getWallPapers, setSearchValue, setWallpaper, setPage } =
    useWallContext();
  const menuitems = [
    "WallPaper",
    "Aesthetic",
    "Illustrations",
    "MacBook",
    "Dark",
    "Nature",
    "3D",
    "Travel",
    "Animals",
    "Fashion",
    "Food",
    "Macro",
    "Minimal",
  ];
  function handleClick(value) {
    setWallpaper([]);
    setPage(1);
    setSearchValue(value);
    getWallPapers(value);
  }
  return (
    <section className="fixed h-[100vh] w-[110px] bg-black text-white flex flex-col items-center">
      <p className="text-base  mt-10 cursor-pointer">AURAWALL</p>
      <div className="h-[80vh] flex flex-col items-start justify-evenly mx-2 cursor-pointer">
        {menuitems.map((value, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                handleClick(value);
              }}
            >
              {value}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Menubar;
