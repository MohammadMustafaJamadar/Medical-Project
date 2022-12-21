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
  Alert
} from "react-bootstrap";
import { Link } from "react-router-dom";
import inputChanger from "../../utils/general";
import { useState } from "react";
import axios from "axios";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [emailOrNumber, setEmailOrNumber] = useState("");
  const [password, createPassword] = useState("");
  const [submitStatus, chageSubmitStatus] = useState(true);
  const [validation, setValidation] = useState(null)
  const [showAlert, setShowAlert] = useState(true)
  const [alertVariant, setAlertVariant] = useState("danger")

  const nameChanger = (event) => {
    event.preventDefault();
    inputChanger(event, setName);
  };

  const emailOrNumberChanger = (event) => {
    event.preventDefault();
    inputChanger(event, setEmailOrNumber);
  };

  const passwordChanger = (event) => {
    event.preventDefault();
    inputChanger(event, createPassword);
  };

  const submitStatusChhanger = () => {
    if (submitStatus === true) {
      chageSubmitStatus(false);
    } else {
      chageSubmitStatus(true);
    }
  };


  const formSubmit = (event) => {
    event.preventDefault();
    const userRecords = { name, emailOrNumber, password };
    if(name && emailOrNumber && password){
      if(password.length < 6){

        alert("password min 6")
        setValidation("Pass min 6")
        setShowAlert(true)
       
      }else{
        axios.post("http://localhost:9000/signup", userRecords).then((res)=>{
          console.log(res.data);
          setValidation(res.data.massage)
          setAlertVariant("success")
          setShowAlert(true)
          console.log(validation);
        }).catch((err)=>{
          if(err) throw err;
        })
        alert("posted")
      }
    }else{
      alert("invalid ")
    }
    
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
              {
                validation && showAlert ?  
                <Alert variant={alertVariant} onClose={()=>{setShowAlert(false)}} dismissible  >
                  {
                    validation
                  }
                </Alert> : null
              }
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
