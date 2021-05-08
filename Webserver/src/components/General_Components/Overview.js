import React from "react";
import redthumbdown from "../../assets/images/redthumbdown.png";
import greenthumbup from "../../assets/images/greenthumbup.png";
import greencert from "../../assets/images/greencert.png";
import redcert from "../../assets/images/redcert.png";
import Overview_structure from "../../assets/images/Overview_structure.png";
import { Card, CardGroup, Container, Jumbotron, Row } from "react-bootstrap";

import { Link } from "react-router-dom";
import "../Database_components/style.components.css";
import { useGlobalContext } from "../../context";
import CurrentStatus from "../Database_components/CurrentStatus";

import co2img from "../../assets/images/CO2.jpg";
import airhumidityimg from "../../assets/images/airhumidity.jpg";
import temperatureimg from "../../assets/images/temperature.jpg";
import no2img from "../../assets/images/no2.jpg";
import pm2img from "../../assets/images/pm2.jpg";
import pm10img from "../../assets/images/pm10.jpg";
import so2img from "../../assets/images/so2.jpg";

var colimitred=2000; var ahlimitred=95; var templimitred=30; var nolimitred=200; 
var pm2limitred=25; var pm10limitred=50; var solimitred=20;

var textyesorno = "IN COMPLIANCE ";

