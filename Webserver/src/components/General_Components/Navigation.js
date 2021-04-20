import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

import IBESlogo from "../../images/IBESlogo.png";

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
          <Nav.Item>
            <Link to="/">Home</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/overview">Overview</Link>
          </Nav.Item>
          <NavDropdown title="Detailed Information" id="basic-nav-dropdown">
            <NavDropdown.Item>
              <Link to="/detail">Why detailed?</Link>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>
              <Link to="/detail/carbondioxide">Carbondioxide (CO2)</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/detail/airhumidity">Airhumidity</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/detail/temperature">Temperature</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/detail/nitrogendioxide">Nitrogen Dioxide (NO2)</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/detail/pm2">Particular Matter 2 (PM2)</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/detail/pm10">Particular Matter 10 (PM10)</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/detail/sulfurdioxide">Sulfur Dioxide (SO2)</Link>
            </NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Verified Information" id="basic-nav-dropdown">
            <NavDropdown.Item>
              <Link to="/verified">Why verified?</Link>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>
              <Link to="/verified/carbondioxide">Carbondioxide (CO2)</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/verified/airhumidity">Airhumidity</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/verified/temperature">Temperature</Link>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
