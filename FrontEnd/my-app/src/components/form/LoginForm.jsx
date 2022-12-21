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
} from "react-bootstrap"; //react-bootstrap se chezan lere
import { Link } from "react-router-dom";
import inputChanger from "../../utils/general"; //utils se input ke value chnge karne ka function lai
import { useState } from "react";
import axios from "axios";

export default function LoginForm() {
  const [emailOrNumber, setEmailOrNumber] = useState(""); //input me initial value dere
  const [password, setPassword] = useState(""); //input me initial value dere

  const emailOrNumberChanger = (event) => {
    event.preventDefault();
    inputChanger(event, setEmailOrNumber); //inputs ke value isme jo type kiya jai wo  karre
  };

  const passwordrChanger = (event) => {
    event.preventDefault();
    inputChanger(event, setPassword); //inputs ke value isme jo type kiya jai wo  karre
  };

  const formSubmit = (event) => {
    event.preventDefault();
    const userRecords = { emailOrNumber, password }; //pura user ka records save karre submit ke onclick per
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
