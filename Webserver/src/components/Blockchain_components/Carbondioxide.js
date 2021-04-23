import React from "react";
import HistoryChart from "./BlockchainFetcher";

const CO2Build = require("./assets/ethereumBuilds/CO2_Alarming.json");

function Carbondioxide() {
  return <HistoryChart build={CO2Build} name="CO2" unit="ppm" />;
}

export default Carbondioxide;
