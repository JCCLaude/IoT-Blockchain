import React, { Component } from "react";
import axios from "axios";
import "./style.components.css";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import IBESlogo from "../../assets/images/IBESlogo.png";
import greencert from "../../assets/images/greencert.png";
import redcert from "../../assets/images/redcert.png";

var nolimitred = 1000;
var nolimitorange = 500;
var nolimitgreen = 0;

var certificateboolNO2 = true;
var thumb_img = greencert;
var thumb_alt = "Green Thumb Up";

var text1 = "The NO2 emissions are ";
var text2 = "with government emission limits.";
var textyesorno = "IN COMPLIANCE ";
var infotext =
  "This page displays the measured nitrogen dioxide (NO2) emissions. NO2 is...";
var Arrayval = [];

var nobv = "";
var nobv1 = "";
var nobd = "";
var nobd1 = "";

const NO2 = (props) => (
  <tr>
    <td>{props.no.nodate.substring(0, 19).replace("T", " ")}</td>
    <td
      id={
        props.no.noval >= nolimitred
          ? "valuesred"
          : "valuesgreen" &&
            props.no.noval >= nolimitorange &&
            props.no.noval < nolimitred
          ? "valuesyellow"
          : "valuesgreen"
      }
    >
      {" "}
      {props.no.noval}
      <img src={thumb_img} alt="" height="40" width="40"></img>
    </td>
    <td>
      <a
        href={"https://maps.google.com/?q=" + props.no.nogeo}
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

export default class NitrogenDioxide extends Component {
  constructor(props) {
    super(props);
    this.deleteNO2 = this.deleteNO2.bind(this);
    this.state = {
      no: [],
    };
    this.optionsMonth = {};
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/no/")
      .then((response) => {
        this.setState({ no: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteNO2(id) {
    axios.delete("http://localhost:5000/no/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      no: this.state.ch.filter((el) => el._id !== id),
    });
  }

  NO2List() {
    return this.state.no
      .map((currentno) => {
        return (
          <NO2 no={currentno} deleteNO2={this.deleteNO2} key={currentno._id} />
        );
      })
      .reverse();
  }

  getdata() {
    return this.state.no.map((currentno) => {
      nobv = JSON.stringify(
        <NO2 no={currentno} key={currentno._id} />,
        getCircularReplacer()
      );
      nobd = nobv.slice(nobv.indexOf("nodate"), nobv.indexOf("nogeo")); //dates
      nobv = nobv.slice(nobv.indexOf("noval"), nobv.indexOf("nodate")); //values
      nobv1 = nobv.slice(nobv.indexOf(":") + 1, nobv.indexOf(","));
      nobd1 = nobd.slice(nobd.indexOf(":") + 1, nobd.indexOf(","));

      nobd1 = nobd1
        .replace("T", " ")
        .replace("Z", "")
        .replaceAll('"', "")
        .slice(0, nobd1.indexOf(".") - 1);
      Arrayval.push([Date.parse(nobd1) + 3600000, parseInt(nobv1)]);

      if (parseInt(nobv1) > nolimitred) {
        certificateboolNO2 = false;
        thumb_img = redcert;
        thumb_alt = "Red Thumb Down";
        textyesorno = "NOT IN COMPLIANCE ";
      }
      return certificateboolNO2;
    });
  }

  gb() {
    this.getdata();
    return certificateboolNO2;
  }

  createArray() {
    this.optionsMonth = {
      chart: {
        type: "spline",
      },
      title: {
        text: "NO2 Emissions Month",
      },
      xAxis: {
        title: {
          text: "Time",
        },
        type: "datetime",
      },
      yAxis: {
        title: {
          text: "NO2 Emission in ppm",
        },
        plotLines: [
          {
            value: nolimitred,
            color: "red",
            dashStyle: "shortdash",
            width: 2,
            label: {
              text: "Limit " + nolimitred + " particel per million (ppm)",
            },
          },
        ],
      },
      series: [
        {
          name: "NO2 Emissions",
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
        <h3>Nitrogen Dioxide (NO2)</h3>
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
              NO2 value {">"} {nolimitgreen} and {"<"} {nolimitorange}
            </p>{" "}
          </div>
          <div id="boxorange">
            {" "}
            <p>Color Orange: </p> <br></br>{" "}
            <p>
              NO2 value {">"} {nolimitorange} and {"<"} {nolimitred}
            </p>{" "}
          </div>
          <div id="boxred">
            {" "}
            <p>Color Red: </p> <br></br>{" "}
            <p>
              NO2 value {">"} {nolimitred}
            </p>{" "}
          </div>
        </div>
        <br></br> <br></br>
        <table className="table table-striped">
          <thead className="thead-light">
            <tr>
              <th>NO2 values in ppm</th>
              <th>Date of measurement</th>
              <th>Geo Location</th>
            </tr>
          </thead>
          <tbody>{this.NO2List()}</tbody>
        </table>
      </div>
    );
  }
}
