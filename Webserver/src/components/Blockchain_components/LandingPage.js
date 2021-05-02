import React from "react";
import {
  Jumbotron,
  Container,
  Row,
  Col,
  Card,
  CardDeck,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import CurrentStatus from "./CurrentStatus.js";
import { useGlobalContext } from "../../BlockchainContext";
import co2img from "../../assets/images/CO2.jpg";
import airhumidityimg from "../../assets/images/airhumidity.jpg";
import temperatureimg from "../../assets/images/temperature.jpg";
import "./blockchain.css";

function LandingPage() {
  const {
    co2Events,
    co2Loading,
    humidityEvents,
    humidityLoading,
    temperatureEvents,
    temperatureLoading,
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
      <Container>
        <article>
          <h1>Why verified Information?</h1>
          <p>
            An essential component of IBES is the blockchain. The concept of the
            blockchain has become known especially through cryptocurrencies such
            as Bitcoin. But the blockchain can be used for much more. For
            example, to secure the data of hundreds of people at the same time.
            This makes it impossible for individual people to make changes that
            would have an advantage through altered data.
            <br />
            Since storing data in a blockchain isn´t as fast and cheap as in a
            regular database, only certain measurements of the IBES-Sensors are
            written to the blockchain. These entries include periodic
            checkup-data, but also every measurement that surpasses governmental
            limits
            <br />
            <br />
            <b>
              On this page you will find the current blockchain values as well
              as a link to history data for every measured emission
            </b>
          </p>
        </article>
      </Container>
      <hr />
      <hr />
      <Container className="text-center">
        <article>
          <h2>Latest measured values</h2>
          <p>
            Check below for the recent measurements, which have been commited
            and written to the blockchain
          </p>
        </article>
        {error ? (
          <Row>
            <Col md>
              <h1>Sorry, no Blockchain connection available</h1>
              <p>Come back later or contact the publishers</p>
            </Col>
          </Row>
        ) : (
          <CardDeck>
            <CurrentStatus
              name={"Carbondioxide"}
              unit="ppm"
              loading={co2Loading}
              demoCritical={"0"}
              {...latestCO2Event}
            />
            <CurrentStatus
              name={"Humidity"}
              unit="%"
              loading={humidityLoading}
              demoCritical={"1"}
              {...latestHumidityEvent}
            />
            <CurrentStatus
              name={"Temperature"}
              unit="°C"
              loading={temperatureLoading}
              demoCritical={"2"}
              {...latestTemperatureEvent}
            />
          </CardDeck>
        )}
      </Container>
      <hr />
      <hr />
      <Container>
        <article>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit tempore
          dolorem voluptate et tenetur aut voluptates repudiandae quas nulla
          cumque nam a molestias consectetur, ullam blanditiis illum minus
          similique! Quam, molestias optio amet nobis iste commodi, sit sunt
          consectetur voluptate nostrum, quis unde. Tempore, possimus! Esse
          omnis laborum sequi reiciendis asperiores amet iure, eveniet itaque
          culpa veritatis vel expedita, doloremque harum sapiente necessitatibus
          explicabo sunt. Temporibus rem quibusdam omnis dolore qui id
          reiciendis quas praesentium repudiandae. Sapiente magnam quam dolores
          facere nisi consequuntur sit velit eius. Quisquam tempora recusandae
          voluptas, quis eum placeat aliquid quaerat provident unde numquam
          laudantium nisi.
        </article>
      </Container>
    </>
  );
}

export default LandingPage;
