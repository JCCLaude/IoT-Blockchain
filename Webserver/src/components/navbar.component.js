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
            <Link to="/ch" id="linkch4" className="nav-link">CH4</Link>
            </li>
            <li className="navbar-item">
            <Link to="/hfc" id="linkhfc" className="nav-link">HFC</Link>
            </li>
            <li className="navbar-item">
            <Link to="/pfc" id="linkpfc" className="nav-link">PFC</Link>
            </li>
            <li className="navbar-item">
            <Link to="/sf" id="linksf6" className="nav-link">SF6</Link>
            </li>
            <li className="navbar-item">
            <Link to="/airhumidity" id="linkairhumidity" className="nav-link">Air Humidity</Link>
            </li>
            <li className="navbar-item">
            <Link to="/temperature" id="linktemperature" className="nav-link">Temperature</Link>
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