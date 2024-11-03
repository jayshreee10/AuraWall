import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center h-full w-full justify-center text-center  bg-black">
      <p className="text-5xl text-white  pb-5 uppercase font-nerko font-semibold tracking-wider">
        Uncover the Perfect Aura for Your Screen
      </p>
      <div className="flex flex-wrap justify-center gap-6">
        <button
          className="relative"
          onClick={() => {
            navigate("/photos");
          }}
        >
          <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-white"></span>
          <span className="fold-bold relative inline-block h-full w-full rounded border-2 border-black bg-white px-3 py-1 text-base font-bold text-black transition duration-100 hover:bg-skin hover:text-gray-900">
            Photos
          </span>
        </button>
        <button
          onClick={() => {
            navigate("/videos");
          }}
          className="relative"
        >
          <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-gray-700"></span>
          <span className="fold-bold relative inline-block h-full w-full rounded border-[1.5px] border-white bg-black px-3 py-1 text-base font-bold text-white transition duration-100 hover:bg-gray-900 hover:text-skin">
            Videos
          </span>
        </button>
      </div>
    </div>
  );
}

export default Home;
