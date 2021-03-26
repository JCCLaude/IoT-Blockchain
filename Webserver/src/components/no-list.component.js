import React, { Component } from 'react';
import axios from 'axios';

const NO2 = props => (
  <tr>
    <td>{props.no.noval}</td>
    <td>{props.no.nodate.substring(0,19).replace("T", " ")}</td>
  </tr>
)

export default class NO2List extends Component {
  constructor(props) {
    super(props);

    this.deleteNO2 = this.deleteNO2.bind(this)

    this.state = {no: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/no/')
      .then(response => { 
        this.setState({ no: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteNO2(id) {
    axios.delete('http://localhost:5000/no/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      no: this.state.no.filter(el => el._id !== id)
    })
  }

  NO2List() {
    return this.state.no.map(currentno => {
      return <NO2 no={currentno} deleteNO2={this.deleteNO2} key={currentno._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Nitrous oxide (NO2)</h3>
        <table className="table table-striped">
          <thead className="thead-light">
            <tr>
              <th>NO2 values in ppm</th>
              <th>Date of the measurement</th>
            </tr>
          </thead>
          <tbody>
            { this.NO2List() }
          </tbody>
        </table>
      </div>
    )
  }
}