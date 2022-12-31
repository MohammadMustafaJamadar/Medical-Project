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
  Alert,
} from "react-bootstrap"; //react-bootstrap se chezan lere
import { Link, useNavigate } from "react-router-dom";
import inputChanger from "../../utils/general"; //utils se input ke value chnge karne ka function lai
import { useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

export default function LoginForm(props) {
  const {setUserDetails} = props;

  const [emailOrNumber, setEmailOrNumber] = useState(""); //input me initial value dere
  const [password, setPassword] = useState(""); //input me initial value dere
  const [validation, setValidation] = useState(null); //validation ko initail value dere
  const [showAlert, setShowAlert] = useState(true); //alert ko value dere
  const [alertVariant, setAlertVariant] = useState(""); //alert ke variant ko value dere
  const navigator = useNavigate();

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
    axios
      .post("http://localhost:9000/login", userRecords, {
        withCredentials: true,
      })
      .then((res) => {
      
        const userDetails = res.data.userDetails;
        if (userDetails === undefined) {
          setValidation("User not found!");
          setAlertVariant("danger");
        } else {
          setValidation(res.data.massage); //alert ko massage dere
          setAlertVariant(res.data.variant); //alert ka variant badal re
          setShowAlert(true); //alert show karre
          setUserDetails(userDetails);
          navigator("/user");
          
        }
      })
      .catch((err) => {
        if (err) {
          setValidation("Server Error! Try after sometime");
          setShowAlert(true);
          setAlertVariant("danger");
          throw err;
        }
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
