import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../App.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

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
      <p>Most Poppin' Artists</p>
      {mobile ? (
        <div className="d-flex justify-content-around">
          {poppingProfiles.results
            .filter((profile) => profile.is_artist === true)
            .slice(0, 4)
            .map((profile) => (
              <p key={profile.id}>{profile.owner}</p>
            ))}
        </div>
      ) : (
        poppingProfiles.results
          .filter((profile) => profile.is_artist === true)
          .map((profile) => <p key={profile.id}>{profile.owner}</p>)
      )}
    </Container>
  );
};

export default PoppingArtists;
