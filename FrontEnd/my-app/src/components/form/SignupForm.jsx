import React from "react";
import {
  Row,
  FloatingLabel,
  Form,
  Container,
  Col,
  Nav,
  Navbar,
  Button,
  Alert,
} from "react-bootstrap"; //react-bootstrap se chezan lere
import { Link } from "react-router-dom";
import inputChanger from "../../utils/general"; //utils se input ke value chnge karne ka function lai
import { useState } from "react";
import axios from "axios";

export default function SignupForm() {
  const [name, setName] = useState(""); //input me initial value dere
  const [emailOrNumber, setEmailOrNumber] = useState(""); //input me initial value dere
  const [password, createPassword] = useState(""); //input me initial value dere
  const [submitStatus, chageSubmitStatus] = useState(true); //submit ka button disable hai usko enable karre
  const [validation, setValidation] = useState(null); //validation ko initail value dere
  const [showAlert, setShowAlert] = useState(true); //alert ko value dere
  const [alertVariant, setAlertVariant] = useState(""); //alert ke variant ko value dere

  const nameChanger = (event) => {
    event.preventDefault();
    inputChanger(event, setName);
  };

  const emailOrNumberChanger = (event) => {
    event.preventDefault();
    inputChanger(event, setEmailOrNumber); //inputs ke value isme jo type kiya jai wo  karre
  };

  const passwordChanger = (event) => {
    event.preventDefault();
    inputChanger(event, createPassword); //inputs ke value isme jo type kiya jai wo  karre
  };

  const submitStatusChhanger = () => {
    //yaha per submit ke button ko enable aur disable kiya jara
    if (submitStatus === true) {
      chageSubmitStatus(false);
    } else {
      chageSubmitStatus(true);
    }
  };

  const formSubmit = (event) => {
    event.preventDefault();
    const userRecords = { name, emailOrNumber, password }; //pura user ka records save karre submit ke onclick per

    axios
      .post("http://localhost:9000/signup", userRecords)
      .then((res) => {
         //backend se data lere
        setValidation(res.data.massage);
        setAlertVariant(res.data.variant);
        setShowAlert(true);
      })
      .catch((err) => {
        if (err) throw err;
      });
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
              {validation && showAlert ? (
                <Alert
                  variant={alertVariant}
                  onClose={() => {
                    setShowAlert(false);
                  }}
                  dismissible
                >
                  {validation}
                </Alert>
              ) : null}
              <Form.Group className="mb-3" controlId="userName">
                <FloatingLabel controlId="userName" label="Full Name">
                  <Form.Control
                    type="text"
                    placeholder="userName"
                    value={name}
                    onChange={nameChanger}
                  />
                </FloatingLabel>
              </Form.Group>
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
                <FloatingLabel controlId="userpassword" label="Create Password">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={passwordChanger}
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Receive relevant offers and promotional communication from ApEx"
                  onClick={submitStatusChhanger}
                />
              </Form.Group>
              <Button variant="primary" type="submit" disabled={submitStatus}>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
