import React, { useEffect } from "react";
import axios from "axios";

const ImageList = () => {
  useEffect(() => {
    getImages();
  }, []);

  const getImages = () => {
    axios
      .get("http://127.0.0.1:8000/api/images/", {
        headers: {
          accept: "application/json",
        },
      })
      .then((resp) => {
        console.log(resp);
      });
  };
  return (
    <div>
      <h1>Image List here</h1>
    </div>
  );
};

export default ImageList;
