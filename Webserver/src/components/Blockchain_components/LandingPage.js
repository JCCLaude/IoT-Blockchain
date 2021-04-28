import { React, useEffect, useState } from "react";
import { Jumbotron, Container, Row, Col } from "react-bootstrap";
import CurrentStatus from "./CurrentStatus.js";
import { useGlobalContext } from "../../context";
import "./blockchain.css";

function LandingPage() {
  const {
    co2Event,
    humidityEvent,
    temperatureEvent,
    error,
  } = useGlobalContext();
  return (
    <>
      <Jumbotron fluid className="jumbo">
        <div className="overlay "> </div>
        <Container className="d-none d-lg-block">
          <h1>Welcome to the Blockchain part of IBES</h1>
          <p>Find emission data verified by thousands of people!</p>
        </Container>
      </Jumbotron>
      <br />
      <br />
      <Container className="dark rounded text-center">
        {error ? (
          <Row>
            <Col md>
              <h1>Sorry, no Blockchain connection available</h1>
              <p>Come back later or contact the publishers</p>
            </Col>
          </Row>
        ) : (
          <Row>
            <CurrentStatus name={"Carbondioxide"} {...co2Event} />
            <CurrentStatus name={"Humidity"} {...humidityEvent} />
            <CurrentStatus name={"Temperature"} {...temperatureEvent} />
          </Row>
        )}
      </Container>
    </>
  );
}

export default LandingPage;
