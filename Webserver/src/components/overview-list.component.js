import React, { Component } from 'react';
import axios from 'axios';
import redthumbdown from '../redthumbdown.png';
import greenthumbup from '../greenthumbup.png';


import CO2 from './co-list.component';

var certificateboolOverview = true;
var thumb_img;
var thumb_alt =""; 

var notext1 = ""; var notext2 = ""; var notext3 = ""; var noimg; var noalt = ""; var noemissions = "";

var text1 = "The greenhouse gas emissions in your area are ";
var text2 = "with government emission limits.";
var textyesorno = "";
var infotext = "This project is designed to securely and independently "+
 "measure greenhouse gas emissions from power plants and industrial areas, and to ensure "+
 "compliance with legally mandated emission limits using IoT and blockchain technology. For "+ 
 "this purpose, IoT sensors will be attached 1. directly to power plants themselves and 2. to "+
 "houses in the immediate vicinity, which will measure various emissions. These values are then "+
 "stored in a database and displayed on this website here. If a value exceeds a legally specified "+
 "emission limit, this measurement is stored in a blockchain, where the entry is visible to everyone "+
 "at all times and can no longer be changed. In this way, transparency of the actual emission values "+ 
 "of the power plants and a resulting trust in the power plant operators that the environmental "+
 "regulations are being complied with should be established. Greenhouse gases are responsible for "+
 "climate change and damage both our environment and the health of all humans and animals, which is "+
 "why we as humans should take good care to adhere to emission limits. ";

var cob;

export default class OverviewList extends Component {
  constructor(props) {
    super(props);

    this.deleteOverview = this.deleteOverview.bind(this)

    this.state = {ov: []};
  }

  getBools() {
    return this.state.ov.map(currentco => {
      return <CO2 co={currentco} deleteCO2={this.deleteCO2} key={currentco._id}/>;
    })
  }

  componentDidMount() {
    axios.get('http://localhost:5000/ov/')
      .then(response => { 
        this.setState({ ov: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteOverview(id) {
    axios.delete('http://localhost:5000/ov/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      ov: this.state.ov.filter(el => el._id !== id)
    })
  }

  yesorno() {
    if(false) {certificateboolOverview = true}
    else {certificateboolOverview = false}

    if(certificateboolOverview) {thumb_img = greenthumbup;
      thumb_alt = "Green Thumb Up";
      textyesorno = "IN COMPLIANCE ";

      noemissions=""; noimg=null; noalt=""; notext1=""; notext2=""; notext3="";
    } 
    else{thumb_img = redthumbdown;
      thumb_alt = "Red Thumb Down";
      textyesorno = "NOT IN COMPLIANCE ";

      notext1 = "The following greenhouse gases in your area are "; notext2 = "NOT IN COMPLIANCE ";
      notext3 = "with the government emission limits:"; noimg = redthumbdown; noalt = "Red Thumb Down"; 
      noemissions = "CO2, SF6";
    }
  }

  OverviewList() {
    this.yesorno();
    return "";
  }

  render() {
    return (
      <div>
        <div><h3>Overview</h3></div>
        <p><img src={thumb_img} width="120" height="120" alt={thumb_alt} /> {text1} <b>{textyesorno}</b> {text2} </p>
        {infotext} 

        <br></br>
        
        {this.getBools()} 
        {cob}


        <br></br> <br></br>
      
          <p>{notext1} <b>{notext2}</b> {notext3}</p>
        <div className="container" id="Overview_red_img_list">
          <img src={noimg} width="80" height="80" alt={noalt} ></img> {/*ToDo: hide when set null*/}
          <figcaption> <b>{noemissions}</b> </figcaption>
        </div>

          <tbody>
            { this.OverviewList() }
          </tbody>

      </div>
    )
  }
}