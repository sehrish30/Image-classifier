import React from "react";
import { Navbar, Container, Nav, Image } from "react-bootstrap";
import logo from "../../logo.jpg";
import "../Classifer/Classifier.css";

const Navigation = () => {
  return (
    <Navbar className="navbar" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <Image src={logo} className="logo" rounded />
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link className="text navbar-link font-text" href="/">
            Home
          </Nav.Link>
          <Nav.Link className="text navbar-link font-text" href="/list">
            Images
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigation;
