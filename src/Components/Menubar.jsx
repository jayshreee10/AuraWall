import React from "react";

function Menubar() {
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
    "Search",
  ];
  return (
    <section className="fixed h-[100vh] w-[110px] bg-black text-white flex flex-col items-center">
      <p className="text-base  mt-10 cursor-pointer">AURAWALL</p>
      <div className="h-[80vh] flex flex-col items-start justify-evenly mx-2 cursor-pointer">
        {menuitems.map((value, index) => {
          return <div key={index}>{value}</div>;
        })}
      </div>
    </section>
  );
}

export default Menubar;
