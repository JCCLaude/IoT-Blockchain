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
        <Nav>
          <Nav.Link as={Link} to="/">
            Overview
          </Nav.Link>
          <NavDropdown title="Detailed Information" variant="dark">
            <NavDropdown.Item
              variant="dark"
              as={Link}
              to="/detail"
              className="navdropdown"
            >
              Why detailed?
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="/detail/carbondioxide">
              Carbondioxide (CO2)
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/detail/airhumidity">
              Airhumidity
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/detail/temperature">
              Temperature
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/detail/nitrogendioxide">
              Nitrogen Dioxide (NO2)
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/detail/pm2">
              Particular Matter 2.5 (PM2.5)
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/detail/pm10">
              Particular Matter 10 (PM10)
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/detail/sulfurdioxide">
              Sulfur Dioxide (SO2)
            </NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Verified Information">
            <NavDropdown.Item as={Link} to="/verified">
              Why verified
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="/verified/carbondioxide">
              Carbondioxide (CO2)
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/verified/humidity">
              Airhumidity
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/verified/temperature">
              Temperature
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
