import React from "react";
import styles from "../../styles/Post.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Avatar from "../../components/Avatar";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import { Link } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { axiosRes } from "../../api/axiosDefaults";

const Post = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    likes_count,
    like_id,
    save_id,
    content,
    style,
    image,
    updated_at,
    postDetailPage,
    setPosts,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleLike = async () => {
    try {
        const {data} = await axiosRes.post('/likes/', {post:id})
        setPosts((prevPosts) => ({
            ...prevPosts,
            results: prevPosts.results.map((post) => {
                return post.id === id
                ? {...post, likes_count: post.likes_count + 1, like_id: data.id}
                : post
            }),
        }))
    } catch(err) {
        console.log(err)
    }
  }

  const handleUnlike = async () => {
    try {
        await axiosRes.delete(`/likes/${like_id}`)
        setPosts((prevPosts) => ({
            ...prevPosts,
            results: prevPosts.results.map((post) => {
                return post.id === id
                ? {...post, likes_count: post.likes_count - 1, like_id: null}
                : post
            }),
        }))
    } catch(err) {
        console.log(err)
    }
  }

  const handleSave = async () => {
    try {
        const {data} = await axiosRes.post('/saves/', {post:id})
        setPosts((prevPosts) => ({
            ...prevPosts,
            results: prevPosts.results.map((post) => {
                return post.id === id
                ? {...post, save_id: data.id}
                : post
            }),
        }))
    } catch(err) {
        console.log(err)
    }
  }

  const handleUnsave = async () => {
    try {
        await axiosRes.delete(`/saves/${save_id}`)
        setPosts((prevPosts) => ({
            ...prevPosts,
            results: prevPosts.results.map((post) => {
                return post.id === id
                ? {...post, save_id: null}
                : post
            }),
        }))
    } catch(err) {
        console.log(err)
    }
  }

  return (
    <Card className={styles.Post}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`} className={styles.Owner}>
            <Avatar src={profile_image} height={60} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
            {is_owner && postDetailPage && "..."}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/posts/${id}`}>
        <Card.Img src={image} alt={`${style} style tattoo`} />
      </Link>
      <Card.Body>
        {content && <Card.Text>{content}</Card.Text>}
        <Link to="/" className={`${btnStyles.Button} ${btnStyles.Black} ${styles.Style}`}>
            {style}
        </Link>
        <div className={`${styles.PostBar} pt-3`}>
            {is_owner ? (
                <OverlayTrigger placement="top" overlay={<Tooltip>You cannot like your own post!</Tooltip>}>
                    <i className="far fa-heart" />
                </OverlayTrigger>
            ) : like_id ? (
                <span onClick={handleUnlike}>
                    <i className={`fas fa-heart ${styles.Heart}`} />
                </span>
            ) : currentUser ? (
                <span onClick={handleLike}>
                    <i className={`far fa-heart ${styles.HeartOutline}`} />
                </span>
            ) : (
                <OverlayTrigger placement="top" overlay={<Tooltip>You must be signed in to like a post!</Tooltip>}>
                    <i className="far fa-heart" />
                </OverlayTrigger>
            )}
            {likes_count}
            <Link to={`/posts/${id}`}>
                <i className={`far fa-comments ${styles.CommentLogo}`} />
            </Link>
            {comments_count}
            {is_owner ? (
                <OverlayTrigger placement="top" overlay={<Tooltip>You cannot save your own post!</Tooltip>}>
                    <i className="far fa-bookmark" />
                </OverlayTrigger>
            ) : save_id ? (
                <span onClick={handleUnsave}>
                    <i className={`fas fa-bookmark ${styles.Heart}`} />
                </span>
            ) : currentUser ? (
                <span onClick={handleSave}>
                    <i className={`far fa-bookmark ${styles.HeartOutline}`} />
                </span>
            ) : (
                <OverlayTrigger placement="top" overlay={<Tooltip>You must be signed in to save a post!</Tooltip>}>
                    <i className="far fa-bookmark" />
                </OverlayTrigger>
            )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Post;
