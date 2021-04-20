import React, { Component } from "react";
import axios from "axios";
//import redthumbdown from '../images/redthumbdown.png';
//import greenthumbup from '../images/greenthumbup.png';
import "./style.components.css";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import IBESlogo from "../../images/IBESlogo.png";
import greencert from "../../images/greencert.png";
import redcert from "../../images/redcert.png";

var ahlimitred = 95;
var ahlimitorange = 80;
var ahlimitgreen = 0;

var certificateboolAH = true;
var thumb_img = greencert;
var thumb_alt = "Green Thumb Up";

var text1 = "The CO2 emissions are ";
var text2 = "with government emission limits.";
var textyesorno = "IN COMPLIANCE ";
var infotext =
  "This page displays the measured Air Humidity. Air Humidity is...";
var Arrayval = [];

var ahbv = "";
var ahbv1 = "";
var ahbd = "";
var ahbd1 = "";

const AH = (props) => (
  <tr>
    <td>{props.ah.ahdate.substring(0, 19).replace("T", " ")}</td>
    <td
      id={
        props.ah.ahval >= ahlimitred
          ? "valuesred"
          : "valuesgreen" &&
            props.ah.ahval >= ahlimitorange &&
            props.ah.ahval < ahlimitred
          ? "valuesyellow"
          : "valuesgreen"
      }
    >
      {" "}
      {props.ah.ahval}
    </td>{" "}
    {/*{props.co.coval} {if(props.co.coval >= 800) {id='covaluesgreen'}}*/}
    <td>
      <a
        href={"https://maps.google.com/?q=" + props.ah.ahgeo}
        target="_blank"
        rel="noopener noreferrer"
      >
        Maps
      </a>
    </td>
  </tr>
);

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

export default class AirHumidity extends Component {
  constructor(props) {
    super(props);

    this.deleteAH = this.deleteAH.bind(this);

    this.state = {
      ah: [],
    };

    this.optionsMonth = {};
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/ah/")
      .then((response) => {
        this.setState({ ah: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteAH(id) {
    axios.delete("http://localhost:5000/ah/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      ah: this.state.ah.filter((el) => el._id !== id),
    });
  }

  AHList() {
    return this.state.ah
      .map((currentah) => {
        return (
          <AH ah={currentah} deleteAH={this.deleteAH} key={currentah._id} />
        );
      })
      .reverse();
  }

  getdata() {
    return this.state.ah.map((currentah) => {
      ahbv = JSON.stringify(
        <AH ah={currentah} key={currentah._id} />,
        getCircularReplacer()
      );
      ahbd = ahbv.slice(ahbv.indexOf("ahdate"), ahbv.indexOf("ahgeo")); //dates
      ahbv = ahbv.slice(ahbv.indexOf("ahval"), ahbv.indexOf("ahdate")); //values
      ahbv1 = ahbv.slice(ahbv.indexOf(":") + 1, ahbv.indexOf(","));
      ahbd1 = ahbd.slice(ahbd.indexOf(":") + 1, ahbd.indexOf(","));

      ahbd1 = ahbd1
        .replace("T", " ")
        .replace("Z", "")
        .replaceAll('"', "")
        .slice(0, ahbd1.indexOf(".") - 1);
      Arrayval.push([Date.parse(ahbd1) + 7200000, parseInt(ahbv1)]);

      if (parseInt(ahbv1) >= ahlimitred) {
        certificateboolAH = false;
        thumb_img = redcert;
        thumb_alt = "Red Thumb Down";
        textyesorno = "NOT IN COMPLIANCE ";
      }
      return certificateboolAH;
    });
  }

  gb() {
    this.getdata();
    return certificateboolAH;
  }

  createArray() {
    this.optionsMonth = {
      chart: {
        type: "spline",
      },
      title: {
        text: "Air Humidity  Month",
      },
      xAxis: {
        title: {
          text: "Time",
        },
        type: "datetime",
      },
      yAxis: {
        title: {
          text: "Air Humidity in percent",
        },
        plotLines: [
          {
            value: ahlimitred,
            color: "red",
            dashStyle: "shortdash",
            width: 2,
            label: {
              text: "Limit " + ahlimitred + " percent",
            },
          },
        ],
      },
      series: [
        {
          name: "Air Humidity",
          data: Arrayval,
        },
      ],
    };
  }

  render() {
    return (
      <div>
        <div className="flex-container" id="logo">
          <img src={IBESlogo} width="130" height="130" alt="IBES Logo"></img>
        </div>
        <h3 id="AH_heading">Air Humidity</h3>
        {this.gb()}
        <p>
          <img src={thumb_img} width="100" height="90" alt={thumb_alt} />{" "}
          {text1} <b>{textyesorno}</b> {text2}{" "}
        </p>
        {infotext}
        {this.createArray()}
        <br></br> <br></br>
        <div>
          <HighchartsReact
            highcharts={Highcharts}
            options={this.optionsMonth}
            constructorType={"stockChart"}
          />
        </div>
        <br></br> <br></br>
        <h4>Legend of colors from the table shown below</h4>
        <br></br>
        <div class="flex-container" id="legendbox">
          <div id="boxgreen">
            {" "}
            <p>Color Green:</p> <br></br>{" "}
            <p>
              Air Humidity value {">="} {ahlimitgreen}% and {"<="}{" "}
              {ahlimitorange}%
            </p>{" "}
          </div>
          <div id="boxorange">
            {" "}
            <p>Color Orange: </p> <br></br>{" "}
            <p>
              Air Humidity value {">"} {ahlimitorange}% and {"<"} {ahlimitred}%
            </p>{" "}
          </div>
          <div id="boxred">
            {" "}
            <p>Color Red: </p> <br></br>{" "}
            <p>
              Air Humidity value {">="} {ahlimitred}%
            </p>{" "}
          </div>
        </div>
        <br></br> <br></br>
        <table className="table table-striped">
          <thead className="thead-light">
            <tr>
              <th>Date of measurement</th>
              <th>Air Humidity in %</th>
              <th>Geo Location</th> {/*or plz?*/}
            </tr>
          </thead>

          <tbody>{this.AHList()}</tbody>
        </table>
      </div>
    );
  }
}
