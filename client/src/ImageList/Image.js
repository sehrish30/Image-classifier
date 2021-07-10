import React from "react";
import { Card } from "react-bootstrap";
import "../Classifer/Classifier.css";

const Image = ({ picture, name }) => (
  <Card className="mb-2 card__style">
    <Card.Img variant="top" src={picture} />
    <Card.Body>
      Classified as: <Card.Title>{name}</Card.Title>
    </Card.Body>
  </Card>
);

export default Image;
