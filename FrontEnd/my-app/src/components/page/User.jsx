import React from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Form, Button } from "react-bootstrap";
import "../css/userprofile.css";
import { useState } from "react";
import { imageChanger } from "../../utils/general.js";
import axios from "axios";
import { BsPencil } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function User(props) {
  const { userDetails } = props;
  const { userName, userNumber, userEmail } = userDetails;
  const [image, setImage] = useState(null);

  const imageUpload = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("photo", image);
    const config = {
      headers: {
        "content-type": "multipart/fotm-data",
      },
    };
    axios.post("http://localhost:9000/image", formData, config);
  };

  const fileInputChanger = (event) => {
    imageChanger(event, setImage);
  };

  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="6" className="mb-4 mb-lg-0">
              <MDBCard className="mb-3" style={{ borderRadius: ".5rem" }}>
                <MDBRow className="g-0">
                  <MDBCol
                    md="4"
                    className="gradient-custom text-center text-white"
                    style={{
                      borderTopLeftRadius: ".5rem",
                      borderBottomLeftRadius: ".5rem",
                    }}
                  >
                    <MDBCardImage
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                      alt="Avatar"
                      className="my-5"
                      style={{ width: "80px" }}
                      fluid
                    />
                    <Form method="POST" onSubmit={imageUpload}>
                      <Form.Group controlId="FormImage" className="mb-3">
                        <Form.Label>Select profile pic</Form.Label>
                        <Form.Control
                          type="file"
                          size="sm"
                          name="photo"
                          onChange={fileInputChanger}
                          style={{ display: "none" }}
                        />{" "}
                        <br />
                        <Button type="submit" variant="primary">
                          Upload
                        </Button>
                      </Form.Group>
                    </Form>
                    <MDBTypography tag="h5">{userName}</MDBTypography>
                    <MDBCardText>Web Designer</MDBCardText>
                    <MDBIcon far icon="edit mb-5" />
                  </MDBCol>
                  <MDBCol md="8">
                    <MDBCardBody className="p-4">
                      <MDBRow>
                        <MDBCol size="4">
                          <MDBTypography tag="h6">Information </MDBTypography>
                        </MDBCol>
                        <MDBCol size="4"></MDBCol>
                        <MDBCol size="4">
                          <MDBTypography tag="h6">
                          <Link
                              className="nav-link"
                              aria-current="page"
                              to="/edituserinfo"
                            >
                            Edit profile{" "}
                          
                              <BsPencil />
                            </Link>
                          </MDBTypography>
                        </MDBCol>
                      </MDBRow>

                      {/* BsPencil */}

                      <hr className="mt-0 mb-4" />
                      <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Full Name:</MDBTypography>
                          <MDBCardText className="text-muted">
                            {userName}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Phone:</MDBTypography>
                          <MDBCardText className="text-muted">
                            {userNumber ? (
                              userNumber
                            ) : (
                              <Button variant="primary" type="submit">
                                Add Number
                              </Button>
                            )}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>

                      <MDBTypography tag="h6"></MDBTypography>
                      <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Email:</MDBTypography>
                          <MDBCardText className="text-muted">
                            {userEmail ? (
                              userEmail
                            ) : (
                              <Button variant="primary" type="submit">
                                Add Email
                              </Button>
                            )}
                          </MDBCardText>
                        </MDBCol>
                        {/* <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Phone</MDBTypography>
                          <MDBCardText className="text-muted">
                            123 456 789
                          </MDBCardText>
                        </MDBCol> */}
                      </MDBRow>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </>
  );
}
