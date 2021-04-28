import React from "react";
import HistoryChart from "./BlockchainFetcher";

const TemperatureBuild = require("../../assets/ethereumBuilds/Temperature_Alarming.json");

function Temperature() {
  return <HistoryChart build={TemperatureBuild} name="Temperature" unit="°C" />;
}

export default Temperature;
