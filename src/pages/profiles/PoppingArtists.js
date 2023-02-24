import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../App.module.css";
import Asset from "../../components/Asset";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Profile from "./Profile";

const PoppingArtists = ({ mobile }) => {
  const [profileData, setProfileData] = useState({
    poppingProfiles: { results: [] },
    pageProfile: { results: [] },
  });
  const { poppingProfiles } = profileData;
  const currentUser = useCurrentUser();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          "/profiles/?ordering=-followers_count"
        );
        setProfileData((prevState) => ({
          ...prevState,
          poppingProfiles: data,
        }));
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [currentUser]);

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
