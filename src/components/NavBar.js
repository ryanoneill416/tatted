import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import logo from '../assets/tatted-logo-no-bg.png';
import styles from '../styles/NavBar.module.css';

const NavBar = () => {
  return (
    <Navbar variant="dark" expand="md" fixed="top" className={styles.NavBar}>
      <Container>
        <Navbar.Brand><img src={logo} alt="logo" height="55"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-center">
            <Nav.Link className={styles.Nav}><i className="fa-solid fa-house"/>Home</Nav.Link>
            <Nav.Link className={styles.Nav}><i className="fa-solid fa-right-to-bracket"/>Sign In</Nav.Link>
            <Nav.Link className={styles.Nav}><i className="fa-solid fa-user-plus"/>Sign Up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
