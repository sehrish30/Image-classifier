import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import "./Classifier.css";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import axios from "axios";

const Classifier = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadImage = (files) => {
    setTimeout(() => {
      console.log(`Haye${files}`);
      setLoading(false);
      setFiles(files);
    }, 1000);
  };
  // const getImages = () => {
  //   axios
  //     .get("http://127.0.0.1:8000/api/images/", {
  //       headers: {
  //         accept: "application/json",
  //       },
  //     })
  //     .then((resp) => {
  //       console.log(resp);
  //     });
  // };

  // useEffect(() => {
  //   getImages();
  // }, []);

  const sendImage = () => {
    let formData = new FormData();
    console.log(`files,${files[0]}`);
    formData.append("picture", files[0], files[0].path);
    axios
      .post("http://127.0.0.1:8000/api/images/", formData, {
        headers: {
          accept: "application/json",
          "content-type": "multipart/form-data",
        },
      })
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length >= 1) {
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
      <h4 className="font-text light__text">Files</h4>
      <ul className="light-text">{files[0]?.name}</ul>
      {files.length > 0 && (
        <Button onClick={sendImage} className="classify" size="lg">
          <span>Classify</span>
        </Button>
      )}
      {loading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
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
    </div>
  );
};
export default Classifier;
