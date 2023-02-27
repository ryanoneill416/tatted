import React, { useEffect, useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Image from "react-bootstrap/Image";
import Figure from "react-bootstrap/Figure";
import Alert from "react-bootstrap/Alert";
import { useHistory, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

function PostEditForm() {
  const [errors, setErrors] = useState({});

  const [postData, setPostData] = useState({
    style: "",
    content: "",
    image: "",
  });
  const { style, content, image } = postData;

  const imageInput = useRef(null);

  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/${id}/`);
        const { style, content, image, is_owner } = data;

        is_owner ? setPostData({ style, content, image }) : history.push("");
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
  }, [history, id]);

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("style", style);
    formData.append("content", content);
    if (imageInput?.current?.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    try {
      await axiosReq.put(`/posts/${id}/`, formData);
      history.push(`/posts/${id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center pt-2 pb-3">
      <Form.Group>
        <Form.Label>Tattoo Style</Form.Label>
        {errors.style?.map((message, idx) => (
          <Alert
            variant="warning"
            className={`${appStyles.Alert} text-center`}
            key={idx}
          >
            {message}
          </Alert>
        ))}

        <Form.Control
          as="select"
          name="style"
          className={`${styles.Select} text-center`}
          value={style}
          onChange={handleChange}
          aria-label="style"
        >
          <option>Select a style</option>
          <option value="traditional">Traditional</option>
          <option value="neo-traditional">Neo-Traditional</option>
          <option value="japanese">Japanese</option>
          <option value="realism">Realism</option>
          <option value="fineline">Fineline</option>
          <option value="blackwork">Blackwork</option>
          <option value="color">Color</option>
          <option value="script">Script</option>
          <option value="other">Other</option>
        </Form.Control>
      </Form.Group>

      <Form.Group className="mt-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          name="content"
          rows={8}
          value={content}
          onChange={handleChange}
          className={styles.Input}
        />
      </Form.Group>
      {errors.content?.map((message, idx) => (
        <Alert
          variant="warning"
          className={`${appStyles.Alert} text-center`}
          key={idx}
        >
          {message}
        </Alert>
      ))}

      <Button
        className={`${btnStyles.Button} ${btnStyles.Secondary}`}
        onClick={() => history.goBack()}
      >
        Cancel
      </Button>
      <Button
        className={`${btnStyles.Button} ${btnStyles.Black}`}
        type="submit"
      >
        Save
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              <Figure>
                <Image className={`${appStyles.Image} pt-2`} src={image} rounded />
              </Figure>
              <div>
                <Form.Label
                  className={`${btnStyles.Button} ${btnStyles.Black} btn`}
                  htmlFor="image-upload"
                >
                  Change Image Selection
                </Form.Label>
              </div>
              <Form.File
                id="image-upload"
                accept="image/"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {errors.image?.map((message, idx) => (
              <Alert
                variant="warning"
                className={`${appStyles.Alert} text-center`}
                key={idx}
              >
                {message}
              </Alert>
            ))}
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default PostEditForm;
