import React from "react";
import { Container, Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigateUser = useNavigate();
  const loginNavigate = (event) => {
    event.preventDefault();
    navigateUser("/login");
  };
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">ApEx HealthCare</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav>
                <Link className="nav-link" aria-current="page" to="/">
                  Home
                </Link>
              </Nav>
              <Nav>
                <Link className="nav-link" aria-current="page" to="/user">
                  User
                </Link>
              </Nav>

              <NavDropdown title="Account&Lists" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  <Button variant="outline-primary" onClick={loginNavigate}>
                    Login/SignUp
                  </Button>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
