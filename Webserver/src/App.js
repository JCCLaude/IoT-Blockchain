import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component";
import OverviewList from "./components/overview-list.component";
import CO2List from "./components/co-list.component";
import NO2List from "./components/no-list.component";
import CH4List from "./components/ch-list.component";
import HelpList from "./components/help.component";
import BlockchainList from "./components/blockchain-list.component"


function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={OverviewList} />
      <Route path="/co" component={CO2List} />
      <Route path="/no" component={NO2List} />
      <Route path="/ch" component={CH4List} />
      <Route path="/help" component={HelpList} />
      <Route path="/bl" component={BlockchainList} />
      </div>
    </Router>
  );
}

export default App;
