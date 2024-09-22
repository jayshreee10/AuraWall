import React from "react";
import { useVdoContext } from "../Context/VideoContext";

function Videos() {
  const { url } = useVdoContext();

  return (
    <div className="ml-30rem w-full flex items-center justify-center text-black">
      {url ? (
        <video width="600" controls>
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
}

export default Videos;
