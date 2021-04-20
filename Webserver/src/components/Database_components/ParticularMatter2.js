import React, { Component } from 'react';
import axios from 'axios';
import "./style.components.css";
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock';
import IBESlogo from "../../images/IBESlogo.png";
import greencert from "../../images/greencert.png";
import redcert from "../../images/redcert.png";

var pm2limitred = 1000;
var pm2limitorange = 500;
var pm2limitgreen = 0;

var certificateboolPM2 = true;
var thumb_img = greencert;
var thumb_alt ="Green Thumb Up";

var text1 = "The PM2.5 emissions are ";
var text2 = "with government emission limits.";
var textyesorno = "IN COMPLIANCE ";
var infotext = "This page displays the measured particular matter (PM2.5) emissions. PM2.5 is...";
var Arrayval = [];

var pm2bv = "";
var pm2bv1 = "";
var pm2bd = "";
var pm2bd1 = "";



const PM2 = props => (
  <tr>
    <td>{props.pm2.pm2date.substring(0,19).replace("T", " ")}</td>
    <td id={props.pm2.pm2val >= pm2limitred ? 'valuesred':'valuesgreen' && props.pm2.pm2val >= pm2limitorange && props.pm2.pm2val < pm2limitred ? 'valuesyellow':'valuesgreen'}> {props.pm2.pm2val}<img src={thumb_img} alt="" height="40" width="40"></img></td> 
    <td>
      <a href={"https://maps.google.com/?q="+props.pm2.pm2geo} target="_blank" rel="noopener noreferrer">Maps</a>
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


export default class ParticularMatter2 extends Component {
  constructor(props) {
    super(props);
    this.deletePM2 = this.deletePM2.bind(this)
    this.state = {pm2: []};
    this.optionsMonth = {};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/pm2/')
      .then(response => { 
        this.setState({ pm2: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deletePM2(id) {
    axios.delete('http://localhost:5000/pm2/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      pm2: this.state.pm2.filter(el => el._id !== id)
    })
  }

  PM2List() {
    return this.state.pm2.map(currentpm2 => {
      return <PM2 pm2={currentpm2} deletePM2={this.deletePM2} key={currentpm2._id}/>;
    }).reverse()
  }

  getdata() {
    return this.state.pm2.map(currentpm2 => {
      pm2bv = JSON.stringify((<PM2 pm2={currentpm2} key={currentpm2._id}/>), getCircularReplacer());
      pm2bd = pm2bv.slice(pm2bv.indexOf('pm2date'),pm2bv.indexOf('pm2geo')); //dates
      pm2bv =  pm2bv.slice(pm2bv.indexOf('pm2val'),pm2bv.indexOf('pm2date')); //values
      pm2bv1 = pm2bv.slice(pm2bv.indexOf(':')+1,pm2bv.indexOf(','));
      pm2bd1 = pm2bd.slice(pm2bd.indexOf(':')+1,pm2bd.indexOf(','));
      
      pm2bd1 = pm2bd1.replace("T", " ").replace("Z", "").replaceAll('"','').slice(0,pm2bd1.indexOf(".")-1);
      Arrayval.push( [(Date.parse(pm2bd1)+3600000), parseInt(pm2bv1) ] ); 

      if(parseInt(pm2bv1) > pm2limitred) {
        certificateboolPM2 = false;
        thumb_img = redcert;
        thumb_alt = "Red Thumb Down";
        textyesorno = "NOT IN COMPLIANCE ";
      }
      return certificateboolPM2;
    })
  }

  gb(){
    this.getdata();
    return certificateboolPM2;
  }


  createArray() {
    this.optionsMonth = {
      chart: {
        type: 'spline'
      },
      title: {
        text: 'PM2.5 Emissions Month'
      },
      xAxis: {
        title: {
          text: 'Time'
        },
        type: 'datetime'
      },
      yAxis: {
        title: {
            text: 'PM2.5 Emission in ppm'
        },
        plotLines: [{
          value: pm2limitred,
          color: 'red',
          dashStyle: 'shortdash',
          width: 2,
          label: {
              text: 'Limit '+pm2limitred+' particel per million (ppm)'
          }
        }]
      },
      series: [
        {
          name: 'PM2.5 Emissions',
          data: Arrayval
        }
      ]
    };
  }


  render() {
    return (
      <div>

        <div className="flex-container" id="logo"><img src={IBESlogo} width="130" height="130" alt="IBES Logo"></img></div>
        
        <h3>Particulate Matter 2,5 micrometers (PM2,5)</h3>

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
          <div id="boxgreen"> <p>Color Green:</p> <br></br> <p>PM2.5 value {'>'} {pm2limitgreen} and {'<'} {pm2limitorange}</p> </div>
          <div id="boxorange"> <p>Color Orange: </p> <br></br> <p>PM2.5 value {'>'} {pm2limitorange} and {'<'} {pm2limitred}</p> </div> 
          <div id="boxred"> <p>Color Red: </p> <br></br> <p>PM2.5 value {'>'} {pm2limitred}</p> </div> 
        </div>

        <br></br> <br></br>


        <table className="table table-striped">
          <thead className="thead-light">
            <tr>
              <th>PM2,5 values in ppm</th>
              <th>Date of measurement</th>
            </tr>
          </thead>
          <tbody>
            { this.PM2List() }
          </tbody>
        </table>
      </div>
    )
  }
}