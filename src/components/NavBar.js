import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import logo from '../assets/tatted-logo-no-bg.png';

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="md" fixed="top">
      <Container>
        <Navbar.Brand><img src={logo} alt="logo" height="55"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link><i className="fa-solid fa-house"/>Home</Nav.Link>
            <Nav.Link><i className="fa-solid fa-right-to-bracket"/>Sign In</Nav.Link>
            <Nav.Link><i className="fa-solid fa-user-plus"/>Sign Up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
