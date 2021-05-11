import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";
import React, { useState, useEffect } from "react";
import redthumbdown from "../../assets/images/redthumbdown.png";
import greenthumbup from "../../assets/images/greenthumbup.png";
import greencert from "../../assets/images/greencert.png";
import redcert from "../../assets/images/redcert.png";
import { Container } from "react-bootstrap";

//einzelne Werte als props
//use context
function Last7Days({
    co2Eventdb,
    colimitred,
    name,
    co2pack,
    loading,
    certbool,
    timestamp,
    measurement,
    critical,
    demoCritical,
    data
}) {

  var certificateboolOverview = true;
  var thumb_img = greencert;
  var thumb_alt = "Green Thumb Up";
  var notext1 = ""; var notext2 = ""; var notext3 = "";
  var noimg = greenthumbup;
  var noalt = "Green Thumb Up";
  var noemissions = "";

  var certboolCO2=true; var certboolAH=true; var certboolTEMP=true; var certboolNO=true;
  var certboolPM2=true; var certboolPM10=true; var certboolSO=true; 

  var colimitred=2000; var ahlimitred=95; var templimitred=30; var nolimitred=200; 
  var pm2limitred=25; var pm10limitred=50; var solimitred=20;

var textyesorno = "IN COMPLIANCE ";

var COStr = ""; var AHStr = ""; var TEMPStr=""; var NOStr=""; var PM2Str=""; var PM10Str=""; var SOStr="";
 

//604800000 = 1 week
var v = new Date().getTime() - 604800000;
var i = 0;     

  const [Last7Events, setLast7Events] = useState([0]); 

  const [formatLoading, setFormatLoading] = useState(true);

  const formatDatabase = (dbEvents, limitred, name) => {
    console.log("qqq: "+dbEvents)
    if (typeof dbEvents !== "undefined") {

      console.log("lll: "+dbEvents)

      for (i = 0; i < dbEvents.timestamp.length - 1; i++) {
        if (new Date(dbEvents.timestamp[i]).getTime() > new Date().getTime() - v) {
            if(parseInt(dbEvents.measurement[i]) >= limitred){
              certificateboolOverview = false; 
              COStr = name;}
              console.log("kkk: "+name)

  /*    for (i = 0; i < dbEvents[0].timestamp.length - 1; i++) {
        if (new Date(dbEvents[0].timestamp[i]).getTime() > new Date().getTime() - v) {
            if(parseInt(dbEvents[0].measurement[i]) >= dbEvents[1]){
              certificateboolOverview = false; 
              COStr = dbEvents[3];}
              console.log("kkk: "+dbEvents[3]) */


 /* if (certboolAH === false) {certificateboolOverview = false; AHStr = "Air Humidity";}
  if (certboolTEMP === false) {certificateboolOverview = false; TEMPStr = "Temperature";}
  if (certboolNO === false) {certificateboolOverview = false; NOStr = "Nitrogen Dioxide (NO2)";}
  if (certboolPM2 === false) {certificateboolOverview = false; PM2Str = "Particular Matter 2.5 (PM2.5)";}
  if (certboolPM10 === false) {certificateboolOverview = false; PM10Str = "Particular Matter 10 (PM10)";}
  if (certboolSO === false) {certificateboolOverview = false; SOStr = "Sulfur Dioxide (SO2)";}*/

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
              
          }
        } 
      
      setLast7Events([certbool])
      
      setFormatLoading(false);
    }
  };

  useEffect(() => {
    formatDatabase(co2Eventdb, colimitred, name)
  }, [co2Eventdb, colimitred, name]);


  return (
    <Container>
        <img className="mx-auto d-block" src={thumb_img} width="145" height="135" alt={thumb_alt}/>  
        <Container>
        <p>The greenhouse gas emissions in your area are <b>{textyesorno}</b> with government emission limits the last 7 days.</p>
        </Container>

        <p className={`${certbool === false ? notext1="" : notext1="The following greenhouse gases in your area are <b>NOT IN COMPLIANCE </b> with the government emission limits:"}`}>{notext1}</p>
        
        <div className="container" id="Overview_red_img_list">
        <img src={noimg} width="100" height="90" alt={noalt}></img>
        <figcaption>
            <b>{COStr}<br></br>{AHStr}<br></br>{TEMPStr}<br></br>{NOStr}<br></br>{PM2Str}<br></br>{PM10Str}<br></br>{SOStr}</b>
        </figcaption>
        </div>   
    </Container>
  )
}

/* 
  <img className="mx-auto d-block" src={thumb_img} width="145" height="135" alt={thumb_alt} ></img>
      <div className="container text-center">
        <p>The greenhouse gas emissions in your area are <b>{textyesorno}</b> with government emission limits the last 7 days.</p>  
      </div>  

    <p>{notext1}<b>{notext2}</b>{notext3}</p>
        <div className="container" id="Overview_red_img_list">
        <img src={noimg} width="100" height="90" alt={noalt}></img>
        <figcaption>
            {" "}
            <b>{COStr}<br></br>{AHStr}<br></br>{TEMPStr}<br></br>{NOStr}<br></br>{PM2Str}<br></br>{PM10Str}<br></br>{SOStr}</b>
        </figcaption>
        </div>
        
*/

export default Last7Days;