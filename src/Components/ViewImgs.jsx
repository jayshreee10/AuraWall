import { CgClose } from "react-icons/cg";
import { TbDownload } from "react-icons/tb";
import { IoMdHeartEmpty } from "react-icons/io";
import { GoHeartFill } from "react-icons/go";
import { IoIosShareAlt } from "react-icons/io";
function ViewImgs({ closeModal, imgSrc, downloadImg, shareImg }) {
  const items = [
    { icon: <CgClose size={20} />, onClick: closeModal },
    { icon: <TbDownload size={20} />, onClick: downloadImg },
    { icon: <IoMdHeartEmpty size={20} />, onClick: closeModal },
    { icon: <GoHeartFill size={20} />, onClick: closeModal },
    { icon: <IoIosShareAlt size={20} />, onClick: shareImg },
  ];

  return (
    <div className="h-full w-full">
      {/* Modal should be outside the map loop */}

      <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="flex-col flex items-center justify-center absolute top-3 right-2">
          {items.map((value, index) => {
            return (
              <button
                key={index}
                className=" text-white bg-black bg-opacity-60 px-3 py-3 mb-2 rounded-full hover:bg-opacity-80 focus:outline-none"
                onClick={value.onClick}
              >
                {value.icon}
              </button>
            );
          })}
        </div>

        <div className="relative h-[80vh] w-[80vw] ml-[105px]">
          <img
            src={imgSrc} // Display the clicked image
            alt="Selected Wallpaper"
            className="h-full w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default ViewImgs;
