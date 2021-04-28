import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// general components
import Navigation from "./components/General_Components/Navigation";
import Overview from "./components/General_Components/Overview";
import About from "./components/General_Components/About";
import ErrorPage from "./components/General_Components/ErrorPage";
import StatusPane from "./components/General_Components/StatusPane";

// database components
import LandingPageDataBase from "./components/Database_components/LandingPage";
import AirHumidityDataBase from "./components/Database_components/AirHumidity";
import CarbonDioxideDataBase from "./components/Database_components/CarbonDioxide";
import NitrogenDioxideDataBase from "./components/Database_components/NitrogenDioxide";
import ParticularMatter2DataBase from "./components/Database_components/ParticularMatter2";
import ParticularMatter10DataBase from "./components/Database_components/ParticularMatter10";
import SulfurDioxideDataBase from "./components/Database_components/SulfurDioxide";
import TemperatureDataBase from "./components/Database_components/Temperature";
// blockchain components
import LandingPageBlockchain from "./components/Blockchain_components/LandingPage";
import CarbondioxideBlockchain from "./components/Blockchain_components/Carbondioxide";
import HumidityBlockchain from "./components/Blockchain_components/Humidity";
import TemperatureBlockchain from "./components/Blockchain_components/Temperature";

function App() {
  return (
    <>
      <Router>
        <Navigation />
        <StatusPane />
        <Switch>
          <Route exact path="/" component={Overview} />
          <Route exact path="/detail" component={LandingPageDataBase} />
          <Route
            path="/detail/carbondioxide"
            component={CarbonDioxideDataBase}
          />
          <Route path="/detail/airhumidity" component={AirHumidityDataBase} />
          <Route
            path="/detail/nitrogendioxide"
            component={NitrogenDioxideDataBase}
          />
          <Route path="/detail/pm2" component={ParticularMatter2DataBase} />
          <Route path="/detail/pm10" component={ParticularMatter10DataBase} />
          <Route
            path="/detail/sulfurdioxide"
            component={SulfurDioxideDataBase}
          />
          <Route path="/detail/temperature" component={TemperatureDataBase} />
          <Route exact path="/verified" component={LandingPageBlockchain} />
          <Route
            path="/verified/carbondioxide"
            component={CarbondioxideBlockchain}
          />
          <Route path="/verified/humidity" component={HumidityBlockchain} />
          <Route
            path="/verified/temperature"
            component={TemperatureBlockchain}
          />
          <Route path="/about" component={About} />
          <Route component={ErrorPage} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
