import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import "./Classifier.css";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";

const Classifier = () => {
  const [files, setFiles] = useState({});
  const [loading, setLoading] = useState(false);

  const loadImage = (files) => {
    setTimeout(() => {
      setLoading(false);
      setFiles(files);
    });
  };
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

  useEffect(() => {
    getImages();
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length >= 1) {
      // Do something with the files
      setLoading(true);

      loadImage(acceptedFiles);
      console.log(acceptedFiles);
    } else {
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
  });

  return (
    <div className="background">
      <div {...getRootProps({ className: "dropzone back image__box" })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <div className="">
            <p>Drop some images</p>
          </div>
        ) : (
          <>
            <div className="">
              <i className="far fa-image mb-2 fa-3x text"></i>
              <p className="text font-text ">
                Drag 'n' drop some files here, or click to select files
              </p>
            </div>
          </>
        )}
      </div>
      <h4 className="font-text">Files</h4>
      <ul>{files[0]?.name}</ul>
      {loading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
    </div>
  );
};
export default Classifier;