function Overview() {
  var certificateboolOverview = true;
  var thumb_img = greencert;
  var thumb_alt = "Green Thumb Up";
  var notext1 = ""; var notext2 = ""; var notext3 = "";
  var noimg = greenthumbup;
  var noalt = "Green Thumb Up";
  var noemissions = "";

  var certboolCO2=true; var certboolAH=true; var certboolTEMP=true; var certboolNO=true;
  var certboolPM2=true; var certboolPM10=true; var certboolSO=true; 

  const {

    co2Eventdb, airhumidityEventdb, temperatureEventdb, nitrogendioxideEventdb, 
    particularmatter2Eventdb, particularmatter10Eventdb, sulfurdioxideEventdb,

  } = useGlobalContext();

var lastCO2 = {
  timestamp: new Date(new Date(co2Eventdb.timestamp[co2Eventdb.timestamp.length-1]).getTime() + 3600000).toUTCString(),
  measurement: co2Eventdb.measurement[co2Eventdb.measurement.length-1],
}
var lastAH = {
  timestamp: new Date(new Date(airhumidityEventdb.timestamp[airhumidityEventdb.timestamp.length-1]).getTime() + 3600000).toUTCString(),
  measurement: airhumidityEventdb.measurement[airhumidityEventdb.measurement.length-1],
}
var lastTEMP = {
  timestamp: new Date(new Date(temperatureEventdb.timestamp[temperatureEventdb.timestamp.length-1]).getTime() + 3600000).toUTCString(),
  measurement: temperatureEventdb.measurement[temperatureEventdb.measurement.length-1],
}
var lastNO = {
  timestamp: new Date(new Date(nitrogendioxideEventdb.timestamp[nitrogendioxideEventdb.timestamp.length-1]).getTime() + 3600000).toUTCString(),
  measurement: nitrogendioxideEventdb.measurement[nitrogendioxideEventdb.measurement.length-1],
}
var lastPM2 = {
  timestamp: new Date(new Date(particularmatter2Eventdb.timestamp[particularmatter2Eventdb.timestamp.length-1]).getTime() + 3600000).toUTCString(),
  measurement: particularmatter2Eventdb.measurement[particularmatter2Eventdb.measurement.length-1],
}
var lastPM10 = {
  timestamp: new Date(new Date(particularmatter10Eventdb.timestamp[particularmatter10Eventdb.timestamp.length-1]).getTime() + 3600000).toUTCString(),
  measurement: particularmatter10Eventdb.measurement[particularmatter10Eventdb.measurement.length-1],
}
var lastSO = {
  timestamp: new Date(new Date(sulfurdioxideEventdb.timestamp[sulfurdioxideEventdb.timestamp.length-1]).getTime() + 3600000).toUTCString(),
  measurement: sulfurdioxideEventdb.measurement[sulfurdioxideEventdb.measurement.length-1],
}

var i = 0; 

var codates = []; var covals = []; 
var ahdates = []; var ahvals = [];
var tempdates = []; var tempvals = [];
var nodates = []; var novals = [];
var pm2dates = []; var pm2vals = [];
var pm10dates = []; var pm10vals = [];
var sodates = []; var sovals = [];



//604800000 = 1 week
// replace v with time range like 1 week (7 days)
var v = new Date().getTime() - new Date("March 21, 2021 01:00:00").getTime();
for (i = 0; i < co2Eventdb.timestamp.length - 1; i++) {
  if (new Date(co2Eventdb.timestamp[i]).getTime() > new Date().getTime() - v) {
      codates.push(co2Eventdb.timestamp[i]);
      covals.push(co2Eventdb.measurement[i]);
      if(parseInt(co2Eventdb.measurement[i]) >= colimitred){certboolCO2 = false;}  
    }
  } 
for (i = 0; i < airhumidityEventdb.timestamp.length - 1; i++) {
  if (new Date(airhumidityEventdb.timestamp[i]).getTime() > new Date().getTime() - v) {
      ahdates.push(airhumidityEventdb.timestamp[i]);
      ahvals.push(airhumidityEventdb.measurement[i]);
      if(parseInt(airhumidityEventdb.measurement[i]) >= ahlimitred){certboolAH = false;}  
    }
  if (new Date(temperatureEventdb.timestamp[i]).getTime() > new Date().getTime() - v) {
      tempdates.push(temperatureEventdb.timestamp[i]);
      tempvals.push(temperatureEventdb.measurement[i]);
      if(parseInt(temperatureEventdb.measurement[i]) >= templimitred){certboolTEMP = false;}  
    }  
  } 
for (i = 0; i < nitrogendioxideEventdb.timestamp.length - 1; i++) {
  if (new Date(nitrogendioxideEventdb.timestamp[i]).getTime() > new Date().getTime() - v) {
      nodates.push(nitrogendioxideEventdb.timestamp[i]);
      novals.push(nitrogendioxideEventdb.measurement[i]);
      if(parseInt(nitrogendioxideEventdb.measurement[i]) >= nolimitred){certboolNO = false;}  
    }
  if (new Date(particularmatter2Eventdb.timestamp[i]).getTime() > new Date().getTime() - v) {
      pm2dates.push(particularmatter2Eventdb.timestamp[i]);
      pm2vals.push(particularmatter2Eventdb.measurement[i]);
      if(parseInt(particularmatter2Eventdb.measurement[i]) >= pm2limitred){certboolPM2 = false;}  
    }
  if (new Date(particularmatter10Eventdb.timestamp[i]).getTime() > new Date().getTime() - v) {
      pm10dates.push(particularmatter10Eventdb.timestamp[i]);
      pm10vals.push(particularmatter10Eventdb.measurement[i]);
      if(parseInt(particularmatter10Eventdb.measurement[i]) >= pm10limitred){certboolPM10 = false;}  
    }
  if (new Date(sulfurdioxideEventdb.timestamp[i]).getTime() > new Date().getTime() - v) {
      sodates.push(sulfurdioxideEventdb.timestamp[i]);
      sovals.push(sulfurdioxideEventdb.measurement[i]);
      if(parseInt(sulfurdioxideEventdb.measurement[i]) >= solimitred){certboolSO = false;}  
    }      
  } 
    
var COStr = ""; var AHStr = ""; var TEMPStr=""; var NOStr=""; var PM2Str=""; var PM10Str=""; var SOStr="";


  if (certboolCO2 === false) {certificateboolOverview = false; COStr = "Carbon Dioxide (CO2)";}
  if (certboolAH === false) {certificateboolOverview = false; AHStr = "Air Humidity";}
  if (certboolTEMP === false) {certificateboolOverview = false; TEMPStr = "Temperature";}
  if (certboolNO === false) {certificateboolOverview = false; NOStr = "Nitrogen Dioxide (NO2)";}
  if (certboolPM2 === false) {certificateboolOverview = false; PM2Str = "Particular Matter 2.5 (PM2.5)";}
  if (certboolPM10 === false) {certificateboolOverview = false; PM10Str = "Particular Matter 10 (PM10)";}
  if (certboolSO === false) {certificateboolOverview = false; SOStr = "Sulfur Dioxide (SO2)";}

  if (certificateboolOverview === false) {
    thumb_img = redcert;
    thumb_alt = "Red Thumb Down";
    textyesorno = "NOT IN COMPLIANCE ";
    notext1 = "The following greenhouse gases in your area are ";
    notext2 = "NOT IN COMPLIANCE ";
    notext3 = "with the government emission limits:";
    noimg = redthumbdown;
    noalt = "Red Thumb Down";
    noemissions = COStr+", "+AHStr+", "+TEMPStr+", "+NOStr+", "+PM2Str+", "+PM10Str+", "+SOStr;
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
      <img className="mx-auto d-block" src={thumb_img} width="145" height="135" alt={thumb_alt} ></img>
      <div className="container text-center">
        <p>The greenhouse gas emissions in your area are <b>{textyesorno}</b> with government emission limits the last 7 days.</p>  
      </div>  

      <br></br><br></br>

      <div className="container">
        <p>{notext1}<b>{notext2}</b>{notext3}</p>
        <div className="container" id="Overview_red_img_list">
          <img src={noimg} width="100" height="90" alt={noalt}></img>
          <figcaption>
            {" "}
            <b>{COStr}<br></br>{AHStr}<br></br>{TEMPStr}<br></br>{NOStr}<br></br>{PM2Str}<br></br>{PM10Str}<br></br>{SOStr}</b>
          </figcaption>
        </div>
        <br></br> <br></br>

        <Container className="dark rounded text-center">
            <Row>
              <CurrentStatus name={"Carbon Dioxide"} {...lastCO2} unit="ppm" demoCritical={"0"} />
              <CurrentStatus name={"Air Humidity"} {...lastAH} unit="%" demoCritical={"1"}/>
              <CurrentStatus name={"Temperature"} {...lastTEMP} unit="°C" demoCritical={"2"}/>
              <CurrentStatus name={"Nitrogen Dioxide"} {...lastNO} unit="ppm" />
              <CurrentStatus name={"Particular Matter 2.5"} {...lastPM2} unit="ppm" />
              <CurrentStatus name={"Particular Matter 10"} {...lastPM10} unit="ppm" />
              <CurrentStatus name={"Sulfur Dioxdie"} {...lastSO} unit="ppm"/>
            </Row>
          </Container>

          <br></br><br></br>


          <h2>Measured values - History Data</h2>
          <p>Click on a picture to get more information.</p>
          <div className="row">
            <div class="col-sm-4">
              <Card>
              <Link to="/carbondioxide">

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
              <Link to="/airhumidity">
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
              <Link to="/temperature">
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
              <Link to="/nitrogendioxide">
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
              <Link to="/particularmatter2">
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
              <Link to="/particularmatter10">
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
              <Link to="/sulfurdioxdie">
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

    <br></br><br></br>
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
