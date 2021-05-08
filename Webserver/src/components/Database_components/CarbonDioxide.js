import React, { Component, useState } from "react";
import axios from "axios";
import "./style.components.css";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import greencert from "../../assets/images/greencert.png";
import redcert from "../../assets/images/redcert.png";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Card, CardGroup, Container, Jumbotron, Alert, Button,} from "react-bootstrap";
import dateFormat from "dateformat";

var colimitred = 2000;
var colimitorange = 1000;
var colimitgreen = 0;

var certificateboolCO2 = true;
var thumb_img = greencert;
var thumb_alt = "Green Thumb Up";

var text1 = "The CO2 emissions are ";
var text2 = "with government emission limits in the selected time range.";
var textyesorno = "IN COMPLIANCE ";
var infotext =
  "This page displays the measured carbon dioxide (CO2) emissions. CO2 is the most common emission and stays in the atmosphere for more than a thousand years on average. Due to a too high CO2 content in the atmosphere, the ozone layer cannot completely intercept the sun's rays, which is why these can reach the earth's surface almost unhindered and increase climate change here.";

const CO2 = (props) => (
  <tr>
    <td>{props.co.codate.substring(0, 19).replace("T", " ")}</td>
    <td id={props.co.coval >= colimitred ? "valuesred" : "valuesgreen" && props.co.coval >= colimitorange && props.co.coval < colimitred ? "valuesyellow" : "valuesgreen" }>{" "}{props.co.coval}</td>
    <td><a href={"https://maps.google.com/?q=" + props.co.cogeo} target="_blank" rel="noopener noreferrer"> Maps </a> </td>
  </tr>
);


export default class CarbonDioxide extends Component {
  constructor(props) {
    super(props);

    this.deleteCO2 = this.deleteCO2.bind(this);

    this.state = {
      co: [],
      startdate: new Date('March 21, 2021 01:00:00'),
      enddate: new Date(),
      optionsMonth: {},
      Arrayval: []
    };

    this.handleStartDateChange = this.handleStartDateChange.bind(this); 
    this.handleEndDateChange = this.handleEndDateChange.bind(this); 
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleStartDateChange(event) { 
    this.setState({startdate: event});
  }

  handleEndDateChange(event) { 
    this.setState({enddate: event});
  }

  handleSubmit(event) {
    event.preventDefault();


    if (this.state.enddate < this.state.startdate) {
      this.setState({ enddate: this.state.startdate });

    }
    


    axios
      .get("http://localhost:5000/co/")
      .then((response) => {
        this.setState({
          co: response.data.filter(
            (el) =>
              new Date(el.codate).getTime() >=
                this.state.startdate.getTime() + 3600000 &&
              new Date(el.codate).getTime() <=
                this.state.enddate.getTime() + 3600000
          ),
        });
      })
      .catch((error) => {});


    var i;
    for(i = 0; i < this.state.co.length; i++){
      this.state.co[i].codate = dateFormat(new Date(new Date(this.state.co[i].codate).getTime()),("yyyy-mm-dd hh:mm:ss"));
    }

     this.state.startdate = new Date(this.state.startdate);
     this.state.enddate = new Date(this.state.enddate); 
    
    this.state.Arrayval = [];
    this.state.optionsMonth = {};
    this.render();
  }

  componentDidMount() {
    axios.get("http://localhost:5000/co/")
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
    return this.state.co.map((currentco) => {
        return (<CO2 co={currentco} deleteCO2={this.deleteCO2} key={currentco._id} />);
      }).reverse();
  }

  getdata() {
    this.state.Arrayval = []
    return this.state.co.map((currentco) => {
      this.state.Arrayval.push([Date.parse(currentco.codate), parseInt(currentco.coval)])
      return certificateboolCO2;
    });
  }

  gb() {
    this.getdata();
    var i = 0;
    var j = 1;
    for(i = 0; i < this.state.Arrayval.length; i++){
      if(this.state.Arrayval[i][j] < colimitred){
        certificateboolCO2 = true;
        thumb_img = greencert;
        thumb_alt = "Green Thumb Up";
        textyesorno = "IN COMPLIANCE ";
      }
      if(this.state.Arrayval[i][j] >= colimitred){
        certificateboolCO2 = false;
        thumb_img = redcert;
        thumb_alt = "Red Thumb Down";
        textyesorno = "NOT IN COMPLIANCE ";
        return;
      }
    }
    if( this.state.Arrayval.length < 1){
      certificateboolCO2 = true;
      thumb_img = greencert;
      thumb_alt = "Green Thumb Up";
      textyesorno = "IN COMPLIANCE ";
    }
    return certificateboolCO2;
  }

  createArray() {
    this.state.optionsMonth = {
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
          data: this.state.Arrayval,
        },
      ],
    };
  }
 

  render() {
    return (
      <>
      <Jumbotron fluid className="jumboco2">
        <div className="overlay "> </div>
        <Container className="d-none d-lg-block">
          <h1>Carbon Dioxide (CO2)</h1>
          <p>Find detailed information about all measured CO2 emissions!</p>
        </Container>
      </Jumbotron>
      
      <div className="container text-center">

        {this.gb()}
        
      
      <img class="mx-auto d-block" src={thumb_img} width="145" height="135" alt={thumb_alt} ></img>
      <div className="container text-center">
        <p>The CO2 emissions are <b>{textyesorno}</b> with government emission limits in the selected time range.</p>  
      </div>  
      

        <Card border="secondary">
          <Card.Header><b>Basic Information about CO2</b></Card.Header>
          <Card.Body>{infotext}</Card.Body>
        </Card>

        <br></br><br></br>

        {this.createArray()}

        <div>
          <p><b>Please select a time interval: </b></p>
          <form onSubmit={this.handleSubmit}>
           From:{" "} <DatePicker
              selected={ this.state.startdate }
              onChange={ this.handleStartDateChange }
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={30}
              timeCaption="time"
              dateFormat="MMMM d, yyyy HH:mm"
              maxDate={new Date()}
              minDate={new Date('March 19, 2021 00:00:00')}
            />

            To:{" "}
            <DatePicker
              selected={this.state.enddate}
              onChange={this.handleEndDateChange}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={30}
              timeCaption="time"
              dateFormat="MMMM d, yyyy HH:mm"
              maxDate={new Date()}
              minDate={this.state.startdate}
            />

            <button className="btn btn-primary">Submit</button>
          </form>
        </div>
        <br></br>

        <div>
          <HighchartsReact
            highcharts={Highcharts}
            options={this.state.optionsMonth}
            constructorType={"stockChart"}
          />
        </div>
        <br></br> <br></br>
        <h4>Legend of colors from the table shown below</h4>
        <br></br>

      <CardGroup>
        <Card border="success" bg="success" style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title><b>Color Green</b></Card.Title>
            <Card.Text>
            <b>CO2 value {">"} {colimitgreen} and {"<"} {colimitorange}</b>
            </Card.Text>
          </Card.Body>
        </Card>
        <br />

        <Card border="warning" bg="warning" style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title><b>Color Orange</b></Card.Title>
            <Card.Text>
            <b>CO2 value {">"} {colimitorange} and {"<"} {colimitred}</b>
            </Card.Text>
          </Card.Body>
        </Card>
        <br />

        <Card border="danger" bg="danger" style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title><b>Color Red</b></Card.Title>
            <Card.Text>
            <b>CO2 value {">"} {colimitred}</b>
            </Card.Text>
          </Card.Body>
        </Card>
        <br />

      </CardGroup>

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
      </>
    );
  }
}
