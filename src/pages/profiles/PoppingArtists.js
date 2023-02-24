import React from "react";
import Container from "react-bootstrap/Container";
import styles from "../../App.module.css";
import Asset from "../../components/Asset";
import { useProfileData } from "../../contexts/ProfileDataContext";
import Profile from "./Profile";

const PoppingArtists = ({ mobile }) => {
  const { poppingProfiles } = useProfileData();

  return (
    <Container
      className={`${styles.Content} ${mobile && "d-lg-none text-center mb-3"}`}
    >
      {poppingProfiles.results.length ? (
        <>
          <p>Our Most Popular Artists</p>
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
