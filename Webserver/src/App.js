import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// general components
import Navigation from "./components/General_Components/Navigation";
import Overview from "./components/General_Components/Overview";
import About from "./components/General_Components/About";
import ErrorPage from "./components/General_Components/ErrorPage";
import StatusPane from "./components/General_Components/StatusPane";
import BlockchainExplanation from "./components/General_Components/BlockchainExplanation";
import OtherEmissions from "./components/General_Components/OtherEmissions";

// emission components
import Carbondioxide from "./components/Emission_Components/Carbondioxide";
import Humidity from "./components/Emission_Components/Humidity";
import Temperature from "./components/Emission_Components/Temperature";
import NitrogenDioxide from "./components/Emission_Components/NitrogenDioxide";
import ParticularMatter2 from "./components/Emission_Components/ParticularMatter2";
import ParticularMatter10 from "./components/Emission_Components/ParticularMatter10";
import SulfurDioxide from "./components/Emission_Components/SulfurDioxide";

function App() {
  return (
    <>
      <Router>
        <Navigation />
        <StatusPane />
        <Switch>
          <Route exact path="/" component={Overview} />
          <Route path="/co2" component={Carbondioxide} />
          <Route path="/humidity" component={Humidity} />
          <Route path="/temperature" component={Temperature} />
          <Route path="/about" component={About} />
          <Route path="/blockchain" component={BlockchainExplanation} />
          <Route path="/emissions" component={OtherEmissions} />
          <Route path="/nitrogendioxide" component={NitrogenDioxide} />
          <Route path="/particularmatter2" component={ParticularMatter2} />
          <Route path="/particularmatter10" component={ParticularMatter10} />
          <Route path="/sulfurdioxide" component={SulfurDioxide} />
          <Route component={ErrorPage} />
        </Switch>
        <br />
        <br />
        <br />
      </Router>
    </>
  );
}

export default App;
