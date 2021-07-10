import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import "./Classifier.css";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Table from "react-bootstrap/Table";
import { Image } from "react-bootstrap";
import axios from "axios";

const Classifier = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recentImage, setRecentImage] = useState(null);

  const loadImage = (files) => {
    setTimeout(() => {
      setLoading(false);
      setFiles(files);
    }, 1000);
  };

  const sendImage = () => {
    activateSpinner();
    let formData = new FormData();
    formData.append("picture", files[0], files[0].path);
    axios
      .post("http://127.0.0.1:8000/api/images/", formData, {
        headers: {
          accept: "application/json",
          "content-type": "multipart/form-data",
        },
      })
      .then((resp) => {
        console.log("CRY", resp.data.id);
        getImage(resp);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const activateSpinner = () => {
    setLoading(true);
    setFiles([]);
  };

  const deActivateSpinner = () => {
    setLoading(false);
  };

  const getImage = (obj) => {
    axios
      .get(`http://127.0.0.1:8000/api/images/${obj.data.id}/`, {
        headers: {
          accept: "application/json",
        },
      })
      .then((resp) => {
        console.log(resp);
        setRecentImage(resp);
      })
      .catch((err) => {
        console.log(err);
      });
    deActivateSpinner();
  };

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length >= 1) {
      setRecentImage(null);
      // Do something with the files
      setLoading(true);
      console.log(acceptedFiles);
      loadImage(acceptedFiles);
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
      <ul className="light-text">{files[0]?.name}</ul>
      {files.length > 0 && (
        <Button onClick={sendImage} className="classify" size="lg">
          <span>Classify</span>
        </Button>
      )}
      {loading && (
        <Spinner className="light__text" animation="border" role="status">
          <span className="sr-only light__text">Loading...</span>
        </Spinner>
      )}

      {recentImage && (
        <>
          <Image
            className="justify-content-center"
            src={recentImage.data.picture}
            height="200"
            rounded
          />
          <Alert className="alert">{recentImage.data.classified}</Alert>
        </>
      )}
      {files.length > 0 && (
        <div className="table">
          <Table className="light__text" striped bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>Image name</th>
                <th>Image path</th>
                <th>Image type</th>
                <th>Image size</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file, i) => (
                <tr key={i}>
                  <td>1</td>
                  <td>{file.name}</td>
                  <td>{file.path}</td>
                  <td>{file.type}</td>
                  <td>{file.size}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};
export default Classifier;
