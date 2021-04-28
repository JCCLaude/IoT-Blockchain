import React, { Component } from "react";
import axios from "axios";
import "./style.components.css";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import IBESlogo from "../../assets/images/IBESlogo.png";
import greencert from "../../assets/images/greencert.png";
import redcert from "../../assets/images/redcert.png";

var solimitred = 1000;
var solimitorange = 500;
var solimitgreen = 0;

var certificateboolSO2 = true;
var thumb_img = greencert;
var thumb_alt = "Green Thumb Up";

var text1 = "The SO2 emissions are ";
var text2 = "with government emission limits.";
var textyesorno = "IN COMPLIANCE ";
var infotext =
  "This page displays the measured sulfur dioxide (SO2) emissions. SO2 is...";
var Arrayval = [];

var sobv = "";
var sobv1 = "";
var sobd = "";
var sobd1 = "";

const SO2 = (props) => (
  <tr>
    <td>{props.so.sodate.substring(0, 19).replace("T", " ")}</td>
    <td
      id={
        props.so.soval >= solimitred
          ? "valuesred"
          : "valuesgreen" &&
            props.so.soval >= solimitorange &&
            props.so.soval < solimitred
          ? "valuesyellow"
          : "valuesgreen"
      }
    >
      {" "}
      {props.so.soval}
      <img src={thumb_img} alt="" height="40" width="40"></img>
    </td>
    <td>
      <a
        href={"https://maps.google.com/?q=" + props.so.sogeo}
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

export default class SulfurDioxide extends Component {
  constructor(props) {
    super(props);
    this.deleteSO2 = this.deleteSO2.bind(this);
    this.state = {
      so: [],
    };
    this.optionsMonth = {};
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/so/")
      .then((response) => {
        this.setState({ so: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteSO2(id) {
    axios.delete("http://localhost:5000/so/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      so: this.state.ch.filter((el) => el._id !== id),
    });
  }

  SO2List() {
    return this.state.so
      .map((currentso) => {
        return (
          <SO2 so={currentso} deleteSO2={this.deleteSO2} key={currentso._id} />
        );
      })
      .reverse();
  }

  getdata() {
    return this.state.so.map((currentso) => {
      sobv = JSON.stringify(
        <SO2 so={currentso} key={currentso._id} />,
        getCircularReplacer()
      );
      sobd = sobv.slice(sobv.indexOf("sodate"), sobv.indexOf("sogeo")); //dates
      sobv = sobv.slice(sobv.indexOf("soval"), sobv.indexOf("sodate")); //values
      sobv1 = sobv.slice(sobv.indexOf(":") + 1, sobv.indexOf(","));
      sobd1 = sobd.slice(sobd.indexOf(":") + 1, sobd.indexOf(","));

      sobd1 = sobd1
        .replace("T", " ")
        .replace("Z", "")
        .replaceAll('"', "")
        .slice(0, sobd1.indexOf(".") - 1);
      Arrayval.push([Date.parse(sobd1) + 3600000, parseInt(sobv1)]);

      if (parseInt(sobv1) > solimitred) {
        certificateboolSO2 = false;
        thumb_img = redcert;
        thumb_alt = "Red Thumb Down";
        textyesorno = "NOT IN COMPLIANCE ";
      }
      return certificateboolSO2;
    });
  }

  gb() {
    this.getdata();
    return certificateboolSO2;
  }

  createArray() {
    this.optionsMonth = {
      chart: {
        type: "spline",
      },
      title: {
        text: "SO2 Emissions Month",
      },
      xAxis: {
        title: {
          text: "Time",
        },
        type: "datetime",
      },
      yAxis: {
        title: {
          text: "SO2 Emission in ppm",
        },
        plotLines: [
          {
            value: solimitred,
            color: "red",
            dashStyle: "shortdash",
            width: 2,
            label: {
              text: "Limit " + solimitred + " particel per million (ppm)",
            },
          },
        ],
      },
      series: [
        {
          name: "SO2 Emissions",
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
        <h3>Sulfur Dioxide (SO2)</h3>
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
              SO2 value {">"} {solimitgreen} and {"<"} {solimitorange}
            </p>{" "}
          </div>
          <div id="boxorange">
            {" "}
            <p>Color Orange: </p> <br></br>{" "}
            <p>
              SO2 value {">"} {solimitorange} and {"<"} {solimitred}
            </p>{" "}
          </div>
          <div id="boxred">
            {" "}
            <p>Color Red: </p> <br></br>{" "}
            <p>
              SO2 value {">"} {solimitred}
            </p>{" "}
          </div>
        </div>
        <br></br> <br></br>
        <table className="table table-striped">
          <thead className="thead-light">
            <tr>
              <th>SO2 values in ppm</th>
              <th>Date of measurement</th>
              <th>Geo Location</th>
            </tr>
          </thead>
          <tbody>{this.SO2List()}</tbody>
        </table>
      </div>
    );
  }
}
