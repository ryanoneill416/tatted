import React, { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import logo from "../assets/tatted-logo-no-bg.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { CurrentUserContext } from "../App";

const NavBar = () => {
  const currentUser = useContext(CurrentUserContext);
  const authenticatedIcons = <>{currentUser?.username}</>
  const unauthenticatedIcons = (
    <>
      <NavLink
        className={styles.Nav}
        activeClassName={styles.Active}
        to="/signin"
      >
        <i className="fa-solid fa-right-to-bracket" />
        Sign In
      </NavLink>
      <NavLink
        className={styles.Nav}
        activeClassName={styles.Active}
        to="/signup"
      >
        <i className="fa-solid fa-user-plus" />
        Sign Up
      </NavLink>
    </>
  );

  return (
    <Navbar variant="dark" expand="md" fixed="top" className={styles.NavBar}>
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="55" />
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-center">
            <NavLink
              exact
              className={styles.Nav}
              activeClassName={styles.Active}
              to="/"
            >
              <i className="fa-solid fa-house" />
              Home
            </NavLink>
            {currentUser ? authenticatedIcons : unauthenticatedIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
