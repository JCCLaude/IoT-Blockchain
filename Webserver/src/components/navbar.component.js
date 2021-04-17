import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./style.components.css";


export default class Navbar extends Component {


  help_btn_function(){

  }

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg"> {/*fixed-top*/}
      
      <div className="leftSide">
        <Link to="/" className="navbar-brand" id="linkem">Emission Overview</Link>
      
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
            <Link to="/co" id="linkco2" className="nav-link">CO2</Link>
            </li>
            <li className="navbar-item">
            <Link to="/no" id="linkno2" className="nav-link">NO2</Link>
            </li>
            <li className="navbar-item">
            <Link to="/pm2" id="linkpm2" className="nav-link">PM2.5</Link>
            </li>
            <li className="navbar-item">
            <Link to="/pm10" id="linkpm2" className="nav-link">PM10</Link>
            </li>
            <li className="navbar-item">
            <Link to="/so" id="linkpm2" className="nav-link">SO2</Link>
            </li>
            <li className="navbar-item">
            <Link to="/ah" id="linkah" className="nav-link">Air Humidity</Link>
            </li>
            <li className="navbar-item">
            <Link to="/temp" id="linktemp" className="nav-link">Temperature</Link>
            </li>
            <li className="navbar-item">
            <Link to="/bl" id="linkblockchain" className="nav-link">Blockchain</Link>
            </li>
            </ul>
          </div>

        </div>

        <div className="rightSide">
            <li className="navbar-item" id="Help_navbar_item">
            <Link to="/help"> Help</Link>       
            </li>
        </div>

      </nav>
    );
  }
}