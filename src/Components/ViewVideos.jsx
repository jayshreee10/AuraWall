import { CgClose } from "react-icons/cg";
import { TbDownload } from "react-icons/tb";
import { IoMdHeartEmpty } from "react-icons/io";
import { GoHeartFill } from "react-icons/go";
import { IoIosShareAlt } from "react-icons/io";
function ViewVdos({
  closeModal,
  vdoSrc,
  download,
  shareImg,
  onLoadStart,
  onLoadedData,
}) {
  const items = [
    { icon: <CgClose size={20} />, onClick: closeModal, title: "Close" },
    { icon: <TbDownload size={20} />, onClick: download, title: "Download" },
    {
      icon: <IoMdHeartEmpty size={20} />,
      onClick: closeModal,
      title: "Wishlist",
    },
    {
      icon: <GoHeartFill size={20} />,
      onClick: closeModal,
      title: "Wishlisted",
    },
    { icon: <IoIosShareAlt size={20} />, onClick: shareImg, title: "Share" },
  ];

  return (
    <div className="h-full w-full">
      <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="flex-col flex items-center justify-center absolute top-3 right-2">
          {items.map((value, index) => {
            return (
              <button
                key={index}
                title={value.title}
                className=" text-white bg-black bg-opacity-60 px-3 py-3 mb-2 rounded-full hover:bg-opacity-80 focus:outline-none"
                onClick={value.onClick}
              >
                {value.icon}
              </button>
            );
          })}
        </div>

        <div className="relative h-[80vh] w-[80vw] ml-[105px]">
          <video controls>
            <source src={vdoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}

export default ViewVdos;
