import Overview_structure from "../../assets/images/Overview_structure.png";
import { Card, CardGroup, Container, Jumbotron, Row } from "react-bootstrap";
import React from "react";
import { Link } from "react-router-dom";
import "../Database_components/style.components.css";
import { useGlobalContext } from "../../context";
import CurrentStatus from "../Database_components/CurrentStatus";
import Last7Days from "./Last7Days";

import co2img from "../../assets/images/CO2.jpg";
import airhumidityimg from "../../assets/images/airhumidity.jpg";
import temperatureimg from "../../assets/images/temperature.jpg";
import no2img from "../../assets/images/no2.jpg";
import pm2img from "../../assets/images/pm2.jpg";
import pm10img from "../../assets/images/pm10.jpg";
import so2img from "../../assets/images/so2.jpg";

function Overview() {
  const {
    co2Eventdb,
    co2Loadingdb,
    airhumidityEventdb,
    airhumidityLoadingdb,
    temperatureEventdb,
    temperatureLoadingdb,
    nitrogendioxideEventdb,
    nitrogendioxideLoadingdb,
    particularmatter2Eventdb,
    particularmatter2Loadingdb,
    particularmatter10Eventdb,
    particularmatter10Loadingdb,
    sulfurdioxideEventdb,
    sulfurdioxideLoadingdb,
  } = useGlobalContext();

  return (
    <>
      <Jumbotron fluid className="jumbo">
        <div className="overlay "> </div>
        <Container className="d-none d-lg-block">
          <h1>Overview</h1>
          <p>Get a quick overview of the emission values in your area!</p>
        </Container>
      </Jumbotron>
      <br></br>
      <br></br>
      <Container>
        <Last7Days />
      </Container>
      <br></br> <br></br>
      <Container>
        <Container className="dark rounded text-center">
          <Row>
            <CurrentStatus
              name={"Carbon Dioxide"}
              data={co2Eventdb}
              unit="ppm"
              loading={co2Loadingdb}
            />
            <CurrentStatus
              name={"Air Humidity"}
              data={airhumidityEventdb}
              unit="%"
              loading={airhumidityLoadingdb}
            />
            <CurrentStatus
              name={"Temperature"}
              data={temperatureEventdb}
              unit="°C"
              loading={temperatureLoadingdb}
            />
            <CurrentStatus
              name={"Nitrogen Dioxide"}
              data={nitrogendioxideEventdb}
              unit="ppm"
              loading={nitrogendioxideLoadingdb}
            />
            <CurrentStatus
              name={"Particular Matter 2.5"}
              data={particularmatter2Eventdb}
              unit="ppm"
              loading={particularmatter2Loadingdb}
            />
            <CurrentStatus
              name={"Particular Matter 10"}
              data={particularmatter10Eventdb}
              unit="ppm"
              loading={particularmatter10Loadingdb}
            />
            <CurrentStatus
              name={"Sulfur Dioxdie"}
              data={sulfurdioxideEventdb}
              unit="ppm"
              loading={sulfurdioxideLoadingdb}
            />
          </Row>
        </Container>
        <br></br>
        <br></br>
        <h2>Measured values - History Data</h2>
        <p>Click on a picture to get more information.</p>
        <div className="row">
          <div className="col-sm-4">
            <Card>
              <Link to="/carbondioxide">
                <img
                  className="card-img-top"
                  src={co2img}
                  width="150"
                  height="150"
                  alt="CO2"
                ></img>
                <Card.Header>
                  <b>Carbon Dioxide</b>
                </Card.Header>
              </Link>
              <Card.Body>
                Here you will find a link to the Carbon Dioxide (CO2) website.
                <br></br>
                <br></br>
              </Card.Body>
            </Card>
          </div>

          <div className="col-sm-4">
            <Card>
              <Link to="/airhumidity">
                <img
                  className="card-img-top"
                  src={airhumidityimg}
                  width="150"
                  height="150"
                  alt="Air Humidity"
                ></img>
                <Card.Header>
                  <b>Air Humidity</b>
                </Card.Header>
              </Link>
              <Card.Body>
                Here you will find a link to the Air Humidity website.
                <br></br>
                <br></br>
              </Card.Body>
            </Card>
          </div>

          <div className="col-sm-4">
            <Card>
              <Link to="/temperature">
                <img
                  className="card-img-top"
                  src={temperatureimg}
                  width="150"
                  height="150"
                  alt="Temperature"
                ></img>
                <Card.Header>
                  <b>Temperature</b>
                </Card.Header>
              </Link>
              <Card.Body>
                Here you will find a link to the Temperature website.
                <br></br>
                <br></br>
              </Card.Body>
            </Card>
          </div>

          <div className="col-sm-4">
            <Card>
              <Link to="/nitrogendioxide">
                <img
                  className="card-img-top"
                  src={no2img}
                  width="150"
                  height="150"
                  alt="NO2"
                ></img>
                <Card.Header>
                  <b>Nitrogen Dioxide</b>
                </Card.Header>
              </Link>
              <Card.Body>
                Here you will find a link to the Nitrogen Dioxide (NO2) website.
                <br></br>
                <br></br>
              </Card.Body>
            </Card>
          </div>

          <div className="col-sm-4">
            <Card>
              <Link to="/particularmatter2">
                <img
                  className="card-img-top"
                  src={pm2img}
                  width="150"
                  height="150"
                  alt="PM2.5"
                ></img>
                <Card.Header>
                  <b>Particular Matter 2.5</b>
                </Card.Header>
              </Link>
              <Card.Body>
                Here you will find a link to the Particular Matter 2.5 (PM2.5)
                website.
                <br></br>
                <br></br>
              </Card.Body>
            </Card>
          </div>

          <div className="col-sm-4">
            <Card>
              <Link to="/particularmatter10">
                <img
                  className="card-img-top"
                  src={pm10img}
                  width="150"
                  height="150"
                  alt="PM10"
                ></img>
                <Card.Header>
                  <b>Particular Matter 10</b>
                </Card.Header>
              </Link>
              <Card.Body>
                Here you will find a link to the Particular Matter 10 (PM10)
                website.
                <br></br>
                <br></br>
              </Card.Body>
            </Card>
          </div>

          <div className="col-sm-4 mx-auto">
            <Card>
              <Link to="/sulfurdioxdie">
                <img
                  className="card-img-top"
                  src={so2img}
                  width="150"
                  height="150"
                  alt="SO2"
                ></img>
                <Card.Header>
                  <b>Sulfur Dioxdie</b>
                </Card.Header>
              </Link>
              <Card.Body>
                Here you will find a link to the Sulfur Dioxdie (SO2) website.
                <br></br>
                <br></br>
              </Card.Body>
            </Card>
          </div>
        </div>
        <br></br>
        <br></br>
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
      </Container>
    </>
  );
}

export default Overview;
