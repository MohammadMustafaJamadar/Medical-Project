import React from "react";
import {
  FloatingLabel,
  Form,
  Container,
  Row,
  Col,
  Nav,
  Navbar,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import inputChanger from "../../utils/general";
import { useState } from "react";
import axios from "axios";

export default function LoginForm() {
  const [emailOrNumber, setEmailOrNumber] = useState("");
  const [password, setPassword] = useState("");

  const emailOrNumberChanger = (event) => {
    event.preventDefault();
    inputChanger(event, setEmailOrNumber);
  };

  const passwordrChanger = (event) => {
    event.preventDefault();
    inputChanger(event, setPassword);
  };

  const formSubmit = (event) => {
    event.preventDefault();
    const userRecords = { emailOrNumber, password };
    console.log(userRecords);
  };

  return (
    <>
      <Navbar expand="lg">
        <Container>
          <Navbar.Collapse className="justify-content-center">
            <Nav>
              <Link className="nav-link" aria-current="page" to="/login">
                Login
              </Link>
            </Nav>
            <Nav>
              <Link className="nav-link" aria-current="page" to="/signup">
                SignUp
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <hr />
      <br />
      <Container>
        <Row>
          <Col>
            <Form onSubmit={formSubmit}>
              <Form.Group className="mb-3" controlId="userEmailOrNumber">
                <FloatingLabel
                  controlId="userEmailOrNumber"
                  label="Mobile Number / Email ID"
                  className="mb-3"
                
                >
                  <Form.Control
                    type="text"
                    placeholder="userEmailOrNumber"
                    value={emailOrNumber}
                    onChange={emailOrNumberChanger}
                  />
                </FloatingLabel>
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="userpassword">
                <FloatingLabel controlId="userpassword" label="Password">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={passwordrChanger}
                  />
                </FloatingLabel>
              </Form.Group>
              {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
