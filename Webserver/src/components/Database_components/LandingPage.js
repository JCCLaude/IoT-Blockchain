import { React, useEffect, useState } from "react";
import { Card, Jumbotron, Container, Row, CardDeck, CardGroup, } from "react-bootstrap";
import CurrentStatus from "./CurrentStatus.js";
import { Link } from "react-router-dom";
import "./style.components.css";
import { useGlobalContext } from "../../context";
import co2img from "../../assets/images/CO2.jpg";
import airhumidityimg from "../../assets/images/airhumidity.jpg";
import temperatureimg from "../../assets/images/temperature.jpg";
import no2img from "../../assets/images/no2.jpg";
import pm2img from "../../assets/images/pm2.jpg";
import pm10img from "../../assets/images/pm10.jpg";
import so2img from "../../assets/images/so2.jpg";

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
            All data measured by IoT sensors is stored centrally in a
            database. These can all be viewed here. This data includes the
            measured values, the date and time, and the location of the
            measurement. 
            <br></br>
            Directly underneath, the last measured values can be viewed in 
            order to provide up-to-date and almost real-time information about 
            the air quality.
            Below are links to the websites of the individual values and more 
            detailed information there.
            <br></br><br></br>
            <b>On this page you will find the current database values as well as a link to the history data for every measured emission.</b>
          </p>
          <br></br>

          <Container className="dark rounded text-center">
            <Row>
              <CurrentStatus name={"Carbon Dioxide"} {...co2Eventdb} unit="ppm" demoCritical={"0"} />
              <CurrentStatus name={"Air Humidity"} {...airhumidityEventdb} unit="%" demoCritical={"1"}/>
              <CurrentStatus name={"Temperature"} {...temperatureEventdb} unit="°C" demoCritical={"2"}/>
              <CurrentStatus name={"Nitrogen Dioxide"} {...nitrogendioxideEventdb} unit="ppm" />
              <CurrentStatus name={"Particular Matter 2.5"} {...particularmatter2Eventdb} unit="ppm" />
              <CurrentStatus name={"Particular Matter 10"} {...particularmatter10Eventdb} unit="ppm" />
              <CurrentStatus name={"Sulfur Dioxdie"} {...sulfurdioxideEventdb} unit="ppm"/>
            </Row>
          </Container>

          <br></br>

          <h2>Measured values - History Data</h2>
          <p>Click on a picture to get more information.</p>
          <div className="row">
            <div class="col-sm-4">
              <Card>
              <Link to="/detail/carbondioxide">
                <img class="card-img-top" src={co2img} width="150" height="150" alt="CO2" ></img>
                <Card.Header>
                  <b>Carbon Dioxide</b>
                </Card.Header>
                </Link>
                <Card.Body>
                  Here you will find a link to the Carbon Dioxide (CO2) website.
                  <br></br><br></br>
                </Card.Body>
              </Card>
            </div>

            <div class="col-sm-4">
              <Card>
              <Link to="/detail/airhumidity">
                <img class="card-img-top" src={airhumidityimg} width="150" height="150" alt="Air Humidity" ></img>
                <Card.Header>
                  <b>Air Humidity</b>
                </Card.Header>
                </Link>
                <Card.Body>
                  Here you will find a link to the Air Humidity website.
                  <br></br><br></br>
                </Card.Body>
              </Card>
            </div>

            <div class="col-sm-4">
              <Card>
              <Link to="/detail/temperature">
                <img class="card-img-top" src={temperatureimg} width="150" height="150" alt="Temperature" ></img>
                <Card.Header>
                  <b>Temperature</b>
                </Card.Header>
                </Link>
                <Card.Body>
                  Here you will find a link to the Temperature website.
                  <br></br><br></br>
                </Card.Body>
              </Card>
            </div>

            <div class="col-sm-4">
              <Card>
              <Link to="/detail/nitrogendioxide">
                <img class="card-img-top" src={no2img} width="150" height="150" alt="NO2" ></img>
                <Card.Header>
                  <b>Nitrogen Dioxide</b>
                </Card.Header>
                </Link>
                <Card.Body>
                  Here you will find a link to the Nitrogen Dioxide (NO2) website.
                  <br></br><br></br>
                </Card.Body>
              </Card>
            </div>

            <div class="col-sm-4">
              <Card>
              <Link to="/detail/particularmatter2">
                <img class="card-img-top" src={pm2img} width="150" height="150" alt="PM2.5" ></img>
                <Card.Header>
                  <b>Particular Matter 2.5</b>
                </Card.Header>
                </Link>
                <Card.Body>
                  Here you will find a link to the Particular Matter 2.5 (PM2.5) website.
                  <br></br><br></br>
                </Card.Body>
                </Card>
            </div>

            <div class="col-sm-4">
              <Card>
              <Link to="/detail/particularmatter10">
                <img class="card-img-top" src={pm10img} width="150" height="150"  alt="PM10" ></img>
                <Card.Header>
                  <b>Particular Matter 10</b>
                </Card.Header>
                </Link>
                <Card.Body>
                  Here you will find a link to the Particular Matter 10 (PM10) website.
                  <br></br><br></br>
                </Card.Body>
              </Card>
            </div>

            <div class="col-sm-4 mx-auto">
              <Card>
              <Link to="/detail/sulfurdioxdie">
                <img class="card-img-top" src={so2img} width="150" height="150" alt="SO2" ></img>
                <Card.Header>
                  <b>Sulfur Dioxdie</b>
                </Card.Header>
                </Link>
                <Card.Body>
                  Here you will find a link to the Sulfur Dioxdie (SO2) website.
                  <br></br><br></br>
                </Card.Body>
              </Card>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}

export default LandingPage;
