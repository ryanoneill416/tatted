import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import styles from "../../App.module.css";
import Asset from "../../components/Asset";
import { useProfileData } from "../../contexts/ProfileDataContext";
import Profile from "./Profile";
import logo from "../../assets/mostpoppin.png"

const PoppingArtists = ({ mobile }) => {
  const { poppingProfiles } = useProfileData();

  return (
    <Container
      className={`${styles.Content} ${mobile && "d-lg-none text-center mb-3"}`}
    >
      {poppingProfiles.results.length ? (
        <>
          <Row className="text-center">
            <Col>
              <img src={logo} height={40} className="my-3" alt="most popular artists"/>
            </Col>
          </Row>
          {mobile ? (
            <div className="d-flex justify-content-around">
              {poppingProfiles.results
                .filter((profile) => profile.is_artist === true)
                .slice(0, 4)
                .map((profile) => (
                  <Profile key={profile.id} profile={profile} mobile />
                ))}
            </div>
          ) : (
            poppingProfiles.results
              .filter((profile) => profile.is_artist === true)
              .map((profile) => <Profile key={profile.id} profile={profile} />)
          )}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default PoppingArtists;
