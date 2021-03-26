import React, { Component } from 'react';
import axios from 'axios';
import redthumbdown from '../redthumbdown.png';
import greenthumbup from '../greenthumbup.png';
import "./style.components.css"
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock';

var colimitred = 900;
var colimitorange = 500;
var colimitgreen = 0

var certificateboolCO2 = true;
var thumb_img;
var thumb_alt ="";

var text1 = "The CO2 emissions are ";
var text2 = "with government emission limits.";
var textyesorno = "";
var infotext = "This page displays the measured carbon dioxide (CO2) emissions. CO2 is the most common emission and stays in the atmosphere for more than a thousand years on average. Due to a too high CO2 content in the atmosphere, the ozone layer cannot completely intercept the sun's rays, which is why these can reach the earth's surface almost unhindered and increase climate change here.";
var Arrayval = [];

var cobv = "";
var cobv1 = "";
var cobd = "";
var cobd1 = "";


const CO2 = props => (
<tr>
    <td>{props.co.codate.substring(0,19).replace("T", " ")}</td>
    <td id={props.co.coval >= colimitred ? 'covaluesred':'covaluesgreen' && props.co.coval >= colimitorange && props.co.coval < colimitred ? 'covaluesyellow':'covaluesgreen'}> {props.co.coval}</td> {/*{props.co.coval} {if(props.co.coval >= 800) {id='covaluesgreen'}}*/}
    <td>
      <a href={"https://maps.google.com/?q="+props.co.cogeo} target="_blank" rel="noopener noreferrer">Maps</a>
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



export default class CO2List extends Component {
  constructor(props) {
    super(props);

    this.deleteCO2 = this.deleteCO2.bind(this)

    this.state = {co: []}; 

    this.optionsMonth = {};

  }


  componentDidMount() {
    axios.get('http://localhost:5000/co/')
      .then(response => { 
        this.setState({ co: response.data });
      })
        .catch((error) => {
          console.log(error);
        })
  }

  deleteCO2(id) {
    axios.delete('http://localhost:5000/co/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      co: this.state.co.filter(el => el._id !== id)
    })
  }

  yesorno() {
    if(1) {certificateboolCO2 = true}
    else {certificateboolCO2 = false}

    if(certificateboolCO2) {thumb_img = greenthumbup;
      thumb_alt = "Green Thumb Up";
      textyesorno = "IN COMPLIANCE ";
    } 
    else{thumb_img = redthumbdown
      thumb_alt = "Red Thumb Down";
      textyesorno = "NOT IN COMPLIANCE ";
    }
  }

  CO2List() {
    this.yesorno();
    return this.state.co.map(currentco => {
      return <CO2 co={currentco} deleteCO2={this.deleteCO2} key={currentco._id}/>;
    })
  }

  getdata() {
    return this.state.co.map(currentco => {
      cobv = JSON.stringify((<CO2 co={currentco} key={currentco._id}/>), getCircularReplacer());
      cobd = cobv.slice(cobv.indexOf('codate'),cobv.indexOf('cogeo')); //dates
      cobv =  cobv.slice(cobv.indexOf('coval'),cobv.indexOf('codate')); //values
      cobv1 = cobv.slice(cobv.indexOf(':')+1,cobv.indexOf(','));
      cobd1 = cobd.slice(cobd.indexOf(':')+1,cobd.indexOf(','));
      
      cobd1 = cobd1.replace("T", " ").replace("Z", "").replaceAll('"','').slice(0,cobd1.indexOf(".")-1);
      Arrayval.push( [(Date.parse(cobd1)+3600000), parseInt(cobv1) ] ); 
      return Arrayval;
    })
  }

  createArray() {
    this.getdata();
    this.optionsMonth = {
      chart: {
        type: 'spline'
      },
      title: {
        text: 'CO2 Emissions Month'
      },
      xAxis: {
        title: {
          text: 'Time'
        },
        type: 'datetime'
      },
      yAxis: {
        title: {
            text: 'CO2 Emission in ppm'
        },
        plotLines: [{
          value: 1200,
          color: 'red',
          dashStyle: 'shortdash',
          width: 2,
          label: {
              text: 'Limit 1200 particel per million (ppm)'
          }
        }]
      },
      series: [
        {
          name: 'CO2 Emissions',
          data: Arrayval
        }
      ]
    };
  }

  render() {
    return (
      <div>
        <div><h3 id="CO2_heading">Carbon dioxide (CO2)</h3></div>

        <p><img src={thumb_img} width="80" height="80" alt={thumb_alt} /> {text1} <b>{textyesorno}</b> {text2} </p>
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
          <div id="boxgreen"> <p>Color Green:</p> <br></br> <p>CO2 value {'>'} {colimitgreen} and {'<'} {colimitorange}</p> </div>
          <div id="boxorange"> <p>Color Orange: </p> <br></br> <p>CO2 value {'>'} {colimitorange} and {'<'} {colimitred}</p> </div> 
          <div id="boxred"> <p>Color Red: </p> <br></br> <p>CO2 value {'>'} {colimitred}</p> </div> 
        </div>

        <br></br> <br></br>

        <table className="table table-striped">
          <thead className="thead-light">
            <tr>
              <th>Date of measurement</th>
              <th>CO2 in ppm</th>
              <th>Geo Location</th> {/*or plz?*/} 
            </tr>
          </thead>
          
          <tbody>
            { this.CO2List() }
          </tbody>
        </table>
      </div>
    )
  }
}
