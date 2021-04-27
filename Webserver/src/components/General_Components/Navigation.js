import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./general.css";

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
        <Nav>
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/Overview">Overview</Nav.Link>
          <NavDropdown title="Detailed Information" variant="dark">
            <NavDropdown.Item
              variant="dark"
              href="/detail"
              className="navdropdown"
            >
              Why detailed?
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/detail/carbondioxide">
              Carbondioxide (CO2)
            </NavDropdown.Item>
            <NavDropdown.Item href="/detail/airhumidity">
              Airhumidity
            </NavDropdown.Item>
            <NavDropdown.Item href="/detail/temperature">
              Temperature
            </NavDropdown.Item>
            <NavDropdown.Item href="/detail/nitrogendioxide">
              Nitrogen Dioxide (NO2)
            </NavDropdown.Item>
            <NavDropdown.Item href="/detail/pm2">
              Particular Matter 2.5 (PM2.5)
            </NavDropdown.Item>
            <NavDropdown.Item href="/detail/pm10">
              Particular Matter 10 (PM10)
            </NavDropdown.Item>
            <NavDropdown.Item href="/detail/sulfurdioxide">
              Sulfur Dioxide (SO2)
            </NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Verified Information">
            <NavDropdown.Item href="/verified">Why verified</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/verified/carbondioxide">
              Carbondioxide (CO2)
            </NavDropdown.Item>
            <NavDropdown.Item href="/verified/humidity">
              Airhumidity
            </NavDropdown.Item>
            <NavDropdown.Item href="/verified/temperature">
              Temperature
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
