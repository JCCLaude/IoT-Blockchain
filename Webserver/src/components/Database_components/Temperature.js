import React, { Component } from 'react';
import axios from 'axios';
//import redthumbdown from '../images/redthumbdown.png';
//import greenthumbup from '../images/greenthumbup.png';
import "./style.components.css";
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock';
import IBESlogo from "../../images/IBESlogo.png";
import greencert from "../../images/greencert.png";
import redcert from "../../images/redcert.png";


var templimitred = 100;
var templimitorange = 50;
var templimitgreen = 0;

var certificateboolTemp = true;
var thumb_img = greencert;
var thumb_alt ="Green Thumb Up";

var text1 = "The CO2 emissions are ";
var text2 = "with government emission limits.";
var textyesorno = "IN COMPLIANCE ";
var infotext = "This page displays the measured temperature. Temperature is...";
var Arrayval = [];

var tempbv = "";
var tempbv1 = "";
var tempbd = "";
var tempbd1 = "";


const Temp = props => (
<tr>
    <td>{props.temp.tempdate.substring(0,19).replace("T", " ")}</td>
    <td id={props.temp.tempval >= templimitred ? 'valuesred':'valuesgreen' && props.temp.tempval >= templimitorange && props.temp.tempval < templimitred ? 'valuesyellow':'valuesgreen'}> {props.temp.tempval}</td> {/*{props.co.coval} {if(props.co.coval >= 800) {id='covaluesgreen'}}*/}
    <td>
      <a href={"https://maps.google.com/?q="+props.temp.tempgeo} target="_blank" rel="noopener noreferrer">Maps</a>
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



export default class Temperature extends Component {
  constructor(props) {
    super(props);

    this.deleteTemp = this.deleteTemp.bind(this)

    this.state = {
      temp: [] 
    }; 

    this.optionsMonth = {};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/temp/')
      .then(response => { 
        this.setState({ temp: response.data });
      })
        .catch((error) => {
          console.log(error);
        })
  }

  deleteTemp(id) {
    axios.delete('http://localhost:5000/temp/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      temp: this.state.temp.filter(el => el._id !== id)
    })
  }


  TempList() {
    return this.state.temp.map(currenttemp => {
      return <Temp temp={currenttemp} deleteTemp={this.deleteTemp} key={currenttemp._id}/>;
    }).reverse()
  }

  getdata() {
    return this.state.temp.map(currenttemp => {
      tempbv = JSON.stringify((<Temp temp={currenttemp} key={currenttemp._id}/>), getCircularReplacer());
      tempbd = tempbv.slice(tempbv.indexOf('tempdate'),tempbv.indexOf('tempgeo')); //dates
      tempbv =  tempbv.slice(tempbv.indexOf('tempval'),tempbv.indexOf('tempdate')); //values
      tempbv1 = tempbv.slice(tempbv.indexOf(':')+1,tempbv.indexOf(','));
      tempbd1 = tempbd.slice(tempbd.indexOf(':')+1,tempbd.indexOf(','));
      
      tempbd1 = tempbd1.replace("T", " ").replace("Z", "").replaceAll('"','').slice(0,tempbd1.indexOf(".")-1);
      Arrayval.push( [(Date.parse(tempbd1)+7200000), parseInt(tempbv1) ] ); 

      if(parseInt(tempbv1) > templimitred) {
        certificateboolTemp = false;
        thumb_img = redcert;
        thumb_alt = "Red Thumb Down";
        textyesorno = "NOT IN COMPLIANCE ";
      }
      return certificateboolTemp;
    })
  }

  gb(){
    this.getdata();
    return certificateboolTemp;
  }


  createArray() {
    this.optionsMonth = {
      chart: {
        type: 'spline'
      },
      title: {
        text: 'Temperature Month'
      },
      xAxis: {
        title: {
          text: 'Time'
        },
        type: 'datetime'
      },
      yAxis: {
        title: {
            text: 'Temperature in degree celsius'
        },
        plotLines: [{
          value: templimitred,
          color: 'red',
          dashStyle: 'shortdash',
          width: 2,
          label: {
              text: 'Limit '+templimitred+' degree celsius'
          }
        }]
      },
      series: [
        {
          name: 'Temperature values',
          data: Arrayval
        }
      ]
    };
  }

  render() {
    return (

      <div>

        <div className="flex-container" id="logo"><img src={IBESlogo} width="130" height="130" alt="IBES Logo"></img></div>
        

        <h3 id="Temp_heading">Temperature</h3>

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
          <div id="boxgreen"> <p>Color Green:</p> <br></br> <p>Temperature value {'>'} {templimitgreen} °C and {'<'} {templimitorange} °C</p> </div>
          <div id="boxorange"> <p>Color Orange: </p> <br></br> <p>Temperature value {'>'} {templimitorange} °C and {'<'} {templimitred} °C</p> </div> 
          <div id="boxred"> <p>Color Red: </p> <br></br> <p>Temperature value {'>'} {templimitred} °C</p> </div> 
        </div>

        <br></br> <br></br>

        <table className="table table-striped">
          <thead className="thead-light">
            <tr>
              <th>Date of measurement</th>
              <th>Temperature in degree celsius</th>
              <th>Geo Location</th> {/*or plz?*/} 
            </tr>
          </thead>
          
          <tbody>
            { this.TempList() }
          </tbody>
        </table>
      </div>
    )
  }
}
