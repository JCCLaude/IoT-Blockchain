import React, { Component } from 'react';
import axios from 'axios';

const CH4 = props => (
  <tr>
    <td>{props.ch.chval}</td>
    <td>{props.ch.chdate.substring(0,19).replace("T", " ")}</td>
  </tr>
)

export default class CH4List extends Component {
  constructor(props) {
    super(props);

    this.deleteCH4 = this.deleteCH4.bind(this)

    this.state = {ch: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/ch/')
      .then(response => { 
        this.setState({ ch: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteCH4(id) {
    axios.delete('http://localhost:5000/ch/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      ch: this.state.ch.filter(el => el._id !== id)
    })
  }

  CH4List() {
    return this.state.ch.map(currentch => {
      return <CH4 ch={currentch} deleteCH4={this.deleteCH4} key={currentch._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Methane (CH4)</h3>
        <table className="table table-striped">
          <thead className="thead-light">
            <tr>
              <th>CH4 values in ppm</th>
              <th>Date of measurement</th>
            </tr>
          </thead>
          <tbody>
            { this.CH4List() }
          </tbody>
        </table>
      </div>
    )
  }
}