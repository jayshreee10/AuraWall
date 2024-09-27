import React, { useState, useEffect } from "react";
import { IoVideocamOutline } from "react-icons/io5";
import { TbPhotoHexagon } from "react-icons/tb";
import { GiTentacleHeart } from "react-icons/gi";
import { useWallContext } from "../Context/AuraWallContext";
import SearchModal from "./SearchModal";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
function Menubar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const size = 24;
  useEffect(() => {
    if (location.pathname.includes("/photos")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location.pathname]);

  return (
    <section className="fixed h-[100vh] w-[110px] bg-black shadow-lg shadow-white text-white z-30 flex flex-col items-center">
      <p
        className="text-base  mt-10 cursor-pointer"
        onClick={() => navigate("/")}
      >
        AURAWALL
      </p>

      <SearchModal />
      {!visible && (
        <TbPhotoHexagon
          size={size}
          onClick={() => {
            navigate("/photos");
          }}
          cursor={"pointer"}
        />
      )}
      {visible && (
        <IoVideocamOutline
          size={size}
          onClick={() => {
            navigate("/videos");
          }}
          cursor={"pointer"}
        />
      )}
      <GiTentacleHeart size={size} cursor={"pointer"} />

      <div className="h-[80vh] flex flex-col items-start justify-evenly mx-2 cursor-pointer"></div>
    </section>
  );
}

export default Menubar;
