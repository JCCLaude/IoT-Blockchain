import { React, useEffect, useState } from "react";
import { Jumbotron, Container, Row, Col } from "react-bootstrap";
import CurrentStatus from "./CurrentStatus.js";

import "./blockchain.css";

const Web3 = require("web3");
const CO2Build = require("../../assets/ethereumBuilds/CO2_Alarming.json");
const TemperatureBuild = require("../../assets/ethereumBuilds/Temperature_Alarming.json");
const HumidityBuild = require("../../assets/ethereumBuilds/Humidity_Alarming.json");

function LandingPage() {
  const [error, setError] = useState(false);
  const [co2Event, setCo2Event] = useState({
    timestamp: "loading...",
    measurement: "loading...",
    geolocation: "loading...",
    critical: "loading...",
  });
  const [humidityEvent, setHumidityEvent] = useState({
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

  const fetchEvents = async () => {
    try {
      const web3 = new Web3("ws://192.168.1.88:7545");
      const id = await web3.eth.net.getId();
      const co2Contract = new web3.eth.Contract(
        CO2Build.abi,
        CO2Build.networks[id].address
      );
      const humidityContract = new web3.eth.Contract(
        HumidityBuild.abi,
        HumidityBuild.networks[id].address
      );
      const temperatureContract = new web3.eth.Contract(
        TemperatureBuild.abi,
        TemperatureBuild.networks[id].address
      );
      co2Contract
        .getPastEvents("allEvents", {
          fromBlock: 30,
          toBlock: "latest",
        })
        .then((events) => {
          const message = events[events.length - 1].returnValues;
          setCo2Event(message);
        });
      humidityContract
        .getPastEvents("allEvents", {
          fromBlock: 30,
          toBlock: "latest",
        })
        .then((events) => {
          const message = events[events.length - 1].returnValues;
          setHumidityEvent(message);
        });
      temperatureContract
        .getPastEvents("allEvents", {
          fromBlock: 30,
          toBlock: "latest",
        })
        .then((events) => {
          const message = events[events.length - 1].returnValues;
          setTemperatureEvent(message);
        });
    } catch (error) {
      console.log("No blockchain connection possible", error);
      setError(true);
    }
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
