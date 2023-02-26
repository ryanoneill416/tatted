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
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "../posts/Post";
import { fetchMoreData } from "../../utils/utils";
import noResults from "../../assets/noresults.png";
import { EditProfileDropdown } from "../../components/DropdownOptions";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;
  const [profilePosts, setProfilePosts] = useState({ results: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }, { data: profilePosts }] =
          await Promise.all([
            axiosReq.get(`/profiles/${id}/`),
            axiosReq.get(`/posts/?owner__profile=${id}`),
          ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setProfilePosts(profilePosts);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);

  const profileHeader = (
    <>
      {profile?.is_owner && <EditProfileDropdown id={profile.id} />}
      <Row noGutters className="px-3 text-center">
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
                    className={`${btnStyles.Button} ${btnStyles.Secondary} ${btnStyles.ProfileFollow} mb-3`}
                    onClick={() => handleUnfollow(profile)}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    className={`${btnStyles.Button} ${btnStyles.Black} ${btnStyles.ProfileFollow} mb-3`}
                    onClick={() => handleFollow(profile)}
                  >
                    Follow
                  </button>
                ))}
            </Col>
          </Row>
        </Col>
        {profile?.bio && <Row>
          <Col>
            <hr />
            <p className="py-2">{profile.bio}</p>
          </Col>
        </Row>}
      </Row>
    </>
  );

  const profilePostDisplay = (
    <>
      {profilePosts.results.length ? (
        <div className="mt-3">
          <InfiniteScroll
            children={profilePosts.results.map((post) => (
              <Post key={post.id} {...post} setPosts={setProfilePosts} />
            ))}
            dataLength={profilePosts.results.length}
            loader={<Asset spinner />}
            hasMore={!!profilePosts.next}
            next={() => fetchMoreData(profilePosts, setProfilePosts)}
          />
        </div>
      ) : profile?.is_artist === true ? (
        <div className="mt-3">
          <Asset
            src={noResults}
            message={`No results found, ${profile?.owner} hasn't posted yet :)`}
          />
        </div>
      ) : null}
    </>
  );

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PoppingArtists mobile />
        {hasLoaded ? (
          <>
            <Container className={`${appStyles.Content} py-3`}>{profileHeader}</Container>
            {profilePostDisplay}
          </>
        ) : (
          <Asset spinner />
        )}
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PoppingArtists />
      </Col>
    </Row>
  );
}

export default ProfilePage;
