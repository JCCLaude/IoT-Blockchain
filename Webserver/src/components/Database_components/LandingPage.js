import { React, useEffect, useState } from "react";
import { Card, Accordion, Button, Jumbotron, Container, Row, CardGroup, } from "react-bootstrap";
import CurrentStatus from "./CurrentStatus.js";
import { Link } from "react-router-dom";
import "./style.components.css";
import axios from "axios";

import co2img from "../../assets/images/CO2.jpg";
import airhumidityimg from "../../assets/images/airhumidity.jpg";
import temperatureimg from "../../assets/images/temperature.jpg";
import no2img from "../../assets/images/no2.jpg";
import pm2img from "../../assets/images/pm2.jpg";
import pm10img from "../../assets/images/pm10.jpg";
import so2img from "../../assets/images/so2.jpg";
import { useGlobalContext } from "../../context";

const colimitred = 1000;

function LandingPage() {
  const {
    co2Eventdb, 
    airhumidityEventdb, 
    temperatureEventdb, 
    errordb, 
    nitrogendioxideEventdb, 
    particularmatter2Eventdb, 
    particularmatter10Eventdb, 
    sulfurdioxideEventdb,
  } = useGlobalContext();

  return (
    <>
      <Jumbotron fluid className="jumbo">
        <div className="overlay "> </div>
        <Container className="d-none d-lg-block">
          <h1>Welcome to the regular Database part of IBES</h1>
          <p>Find detailed emission data by thousands of people!</p>
        </Container>
      </Jumbotron>
      <div className="container">
        <article>
          <h1>Why detailed Information?</h1>
          <p>
            All data measured by the IoT sensors is stored centrally in a
            database. These can all be viewed here. This data includes the
            measured values, the date and time, and the location of the
            measurement.
          </p>

          <Container className="dark rounded text-center">
            <Row>
              <CurrentStatus name={"Carbon Dioxide"} {...co2Eventdb} />
              <CurrentStatus name={"Air Humidity"} {...airhumidityEventdb} />
              <CurrentStatus name={"Temperature"} {...temperatureEventdb} />
              <CurrentStatus name={"Nitrogen Dioxide"} {...nitrogendioxideEventdb} />
              <CurrentStatus name={"Particular Matter 2.5"} {...particularmatter2Eventdb} />
              <CurrentStatus name={"Particular Matter 10"} {...particularmatter10Eventdb} />
              <CurrentStatus name={"Sulfur Dioxdie"} {...sulfurdioxideEventdb} />
            </Row>
          </Container>

          <br></br>

          <h2>Measured values</h2>
          <div className="row">
            <div class="col-sm-4">
              <Card>
                <img
                  class="card-img-top"
                  src={co2img}
                  width="150"
                  height="150"
                  alt="CO2 image"
                ></img>
                <Card.Header>
                  <b>Carbon Dioxide</b>
                </Card.Header>
                <Card.Body>
                  Here you will find a link to the Carbon Dioxide (CO2) webside.
                </Card.Body>
                <Link to="/detail/carbondioxide">
                  <Button size="md" variant="info" block>
                    CO2
                  </Button>
                </Link>
              </Card>
            </div>

            <div class="col-sm-4">
              <Card>
                <img
                  class="card-img-top"
                  src={airhumidityimg}
                  width="150"
                  height="150"
                  alt="Air Humidity Image"
                ></img>
                <Card.Header>
                  <b>Air Humidity</b>
                </Card.Header>
                <Card.Body>
                  Here you will find a link to the Air Humidity webside.
                </Card.Body>
                <Link to="/detail/airhumidity">
                  <Button size="md" variant="info" block>
                    Air Humidity
                  </Button>
                </Link>
              </Card>
            </div>

            <div class="col-sm-4">
              <Card>
                <img
                  class="card-img-top"
                  src={temperatureimg}
                  width="150"
                  height="150"
                  alt="Temperature Image"
                ></img>
                <Card.Header>
                  <b>Temperature</b>
                </Card.Header>
                <Card.Body>
                  Here you will find a link to the Temperature webside.
                </Card.Body>
                <Link to="/detail/temperature">
                  <Button size="md" variant="info" block>
                    Temperature
                  </Button>
                </Link>
              </Card>
            </div>

            <div class="col-sm-4">
              <Card>
                <img
                  class="card-img-top"
                  src={no2img}
                  width="150"
                  height="150"
                  alt="NO2 Image"
                ></img>
                <Card.Header>
                  <b>Nitrogen Dioxide</b>
                </Card.Header>
                <Card.Body>
                  Here you will find a link to the Nitrogen Dioxide (NO2)
                  webside.
                </Card.Body>
                <Link to="/detail/nitrogendioxide">
                  <Button size="md" variant="info" block>
                    Nitrogen Dioxide
                  </Button>
                </Link>
              </Card>
            </div>

            <div class="col-sm-4">
              <Card>
                <img
                  class="card-img-top"
                  src={pm2img}
                  width="150"
                  height="150"
                  alt="PM2.5 Image"
                ></img>
                <Card.Header>
                  <b>Particular Matter 2.5</b>
                </Card.Header>
                <Card.Body>
                  Here you will find a link to the Particular Matter 2.5 (PM2.5)
                  webside.
                </Card.Body>
                <Link to="/detail/particularmatter2">
                  <Button size="md" variant="info" block>
                    Particular Matter 2.5
                  </Button>
                </Link>
              </Card>
            </div>

            <div class="col-sm-4">
              <Card>
                <img
                  class="card-img-top"
                  src={pm10img}
                  width="150"
                  height="150"
                  alt="PM10 Image"
                ></img>
                <Card.Header>
                  <b>Particular Matter 10</b>
                </Card.Header>
                <Card.Body>
                  Here you will find a link to the Particular Matter 10 (PM10)
                  webside.
                </Card.Body>
                <Link to="/detail/particularmatter10">
                  <Button size="md" variant="info" block>
                    Particular Matter 10
                  </Button>
                </Link>
              </Card>
            </div>

            <div class="col-sm-4 mx-auto">
              <Card>
                <img
                  class="card-img-top"
                  src={so2img}
                  width="150"
                  height="150"
                  alt="SO2 Image"
                ></img>
                <Card.Header>
                  <b>Sulfur Dioxdie</b>
                </Card.Header>
                <Card.Body>
                  Here you will find a link to the Sulfur Dioxdie (SO2) webside.
                </Card.Body>
                <Link to="/detail/sulfurdioxdie">
                  <Button size="md" variant="info" block>
                    Sulfur Dioxdie
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}

export default LandingPage;
