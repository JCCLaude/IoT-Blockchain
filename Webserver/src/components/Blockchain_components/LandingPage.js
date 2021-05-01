import React from "react";
import { Jumbotron, Container, Row, Col } from "react-bootstrap";
import CurrentStatus from "./CurrentStatus.js";
import { useGlobalContext } from "../../context";

import "./blockchain.css";

function LandingPage() {
  const {
    co2Events,
    humidityEvents,
    temperatureEvents,
    error,
  } = useGlobalContext();

  const latestCO2Event = co2Events[co2Events.length - 1].returnValues;
  const latestHumidityEvent =
    humidityEvents[humidityEvents.length - 1].returnValues;
  const latestTemperatureEvent =
    temperatureEvents[temperatureEvents.length - 1].returnValues;

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
            <CurrentStatus name={"Carbondioxide"} {...latestCO2Event} />
            <CurrentStatus name={"Humidity"} {...latestHumidityEvent} />
            <CurrentStatus name={"Temperature"} {...latestTemperatureEvent} />
          </Row>
        )}
      </Container>
    </>
  );
}

export default LandingPage;
