import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";

import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Comment from "../comments/Comment";
import InfiniteScroll from "react-infinite-scroll-component";
import PoppingArtists from "../profiles/PoppingArtists";

function PostDetailPage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: post }, { data: comments }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
          axiosReq.get(`/comments/?post=${id}`),
        ]);
        setPost({ results: [post] });
        setComments(comments);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err)
      }
    };
    setHasLoaded(false);
    const timer = setTimeout(() => {
      handleMount();
    }, 350);

    return () => {
      clearTimeout(timer);
    };
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PoppingArtists mobile />
        {hasLoaded ? (
          <>
            <Post {...post.results[0]} setPosts={setPost} postDetailPage />
            <Container className={`${appStyles.Content} pt-3 pb-2`}>
              {currentUser ? (
                <CommentCreateForm
                  profile_id={currentUser.profile_id}
                  profile_image={profile_image}
                  post={id}
                  setPost={setPost}
                  setComments={setComments}
                />
              ) : comments.results.length ? (
                <p className="my-auto">Comments:</p>
              ) : null}
              {comments.results.length ? (
                <InfiniteScroll
                  children={comments.results.map((comment) => (
                    <Comment
                      key={comment.id}
                      {...comment}
                      setPost={setPost}
                      setComments={setComments}
                    />
                  ))}
                  dataLength={comments.results.length}
                  loader={<Asset spinner />}
                  hasMore={!!comments.next}
                  next={() => fetchMoreData(comments, setComments)}
                />
              ) : currentUser ? null : (
                <p className="py-3 my-auto text-center">No comments have been made... yet ;)</p>
              )}
            </Container>
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

export default PostDetailPage;
