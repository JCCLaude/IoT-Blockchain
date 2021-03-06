import { Card, Container, Jumbotron, Row, Badge } from "react-bootstrap";
import React from "react";
import { Link } from "react-router-dom";
import "./style.components.css";
import { useGlobalContext } from "../../context";
import CurrentStatus from "./CurrentStatus";
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
    humidityEventdb,
    humidityLoadingdb,
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
          <p>
            Get a quick overview of the outdoor air emission values in your
            area!
          </p>
        </Container>
      </Jumbotron>
      <Container className="text-center">
        <Container className="text-center">
          <h1>Last measured values</h1>
          <Badge pill variant="success">
            Everything okay
          </Badge>
          <Badge pill variant="warning">
            Still acceptable
          </Badge>
          <Badge pill variant="danger">
            Critical limit surpassed
          </Badge>
        </Container>
        <br />
        <Container className="dark rounded text-center">
          <Row>
            <CurrentStatus
              name={"Carbon Dioxide"}
              data={co2Eventdb}
              unit="ppm"
              loading={co2Loadingdb}
            />
            <CurrentStatus
              name={"Humidity"}
              data={humidityEventdb}
              unit="%"
              loading={humidityLoadingdb}
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
              unit="μg/m3"
              loading={nitrogendioxideLoadingdb}
            />
            <CurrentStatus
              name={"Particular Matter 2.5"}
              data={particularmatter2Eventdb}
              unit="μg/m3"
              loading={particularmatter2Loadingdb}
            />
            <CurrentStatus
              name={"Particular Matter 10"}
              data={particularmatter10Eventdb}
              unit="μg/m3"
              loading={particularmatter10Loadingdb}
            />
            <CurrentStatus
              name={"Sulfur Dioxdie"}
              data={sulfurdioxideEventdb}
              unit="μg/m3"
              loading={sulfurdioxideLoadingdb}
            />
          </Row>
        </Container>
        <br></br>
        <br></br>
        <hr />
        <h2>Measured values - Summary of the last 7 days</h2>
        <br></br>
        <Container>
          <Last7Days />
        </Container>
        <hr />
        <br></br>
        <br></br>
        <h2>Measured values - All History Data</h2>
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
              <Link to="/humidity">
                <img
                  className="card-img-top"
                  src={airhumidityimg}
                  width="150"
                  height="150"
                  alt="Humidity"
                ></img>
                <Card.Header>
                  <b>Humidity</b>
                </Card.Header>
              </Link>
              <Card.Body>
                Here you will find a link to the Humidity website.
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
              <Link to="/emissions/nitrogendioxide">
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
              <Link to="/emissions/particularmatter2">
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
              <Link to="/emissions/particularmatter10">
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
              <Link to="/emissions/sulfurdioxide">
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
      </Container>
    </>
  );
}

export default Overview;
