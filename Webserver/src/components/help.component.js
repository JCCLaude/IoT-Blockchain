import React, { Component } from 'react';
import axios from 'axios';
import IBESlogo from '../images/IBESlogo.png';
import "./style.components.css";


export default class HelpList extends Component {
  constructor(props) {
    super(props);

    this.deleteCH4 = this.deleteCH4.bind(this)

    this.state = {ch: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/help/')
      .then(response => { 
        this.setState({ ch: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteCH4(id) {
    axios.delete('http://localhost:5000/help/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      ch: this.state.ch.filter(el => el._id !== id)
    })
  }

  HelpList() {
    return "This is the help page.";
  }

  render() {
    return (
     <div>
       <div className="flex-container" id="logo"><img src={IBESlogo} width="130" height="130" alt="IBES Logo"></img></div>
        
        <h3>Help Page</h3>
          <tbody>
            { this.HelpList() }
          </tbody>
     </div>
    )
  }
}