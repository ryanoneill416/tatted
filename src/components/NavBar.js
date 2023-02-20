import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import logo from "../assets/tatted-logo-no-bg.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickAwayToggle from "../hooks/useClickAwayToggle";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrenUser = useSetCurrentUser();

  const { expanded, setExpanded, ref } = useClickAwayToggle();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrenUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const newPostIcon = (
    <NavLink
      className={styles.Nav}
      activeClassName={styles.Active}
      to="/posts/create"
    >
      <i className="far fa-plus-square" />
      New Post
    </NavLink>
  );

  const authenticatedIcons = (
    <>
      <NavLink
        className={styles.Nav}
        activeClassName={styles.Active}
        to="/feed"
      >
        <i className="fas fa-stream" />
        Feed
      </NavLink>
      <NavLink
        className={styles.Nav}
        activeClassName={styles.Active}
        to="/saved"
      >
        <i className="fas fa-bookmark" />
        Saved
      </NavLink>
      <NavLink
        className={styles.Nav}
        to={`/profiles/${currentUser?.profile_id}`}
        onClick={() => {}}
      >
        <Avatar src={currentUser?.profile_image} height={35} text="Profile" />
      </NavLink>
      <NavLink className={styles.Nav} to="/" onClick={handleSignOut}>
        <i className="fas fa-sign-out" />
        Sign Out
      </NavLink>
    </>
  );

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
    <Navbar
      expanded={expanded}
      variant="dark"
      expand="lg"
      fixed="top"
      className={styles.NavBar}
    >
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="55" />
          </Navbar.Brand>
        </NavLink>
        {currentUser?.is_artist && newPostIcon}
        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-center">
            <NavLink
              exact
              className={styles.Nav}
              activeClassName={styles.Active}
              to="/"
            >
              <i className="fas fa-house" />
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
