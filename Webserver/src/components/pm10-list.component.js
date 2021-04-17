import React, { Component } from 'react';
import axios from 'axios';
import "./style.components.css";
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock';
import IBESlogo from '../images/IBESlogo.png';
import greencert from '../images/greencert.png';
import redcert from '../images/redcert.png';

var pm10limitred = 1000;
var pm10limitorange = 500;
var pm10limitgreen = 0;

var certificateboolPM10 = true;
var thumb_img = greencert;
var thumb_alt ="Green Thumb Up";

var text1 = "The PM10 emissions are ";
var text2 = "with government emission limits.";
var textyesorno = "IN COMPLIANCE ";
var infotext = "This page displays the measured particular matter (PM10) emissions. PM10 is...";
var Arrayval = [];

var pm10bv = "";
var pm10bv1 = "";
var pm10bd = "";
var pm10bd1 = "";



const PM10 = props => (
  <tr>
    <td>{props.pm10.pm10date.substring(0,19).replace("T", " ")}</td>
    <td id={props.pm10.pm10val >= pm10limitred ? 'valuesred':'valuesgreen' && props.pm10.pm10val >= pm10limitorange && props.pm10.pm10val < pm10limitred ? 'valuesyellow':'valuesgreen'}> {props.pm10.pm10val}<img src={thumb_img} alt="" height="40" width="40"></img></td> 
    <td>
      <a href={"https://maps.google.com/?q="+props.pm10.pm10geo} target="_blank" rel="noopener noreferrer">Maps</a>
    </td>
  </tr>
)

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


export default class PM10List extends Component {
  constructor(props) {
    super(props);
    this.deletePM10 = this.deletePM10.bind(this)
    this.state = {pm10: []};
    this.optionsMonth = {};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/pm10/')
      .then(response => { 
        this.setState({ pm10: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deletePM10(id) {
    axios.delete('http://localhost:5000/pm10/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      pm10: this.state.pm10.filter(el => el._id !== id)
    })
  }

  PM10List() {
    return this.state.pm10.map(currentpm10 => {
      return <PM10 pm10={currentpm10} deletePM10={this.deletePM10} key={currentpm10._id}/>;
    }).reverse()
  }

  getdata() {
    return this.state.pm10.map(currentpm10 => {
      pm10bv = JSON.stringify((<PM10 pm10={currentpm10} key={currentpm10._id}/>), getCircularReplacer());
      pm10bd = pm10bv.slice(pm10bv.indexOf('pm10date'),pm10bv.indexOf('pm10geo')); //dates
      pm10bv =  pm10bv.slice(pm10bv.indexOf('pm10val'),pm10bv.indexOf('pm10date')); //values
      pm10bv1 = pm10bv.slice(pm10bv.indexOf(':')+1,pm10bv.indexOf(','));
      pm10bd1 = pm10bd.slice(pm10bd.indexOf(':')+1,pm10bd.indexOf(','));
      
      pm10bd1 = pm10bd1.replace("T", " ").replace("Z", "").replaceAll('"','').slice(0,pm10bd1.indexOf(".")-1);
      Arrayval.push( [(Date.parse(pm10bd1)+3600000), parseInt(pm10bv1) ] ); 

      if(parseInt(pm10bv1) > pm10limitred) {
        certificateboolPM10 = false;
        thumb_img = redcert;
        thumb_alt = "Red Thumb Down";
        textyesorno = "NOT IN COMPLIANCE ";
      }
      return certificateboolPM10;
    })
  }

  gb(){
    this.getdata();
    return certificateboolPM10;
  }


  createArray() {
    this.optionsMonth = {
      chart: {
        type: 'spline'
      },
      title: {
        text: 'PM10 Emissions Month'
      },
      xAxis: {
        title: {
          text: 'Time'
        },
        type: 'datetime'
      },
      yAxis: {
        title: {
            text: 'PM10 Emission in ppm'
        },
        plotLines: [{
          value: pm10limitred,
          color: 'red',
          dashStyle: 'shortdash',
          width: 2,
          label: {
              text: 'Limit '+pm10limitred+' particel per million (ppm)'
          }
        }]
      },
      series: [
        {
          name: 'PM10 Emissions',
          data: Arrayval
        }
      ]
    };
  }


  render() {
    return (
      <div>

        <div className="flex-container" id="logo"><img src={IBESlogo} width="130" height="130" alt="IBES Logo"></img></div>
        
        <h3>Particulate Matter 10 micrometers (PM10)</h3>

        {this.gb()}

        <p><img src={thumb_img} width="100" height="90" alt={thumb_alt} /> {text1} <b>{textyesorno}</b> {text2} </p>
        {infotext}


        {this.createArray()}

        <br></br> <br></br>
        
          <div>
            <HighchartsReact highcharts={Highcharts} options={this.optionsMonth} constructorType={'stockChart'}/>
          </div>

        <br></br> <br></br>
        <h4>Legend of colors from the table shown below</h4>
        <br></br>
        <div class='flex-container' id='legendbox'>
          <div id="boxgreen"> <p>Color Green:</p> <br></br> <p>PM10 value {'>'} {pm10limitgreen} and {'<'} {pm10limitorange}</p> </div>
          <div id="boxorange"> <p>Color Orange: </p> <br></br> <p>PM10 value {'>'} {pm10limitorange} and {'<'} {pm10limitred}</p> </div> 
          <div id="boxred"> <p>Color Red: </p> <br></br> <p>PM10 value {'>'} {pm10limitred}</p> </div> 
        </div>

        <br></br> <br></br>


        <table className="table table-striped">
          <thead className="thead-light">
            <tr>
              <th>PM10 values in ppm</th>
              <th>Date of measurement</th>
            </tr>
          </thead>
          <tbody>
            { this.PM10List() }
          </tbody>
        </table>
      </div>
    )
  }
}