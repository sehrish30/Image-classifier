import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "./Image";
import { Button, Spinner } from "react-bootstrap";
import "../Classifer/Classifier.css";

const ImageList = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [showLoad, setShowLoad] = useState(true);

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
        console.log("SEHRISH", resp.data);
        setImages(resp.data.results);
        console.log(resp);
      });
    setIsLoading(false);
  };

  const handleVisible = async () => {
    setIsLoading(true);

    const res = await axios.get("http://127.0.0.1:8000/api/images/", {
      params: {
        l: 3,
        o: offset + 3,
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    setOffset(offset + 3);
    if (res.status === 200 || res.status === 201) {
      console.log(res.data.results.length);
      setIsLoading(false);
      if (res.data.results.length < 3) {
        setShowLoad(false);
      }
      setImages((prev) => [...prev, ...res.data.results]);
    }
  };
  return (
    <div className="background mb-3">
      <div className="container ">
        {images.length > 0 ? (
          <div class="row">
            {images.map((image) => (
              <div key={image.id} className="col">
                <Image
                  key={image.id}
                  picture={image.picture}
                  name={image.classified}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="no__image font-text light__text bold__font">
            <h3>No Images classified</h3>
          </div>
        )}

        <div className="container d-flex flex-column">
          {isLoading && (
            <Spinner
              className="light__text mx-auto mb-3"
              animation="border"
              role="status"
            >
              <span className="sr-only light__text">Loading...</span>
            </Spinner>
          )}

          {showLoad && !isLoading && images.length > 0 && (
            <div className="mx-auto mt-5">
              <Button
                onClick={handleVisible}
                className="load font-text btn"
                size="md"
              >
                Load more
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageList;
