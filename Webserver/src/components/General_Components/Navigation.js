import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

import IBESlogo from "../../assets/images/IBESlogo.png";

function Navigation() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand>
        <Link to="/">
          <img
            src={IBESlogo}
            width="50"
            height="50"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            Overview
          </Nav.Link>
          <Nav.Link as={Link} to="/co2">
            Carbondioxide
          </Nav.Link>
          <Nav.Link as={Link} to="/humidity">
            Airhumidity
          </Nav.Link>
          <Nav.Link as={Link} to="/temperature">
            Temperature
          </Nav.Link>
          <NavDropdown title="Greenhouse Gases">
            <NavDropdown.Item as={Link} to="/greenhousegas">
              About Greenhouse-Gases
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="/greenhousegas/one">
              Nitrogen Dioxide
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/greenhousegas/two">
              Sulfur Dioxide
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/greenhousegas/three">
              Particular Matter (2+10)
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          <Nav.Link as={Link} to="/blockchain">
            IBES and the Blockchain
          </Nav.Link>
          <Nav.Link as={Link} to="/about">
            About
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
