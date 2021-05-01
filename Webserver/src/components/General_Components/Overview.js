import React, { Component } from "react";
import axios from "axios";
//import redthumbdown from '../images/redthumbdown.png';
import greenthumbup from "../../assets/images/greenthumbup.png";
import greencert from "../../assets/images/greencert.png";
import redcert from "../../assets/images/redcert.png";
import Overview_structure from "../../assets/images/Overview_structure.png";
import { Card, CardGroup, Container, Jumbotron } from "react-bootstrap";
import "../Database_components/style.components.css";
import CO2List from "../Database_components/CarbonDioxide";

var nC; // = new CO2List();
var certboolCO2;

var certificateboolOverview = true;
var thumb_img = greencert;
var thumb_alt = "Green Thumb Up";
var notext1 = "";
var notext2 = "";
var notext3 = "";
var noimg = greenthumbup;
var noalt = "Green Thumb Up";
var noemissions = "";

var text1 = "The greenhouse gas emissions in your area are ";
var text2 = "with government emission limits the last 7 days.";
var textyesorno = "IN COMPLIANCE ";

function Overview() {
  if (!certboolCO2) {
    certificateboolOverview = false;
  }

  if (!certificateboolOverview) {
    thumb_img = redcert;
    thumb_alt = "Red Thumb Down";
    textyesorno = "NOT IN COMPLIANCE ";

    notext1 = "The following greenhouse gases in your area are ";
    notext2 = "NOT IN COMPLIANCE ";
    notext3 = "with the government emission limits:";
    noimg = redcert;
    noalt = "Red Thumb Down";
    noemissions = "CO2, SF6";
  }

  return (
    <>
      <Jumbotron fluid className="jumbo">
        <div className="overlay "> </div>
        <Container className="d-none d-lg-block">
          <h1>Overview</h1>
          <p>Get a quick overview of the emission values in your area!</p>
        </Container>
      </Jumbotron>
      <div className="container">
        {/*   <div className="flex-container" id="logo">
          <img src={IBESlogo} width="130" height="130" alt="IBES Logo"></img>
        </div>*/}
        {/*this.yesorno()*/}
        {/*<p>{kkk}</p>*/}
        <div>{/*<h1 className="text-center">Overview</h1>*/}</div>
        <p>
          <img src={thumb_img} width="130" height="120" alt={thumb_alt} />{" "}
          {text1} <b>{textyesorno}</b> {text2}{" "}
        </p>
        <p>
          {notext1} <b>{notext2}</b> {notext3}
        </p>
        <div className="container" id="Overview_red_img_list">
          <img src={noimg} width="100" height="90" alt={noalt}></img>
          <figcaption>
            {" "}
            <b>{noemissions}</b>{" "}
          </figcaption>
        </div>
        <br></br> <br></br>
        <div className="flex-container">
          <img
            id="overview_structure"
            src={Overview_structure}
            width="750"
            height="470"
            alt=""
          ></img>
        </div>
        <CardGroup>
          <Card border="dark" bg="secondary" style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>
                <b>IBES</b>
              </Card.Title>
              <Card.Text>
                The <b>IBES</b> uses IoT sensors that measure emissions from{" "}
                <b>powerplant</b> or industrial sites and store this data
                securely through <b>blockchain</b> technology. This data is then
                made freely available to anyone on the Internet on a{" "}
                <b>website</b>.{" "}
              </Card.Text>
            </Card.Body>
          </Card>
          <br />

          <Card border="dark" bg="secondary" style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>
                <b>Powerplant</b>
              </Card.Title>
              <Card.Text>
                The <b>powerplant</b> emits emissions whose actual values are
                not immediately accessible to everyone. We would like to use
                IBES to check whether these emissions actually remain below the
                legal limits.
              </Card.Text>
            </Card.Body>
          </Card>
          <br />

          <Card border="dark" bg="secondary" style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>
                <b>IoT sensors</b>
              </Card.Title>
              <Card.Text>
                The <b>IoT sensors</b> measure different emissions such as
                greenhouse gases, which are harmful to our climate and health.
                The IoT sensors are placed directly at the power plant itself
                and at the surrounding <b>Villages</b> to get the most realistic
                overall impression of the emissions.
              </Card.Text>
            </Card.Body>
          </Card>
          <br />

          <Card border="dark" bg="secondary" style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>
                <b>Website</b>
              </Card.Title>
              <Card.Text>
                The data in the blockchain can be viewed by anyone at any time
                on the IBES <b>website on their computer or mobile phone</b> on
                the Internet. Here, all collected data is listed both
                graphically and in tabular form.
              </Card.Text>
            </Card.Body>
          </Card>
          <br />
        </CardGroup>
        <br></br> <br></br>
        <Card border="dark">
          <Card.Body>
            <Card.Title>
              <b>About IBES</b>
            </Card.Title>
            <Card.Text>
              This project is designed to securely and independently measure
              greenhouse gas emissions from power plants and industrial areas,
              and to ensure compliance with legally mandated emission limits
              using IoT and blockchain technology. For this purpose, IoT sensors
              will be attached 1. directly to power plants themselves and 2. to
              houses in the immediate vicinity, which will measure various
              emissions. These values are then stored in a database and
              displayed on this website here. If a value exceeds a legally
              specified emission limit, this measurement is stored in a
              blockchain, where the entry is visible to everyone at all times
              and can no longer be changed. In this way, transparency of the
              actual emission values of the power plants and a resulting trust
              in the power plant operators that the environmental regulations
              are being complied with should be established. Greenhouse gases
              are responsible for climate change and damage both our environment
              and the health of all humans and animals, which is why we as
              humans should take good care to adhere to emission limits.
            </Card.Text>
          </Card.Body>
        </Card>
        <br />
      </div>
    </>
  );
}

export default Overview;
