import React from "react";
import redthumbdown from "../../assets/images/redthumbdown.png";
import greenthumbup from "../../assets/images/greenthumbup.png";
import greencert from "../../assets/images/greencert.png";
import redcert from "../../assets/images/redcert.png";
import Overview_structure from "../../assets/images/Overview_structure.png";
import { Card, CardGroup, Container, Jumbotron, Button } from "react-bootstrap";
import "../Database_components/style.components.css";
import { useGlobalContext } from "../../context";

var colimitred=1000; var ahlimitred=95; var templimitred=60; var nolimitred=1000; 
var pm2limitred=1000; var pm10limitred=1000; var solimitred=1000;

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
    co2Eventdb7, 
    airhumidityEventdb7, 
    temperatureEventdb7, 
    nitrogendioxideEventdb7, 
    particularmatter2Eventdb7, 
    particularmatter10Eventdb7, 
    sulfurdioxideEventdb7,
  } = useGlobalContext();

var covalarray7 = co2Eventdb7.measurement.split('|'); 
var ahvalarray7 = airhumidityEventdb7.measurement.split('|'); 
var tempvalarray7 = temperatureEventdb7.measurement.split('|'); 
var novalarray7 = nitrogendioxideEventdb7.measurement.split('|'); 
var pm2valarray7 = particularmatter2Eventdb7.measurement.split('|'); 
var pm10valarray7 = particularmatter10Eventdb7.measurement.split('|'); 
var sovalarray7 = sulfurdioxideEventdb7.measurement.split('|'); 

var codatearray7 = co2Eventdb7.timestamp.split('|');
var covalhigharray7 = []; 
var COStr = ""; var AHStr = ""; var TEMPStr=""; var NOStr=""; var PM2Str=""; var PM10Str=""; var SOStr="";

var i=0;

for(i=0; i<covalarray7.length-1; i++){
  if(parseInt(covalarray7[i]) >= colimitred){certboolCO2 = false; covalhigharray7.push(covalarray7[i]+" ppm",new Date(codatearray7[i]))}
}  
for(i=0; i<ahvalarray7.length-1; i++){
  if(parseInt(ahvalarray7[i]) >= ahlimitred){certboolAH = false;}
  if(parseInt(tempvalarray7[i]) >= templimitred){certboolTEMP = false;}
}
for(i=0; i<pm2valarray7.length-1; i++){
  if(parseInt(novalarray7[i]) >= nolimitred){certboolNO = false;}
  if(parseInt(pm2valarray7[i]) >= pm2limitred){certboolPM2 = false;}
  if(parseInt(pm10valarray7[i]) >= pm10limitred){certboolPM10 = false;}
  if(parseInt(sovalarray7[i]) >= solimitred){certboolSO = false;}
}

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
      <img class="mx-auto d-block" src={thumb_img} width="145" height="135" alt={thumb_alt} ></img>
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

        <div className="container text-center">
          <div className="row">
            <div className="col sm-4">
              Get more info at detail: <br></br>
              <a class="btn btn-primary btn-lg" href="/detail" role="button">Detailed</a>
            </div>
            <div className="col sm-4">
            Get more info at verified: <br></br>
              <a class="btn btn-success btn-lg" href="/verified" role="button">Verified</a>
            </div>
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
