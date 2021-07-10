import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "./Image";
import { Button, Spinner } from "react-bootstrap";
import "../Classifer/Classifier.css";

const ImageList = () => {
  const [images, setImages] = useState([]);
  const [visible, setVisible] = useState(9);
  const [isLoading, setIsLoading] = useState(true);
  const [newLoaded, setNewLoaded] = useState(false);

  useEffect(() => {
    setTimeout(getImages, 1500);
  }, []);

  const getImages = () => {
    axios
      .get("http://127.0.0.1:8000/api/images/", {
        headers: {
          accept: "application/json",
        },
      })
      .then((resp) => {
        setImages(resp.data);
        console.log(resp);
      });
    setIsLoading(false);
  };

  const handleVisible = () => {
    setNewLoaded(true);
    setTimeout(() => {
      setVisible(visible + 3);
      setNewLoaded(false);
    }, 300);
  };
  return (
    <div className="background">
      <h1 className="light__text font-text mb-5 pt-2">Image List</h1>
      <div className="container ">
        <div class="row">
          {images.slice(0, visible).map((image) => (
            <div key={image.id} className="col">
              <Image
                key={image.id}
                picture={image.picture}
                name={image.classified}
              />
            </div>
          ))}
        </div>
        <div className="container d-flex flex-column">
          {(newLoaded || isLoading) && (
            <Spinner
              className="light__text mx-auto mb-3"
              animation="border"
              role="status"
            >
              <span className="sr-only light__text">Loading...</span>
            </Spinner>
          )}

          {!newLoaded && !isLoading && (
            <Button onClick={handleVisible} variant="primary" size="md">
              Load more
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageList;
