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

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import api from "../../api";

var colimitred = 1000;
var colimitorange = 500;
var colimitgreen = 0;

var certificateboolCO2 = true;
var thumb_img = greencert;
var thumb_alt = "Green Thumb Up";

var text1 = "The CO2 emissions are ";
var text2 = "with government emission limits.";
var textyesorno = "IN COMPLIANCE ";
var infotext =
  "This page displays the measured carbon dioxide (CO2) emissions. CO2 is the most common emission and stays in the atmosphere for more than a thousand years on average. Due to a too high CO2 content in the atmosphere, the ozone layer cannot completely intercept the sun's rays, which is why these can reach the earth's surface almost unhindered and increase climate change here.";
var Arrayval = [];

var cobv = "";
var cobv1 = "";
var cobd = "";
var cobd1 = "";

const CO2 = (props) => (
  <tr>
    <td>{props.co.codate.substring(0, 19).replace("T", " ")}</td>
    <td
      id={
        props.co.coval >= colimitred
          ? "valuesred"
          : "valuesgreen" &&
            props.co.coval >= colimitorange &&
            props.co.coval < colimitred
          ? "valuesyellow"
          : "valuesgreen"
      }
    >
      {" "}
      {props.co.coval}
      <img src={thumb_img} alt="" height="40" width="40"></img>
    </td>
    <td>
      <a
        href={"https://maps.google.com/?q=" + props.co.cogeo}
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

export default class CarbonDioxide extends Component {
  constructor(props) {
    super(props);

    this.deleteCO2 = this.deleteCO2.bind(this);

    this.state = {
      co: [],
      value: new Date(),
      //id: this.props.id
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.optionsMonth = {};
  }

  findbyId = async () => {
    const codate = this.state.value;
    await api
      .findbyId(codate)
      .then((codate) => {
        this.setState({ codate: codate.data.data._id });
      })
      .catch((err) => {
        console.log(err);
        return "";
      });
  };

  handleChange(event) {
    this.setState({ value: event });
  }

  handleSubmit(event) {
    //alert('New Entry' + this.state.value);
    event.preventDefault();
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/co/")
      .then((response) => {
        this.setState({ co: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteCO2(id) {
    axios.delete("http://localhost:5000/co/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      co: this.state.co.filter((el) => el._id !== id),
    });
  }

  CO2List() {
    return this.state.co
      .map((currentco) => {
        return (
          <CO2 co={currentco} deleteCO2={this.deleteCO2} key={currentco._id} />
        );
      })
      .reverse();
  }

  getdata() {
    return this.state.co.map((currentco) => {
      cobv = JSON.stringify(
        <CO2 co={currentco} key={currentco._id} />,
        getCircularReplacer()
      );
      cobd = cobv.slice(cobv.indexOf("codate"), cobv.indexOf("cogeo")); //dates
      cobv = cobv.slice(cobv.indexOf("coval"), cobv.indexOf("codate")); //values
      cobv1 = cobv.slice(cobv.indexOf(":") + 1, cobv.indexOf(","));
      cobd1 = cobd.slice(cobd.indexOf(":") + 1, cobd.indexOf(","));

      cobd1 = cobd1
        .replace("T", " ")
        .replace("Z", "")
        .replaceAll('"', "")
        .slice(0, cobd1.indexOf(".") - 1);
      Arrayval.push([Date.parse(cobd1) + 3600000, parseInt(cobv1)]);

      if (parseInt(cobv1) > colimitred) {
        certificateboolCO2 = false;
        thumb_img = redcert;
        thumb_alt = "Red Thumb Down";
        textyesorno = "NOT IN COMPLIANCE ";
      }
      return certificateboolCO2;
    });
  }

  gb() {
    this.getdata();
    return certificateboolCO2;
  }

  createArray() {
    this.optionsMonth = {
      chart: {
        type: "spline",
      },
      title: {
        text: "CO2 Emissions Month",
      },
      xAxis: {
        title: {
          text: "Time",
        },
        type: "datetime",
      },
      yAxis: {
        title: {
          text: "CO2 Emission in ppm",
        },
        plotLines: [
          {
            value: colimitred,
            color: "red",
            dashStyle: "shortdash",
            width: 2,
            label: {
              text: "Limit " + colimitred + " particel per million (ppm)",
            },
          },
        ],
      },
      series: [
        {
          name: "CO2 Emissions",
          data: Arrayval,
        },
      ],
    };
  }

  render() {
    /* this.getID()
    const {value} = this.state*/
    return (
      <div>
        <div className="flex-container" id="logo">
          <img src={IBESlogo} width="130" height="130" alt="IBES Logo"></img>
        </div>
        <h3 id="CO2_heading">Carbon dioxide (CO2)</h3>
        {this.gb()}
        <form method="POST" action="/co">
          <input type="text" id="bar" name="bar" />
          <button type="submit">Send</button>
        </form>
        {/*<div>{value}</div>*/}
        <p>
          <img src={thumb_img} width="100" height="90" alt={thumb_alt} />{" "}
          {text1} <b>{textyesorno}</b> {text2}{" "}
        </p>
        {infotext}
        <br></br>
        <br></br>
        {this.createArray()}
        <div>
          <p>
            <b>Please select a time interval: </b>
          </p>
          <form onSubmit={this.onFormSubmit}>
            <DatePicker
              selected={this.state.value}
              onChange={this.handleChange}
              showTimeSelect
              timeFormat="h:mm aa"
              timeIntervals={30}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              maxDate={new Date()}
              minDate={new Date("April 3, 2021 00:00:00")}
            />
            <button className="btn btn-primary">Submit</button>
          </form>
        </div>
        <br></br>
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
              CO2 value {">"} {colimitgreen} and {"<"} {colimitorange}
            </p>{" "}
          </div>
          <div id="boxorange">
            {" "}
            <p>Color Orange: </p> <br></br>{" "}
            <p>
              CO2 value {">"} {colimitorange} and {"<"} {colimitred}
            </p>{" "}
          </div>
          <div id="boxred">
            {" "}
            <p>Color Red: </p> <br></br>{" "}
            <p>
              CO2 value {">"} {colimitred}
            </p>{" "}
          </div>
        </div>
        <br></br> <br></br>
        <table className="table table-striped">
          <thead className="thead-light">
            <tr>
              <th>Date of measurement</th>
              <th>CO2 in ppm</th>
              <th>Geo Location</th>
            </tr>
          </thead>

          <tbody>{this.CO2List()}</tbody>
        </table>
      </div>
    );
  }
}
