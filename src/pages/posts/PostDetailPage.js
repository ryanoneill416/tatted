import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";

function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] })

  useEffect(() => {
    const handleMount = async () => {
        try {
            const [{ data: post }] = await Promise.all([
                axiosReq.get(`/posts/${id}`),
            ])
            setPost({results: [post]})
            console.log(post)
        } catch(err) {
            console.log(err)
        }
    }

    handleMount()
  }, [id])


  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popping artists mobile</p>
        <Post {...post.results[0]} setPosts={setPost} postDetailPage/>
        <Container className={appStyles.Content}>
          Comments
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popping artists desktop
      </Col>
    </Row>
  );
}

export default PostDetailPage;