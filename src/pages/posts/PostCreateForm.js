import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import Upload from "../../assets/uploading-arrow-signal.webp";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";
import Image from "react-bootstrap/Image";
import Figure from "react-bootstrap/Figure";

function PostCreateForm() {
  const [errors, setErrors] = useState({});

  const [postData, setPostData] = useState({
    style: "",
    content: "",
    image: "",
  });
  const { style, content, image } = postData;

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

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Tattoo Style</Form.Label>

        <Form.Control
          as="select"
          name="style"
          className="text-center"
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
        />
      </Form.Group>

      <Button
        className={`${btnStyles.Button} ${btnStyles.Secondary}`}
        onClick={() => {}}
      >
        Cancel
      </Button>
      <Button
        className={`${btnStyles.Button} ${btnStyles.Black}`}
        type="submit"
      >
        Submit
      </Button>
    </div>
  );

  return (
    <Form>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              {image ? (
                <>
                  <Figure>
                    <Image className={appStyles.Image} src={image} rounded/>
                  </Figure>
                  <div>
                    <Form.Label
                        className={`${btnStyles.Button} ${btnStyles.BlackOutline} btn`} htmlFor="image-upload"
                    >
                        Change Image Selection
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset
                    src={Upload}
                    message="Click or tap to upload an image"
                  />
                </Form.Label>
              )}
              <Form.File
                id="image-upload"
                accept="image/"
                onChange={handleChangeImage}
              />
            </Form.Group>
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

export default PostCreateForm;
