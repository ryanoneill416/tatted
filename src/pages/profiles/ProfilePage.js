import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Asset from "../../components/Asset";

import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import PoppingArtists from "./PoppingArtists";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";
import { Image } from "react-bootstrap";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const setProfileData = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }] = await Promise.all([
          axiosReq.get(`/profiles/${id}/`),
        ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);

  const profileHeader = (
    <>
      <Row noGutters className="px-3 text-center py-2">
        <Col lg={3} className="text-lg-left">
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.image}
          />
        </Col>
        <Col lg={6}>
          <h4 className="m-2 pb-2">{profile?.owner}</h4>
          <Row className="no-gutters justify-content-between">
            <Col xs={4} className="my-2">
              <div>{profile?.posts_count}</div>
              <div>posts</div>
            </Col>
            <Col xs={4} className="my-2">
              <div>{profile?.followers_count}</div>
              <div>followers</div>
            </Col>
            <Col xs={4} className="my-2">
              <div>{profile?.following_count}</div>
              <div>following</div>
            </Col>
            <Col className="pt-3">
              {currentUser &&
                !is_owner &&
                (profile?.following_id ? (
                  <button
                    className={`${btnStyles.Button} ${btnStyles.Secondary} ${btnStyles.ProfileFollow}`}
                    onClick={() => {}}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    className={`${btnStyles.Button} ${btnStyles.Black} ${btnStyles.ProfileFollow}`}
                    onClick={() => {}}
                  >
                    Follow
                  </button>
                ))}
            </Col>
          </Row>
        </Col>
        {profile?.content && <Col className="p-3">{profile.content}</Col>}
      </Row>
    </>
  );

  const profilePosts = <></>;

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PoppingArtists mobile />
        <Container className={appStyles.Content}>
          {hasLoaded ? (
            <>
              {profileHeader}
              {profilePosts}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PoppingArtists />
      </Col>
    </Row>
  );
}

export default ProfilePage;
