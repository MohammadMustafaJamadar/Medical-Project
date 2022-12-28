import React from "react";
import { Container, Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function NavBar(props) {
  const { isUserLoggedIn, setUserDetails } = props;

  const navigateUser = useNavigate();
  const loginNavigate = (event) => {
    event.preventDefault();
    navigateUser("/login");
  };

  const logOutUser = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:9000/logout")
      .then(() => {
        setUserDetails({});
        navigateUser("/login");
      })
      .catch((err) => {
        if (err) throw err;
      });
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>ApEx HealthCare</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav>
                <Link className="nav-link" aria-current="page" to="/">
                  Home
                </Link>
              </Nav>
              <Nav>
                {isUserLoggedIn ? (
                  <Link className="nav-link" aria-current="page" to="/user">
                    User
                  </Link>
                ) : null}
              </Nav>
              <NavDropdown title="Account&Lists" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  {isUserLoggedIn ? (
                    <Button variant="outline-danger" onClick={logOutUser}>
                      Logout
                    </Button>
                  ) : (
                    <Button variant="outline-primary" onClick={loginNavigate}>
                      Login/SignUp
                    </Button>
                  )}
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
