import React, { Component } from 'react';
import axios from 'axios';

const Blockchain = props => (
  <tr>
    <td>{props.bl}</td>
    <td>{props.bl}</td>
  </tr>
)



export default class BlockchainList extends Component {
  constructor(props) {
    super(props);

    this.state = {bl: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/bl/')
      .then(response => { 
        this.setState({ no: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  BlockchainList() {
    return this.state.bl.map(currentbl => {
      return <Blockchain bl={currentbl} key={currentbl._id}/>;
    })
  }


  render() {
    return (
      <div>
        <h3>Blockchain Values</h3>

        <p>Hallo Johannes, anbei deine Blockchain Seite. Sie ist nicht mit dem Backend, also der MongoDB verknüpft, da sie ja die Daten von der Blockchain beziehen soll. Happy Hacking!</p>
        <br></br>
        
        <table className="table table-striped">
          <thead className="thead-light">
            <tr>
              <th>Entries</th>
              <th>Date of entry</th>
            </tr>
          </thead>
          <tbody>
          { this.BlockchainList() }
          </tbody>
        </table>
      </div>
    )
  }
}