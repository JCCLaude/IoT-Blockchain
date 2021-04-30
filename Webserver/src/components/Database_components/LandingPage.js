import { React, useEffect, useState } from "react";
import {
  Card,
  Accordion,
  Button,
  Jumbotron,
  Container,
  Row,
  CardGroup,
} from "react-bootstrap";
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

const colimitred = 1000;

function LandingPage() {
  const [co2Event, setCo2Event] = useState({
    timestamp: "loading...",
    measurement: "loading...",
    geolocation: "loading...",
    critical: "loading...",
  });
  const [airhumidityEvent, setAirHumidityEvent] = useState({
    timestamp: "loading...",
    measurement: "loading...",
    geolocation: "loading...",
    critical: "loading...",
  });
  const [temperatureEvent, setTemperatureEvent] = useState({
    timestamp: "loading...",
    measurement: "loading...",
    geolocation: "loading...",
    critical: "loading...",
  });
  const [nitrogendioxideEvent, setNitrogendioxideEvent] = useState({
    timestamp: "loading...",
    measurement: "loading...",
    geolocation: "loading...",
    critical: "loading...",
  });
  const [particularmatter2Event, setParticularmatter2Event] = useState({
    timestamp: "loading...",
    measurement: "loading...",
    geolocation: "loading...",
    critical: "loading...",
  });
  const [particularmatter10Event, setParticularmatter10Event] = useState({
    timestamp: "loading...",
    measurement: "loading...",
    geolocation: "loading...",
    critical: "loading...",
  });
  const [sulfurdioxideEvent, setSulfurdioxideEvent] = useState({
    timestamp: "loading...",
    measurement: "loading...",
    geolocation: "loading...",
    critical: "loading...",
  });

  const fetchEvents = async () => {
    axios
      .get("http://localhost:5000/co/")
      .then((response) => {
        var co = response.data;
        var covals = co.map(function (item) {
          return item["coval"];
        });
        var codates = co.map(function (item) {
          return item["codate"];
        });
        var cogeos = co.map(function (item) {
          return item["cogeo"];
        });
        var test;
        var i = 0;
        for (i = 0; i < covals.length - 1; i++) {
          if (parseInt(covals[i]) > colimitred) {
            console.log("danger!! " + covals[i]);
          }
        }
        var CO2message = {
          timestamp: new Date(codates[codates.length - 1]).toString(),
          measurement: covals[covals.length - 1] + " ppm",
          geolocation: (
            <a
              href={"https://maps.google.com/?q=" + cogeos[cogeos.length - 1]}
              target="_blank"
              rel="noopener noreferrer"
            >
              {cogeos[cogeos.length - 1]}
            </a>
          ),
        };
        setCo2Event(CO2message);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost:5000/ah/")
      .then((response) => {
        var ah = response.data;
        var ahvals = ah.map(function (item) {
          return item["ahval"];
        });
        var ahdates = ah.map(function (item) {
          return item["ahdate"];
        });
        var ahgeos = ah.map(function (item) {
          return item["ahgeo"];
        });
        var AHmessage = {
          timestamp: new Date(ahdates[ahdates.length - 1]).toString(),
          measurement: ahvals[ahvals.length - 1] + " %",
          geolocation: (
            <a
              href={"https://maps.google.com/?q=" + ahgeos[ahgeos.length - 1]}
              target="_blank"
              rel="noopener noreferrer"
            >
              {ahgeos[ahgeos.length - 1]}
            </a>
          ),
        };
        setAirHumidityEvent(AHmessage);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost:5000/temp/")
      .then((response) => {
        var temp = response.data;
        var tempvals = temp.map(function (item) {
          return item["tempval"];
        });
        var tempdates = temp.map(function (item) {
          return item["tempdate"];
        });
        var tempgeos = temp.map(function (item) {
          return item["tempgeo"];
        });
        var TEMPmessage = {
          timestamp: new Date(tempdates[tempdates.length - 1]).toString(),
          measurement: tempvals[tempvals.length - 1] + " °C",
          geolocation: (
            <a
              href={
                "https://maps.google.com/?q=" + tempgeos[tempgeos.length - 1]
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              {tempgeos[tempgeos.length - 1]}
            </a>
          ),
        };
        setTemperatureEvent(TEMPmessage);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchEvents();
    return () => {
      //cleanup
    };
  }, []);

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
              <CurrentStatus name={"Carbon Dioxide"} {...co2Event} />
              <CurrentStatus name={"Air Humidity"} {...airhumidityEvent} />
              <CurrentStatus name={"Temperature"} {...temperatureEvent} />
              <CurrentStatus name={"Nitrogen Dioxide"} {...nitrogendioxideEvent} />
              <CurrentStatus name={"Particular Matter 2.5"} {...particularmatter2Event} />
              <CurrentStatus name={"Particular Matter 10"} {...particularmatter10Event} />
              <CurrentStatus name={"Sulfur Dioxdie"} {...sulfurdioxideEvent} />
            </Row>
          </Container>

          <br></br>

          <h2>Measured values</h2>
          <div className="row">
            <div class="col-sm-4">
              <Card>
              <Link to="/detail/carbondioxide">
                <img class="card-img-top" src={co2img} width="150" height="150" alt="CO2 image" ></img>
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
                <img class="card-img-top" src={airhumidityimg} width="150" height="150" alt="Air Humidity Image" ></img>
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
                <img class="card-img-top" src={temperatureimg} width="150" height="150" alt="Temperature Image" ></img>
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
                <img class="card-img-top" src={no2img} width="150" height="150" alt="NO2 Image" ></img>
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
                <img class="card-img-top" src={pm2img} width="150" height="150" alt="PM2.5 Image" ></img>
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
                <img class="card-img-top" src={pm10img} width="150" height="150"  alt="PM10 Image" ></img>
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
                <img class="card-img-top" src={so2img} width="150" height="150" alt="SO2 Image" ></img>
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
