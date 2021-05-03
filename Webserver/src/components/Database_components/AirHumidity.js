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

var ahlimitred = 95;
var ahlimitorange = 50;
var ahlimitgreen = 0;

var certificateboolAirHum = true;
var thumb_img = greencert;
var thumb_alt = "Green Thumb Up";

var text1 = "The Air Humidity values are ";
var text2 = "with government emission limits in the selected time range.";
var textyesorno = "IN COMPLIANCE ";
var infotext =
  "This page displays the measured air humidity values. Air Humidity is important...";

const AH = (props) => (
  <tr>
    <td>{props.ah.ahdate.substring(0, 19).replace("T", " ")}</td>
    <td id={props.ah.ahval >= ahlimitred ? "valuesred" : "valuesgreen" && props.ah.ahval >= ahlimitorange && props.ah.ahval < ahlimitred ? "valuesyellow" : "valuesgreen" }>{" "}{props.ah.ahval}</td>
    <td><a href={"https://maps.google.com/?q=" + props.ah.ahgeo} target="_blank" rel="noopener noreferrer"> Maps </a> </td>
  </tr>
);


export default class AirHumidity extends Component {
  constructor(props) {
    super(props);

    this.deleteAirHum = this.deleteAirHum.bind(this);

    this.state = {
      ah: [],
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
      .get("http://localhost:5000/ah/")
      .then((response) => {
        this.setState({
          ah: response.data.filter(
            (el) =>
              new Date(el.ahdate).getTime() >=
                this.state.startdate.getTime() + 3600000 &&
              new Date(el.ahdate).getTime() <=
                this.state.enddate.getTime() + 3600000
          ),
        });
      })
      .catch((error) => {});


    var i;
    for(i = 0; i < this.state.ah.length; i++){
      this.state.ah[i].ahdate = dateFormat(new Date(new Date(this.state.ah[i].ahdate).getTime()),("yyyy-mm-dd hh:mm:ss"));
    }

     this.state.startdate = new Date(this.state.startdate);
     this.state.enddate = new Date(this.state.enddate); 
    
    this.state.Arrayval = [];
    this.state.optionsMonth = {};
    this.render();
  }

  componentDidMount() {
    axios.get("http://localhost:5000/ah/")
      .then((response) => {
        this.setState({ ah: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteAirHum(id) {
    axios.delete("http://localhost:5000/ah/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      ah: this.state.ah.filter((el) => el._id !== id),
    });
  }

  AirHumidityList() {
    return this.state.ah.map((currentah) => {
        return (<AH ah={currentah} deleteAirHum={this.deleteAirHum} key={currentah._id} />);
      }).reverse();
  }

  getdata() {
    this.state.Arrayval = []
    return this.state.ah.map((currentah) => {
      this.state.Arrayval.push([Date.parse(currentah.ahdate), parseInt(currentah.ahval)])
      return certificateboolAirHum;
    });
  }

  gb() {
    this.getdata();
    var i = 0;
    var j = 1;
    for(i = 0; i < this.state.Arrayval.length; i++){
      if(this.state.Arrayval[i][j] < ahlimitred){
        certificateboolAirHum = true;
        thumb_img = greencert;
        thumb_alt = "Green Thumb Up";
        textyesorno = "IN COMPLIANCE ";
      }
      if(this.state.Arrayval[i][j] >= ahlimitred){
        certificateboolAirHum = false;
        thumb_img = redcert;
        thumb_alt = "Red Thumb Down";
        textyesorno = "NOT IN COMPLIANCE ";
        return;
      }
    }
    if( this.state.Arrayval.length < 1){
      certificateboolAirHum = true;
      thumb_img = greencert;
      thumb_alt = "Green Thumb Up";
      textyesorno = "IN COMPLIANCE ";
    }
    return certificateboolAirHum;
  }

  createArray() {
    this.state.optionsMonth = {
      chart: {
        type: "spline",
      },
      title: {
        text: "Air Humidity Values Month",
      },
      xAxis: {
        title: {
          text: "Time",
        },
        type: "datetime",
      },
      yAxis: {
        title: {
          text: "Air Humidity values in %",
        },
        plotLines: [
          {
            value: ahlimitred,
            color: "red",
            dashStyle: "shortdash",
            width: 2,
            label: {
              text: "Limit " + ahlimitred + " percent (%)",
            },
          },
        ],
      },
      series: [
        {
          name: "Air Humidity values",
          data: this.state.Arrayval,
        },
      ],
    };
  }
 

  render() {
    return (
      <>
      <Jumbotron fluid className="jumboah">
        <div className="overlay "> </div>
        <Container className="d-none d-lg-block">
          <h1>Air Humidity</h1>
          <p>Find detailed information about all measured Air Humidity values!</p>
        </Container>
      </Jumbotron>
      
      <div className="container text-center">

        {this.gb()}
        
      
      <img class="mx-auto d-block" src={thumb_img} width="145" height="135" alt={thumb_alt} ></img>
      <div className="container text-center">
        <p>The Air Humidity values are <b>{textyesorno}</b> with government emission limits in the selected time range.</p>  
      </div>  
      

        <Card border="secondary">
          <Card.Header><b>Basic Information about Air Humidity</b></Card.Header>
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
            <b>Air Humidity value {">"} {ahlimitgreen} and {"<"} {ahlimitorange}</b>
            </Card.Text>
          </Card.Body>
        </Card>
        <br />

        <Card border="warning" bg="warning" style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title><b>Color Orange</b></Card.Title>
            <Card.Text>
            <b>Air Humidity value {">"} {ahlimitorange} and {"<"} {ahlimitred}</b>
            </Card.Text>
          </Card.Body>
        </Card>
        <br />

        <Card border="danger" bg="danger" style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title><b>Color Red</b></Card.Title>
            <Card.Text>
            <b>Air Humidity value {">"} {ahlimitred}</b>
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
              <th>Air Humidity in %</th>
              <th>Geo Location</th>
            </tr>
          </thead>

          <tbody>{this.AirHumidityList()}</tbody>
        </table>
      </div>
      </>
    );
  }
}
