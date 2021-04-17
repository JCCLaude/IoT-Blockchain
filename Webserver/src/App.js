import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component";
import OverviewList from "./components/overview-list.component";
import CO2List from "./components/co-list.component";
import NO2List from "./components/no-list.component";
import SO2List from "./components/so-list.component";
import PM2List from "./components/pm2-list.component";
import PM10List from "./components/pm10-list.component";
import AHList from "./components/ah-list.component";
import TempList from "./components/temp-list.component";
import HelpList from "./components/help.component";
import BlockchainList from "./components/blockchain-list.component"


function App() {
  return (
    <Router>
           {/* <meta http-equiv="refresh" content="30" ></meta> */}
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={OverviewList} />
      <Route path="/co" component={CO2List} />
      <Route path="/no" component={NO2List} />
      <Route path="/so" component={SO2List} />
      <Route path="/pm2" component={PM2List} />
      <Route path="/pm10" component={PM10List} />
      <Route path="/ah" component={AHList} />
      <Route path="/temp" component={TempList} />
      <Route path="/help" component={HelpList} />
      <Route path="/bl" component={BlockchainList} />
      </div>
    </Router>
  );
}

export default App;
