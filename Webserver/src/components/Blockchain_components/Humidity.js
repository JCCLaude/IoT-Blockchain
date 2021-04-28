import React from "react";
import HistoryChart from "./BlockchainFetcher";

const HumidityBuild = require("../../assets/ethereumBuilds/Humidity_Alarming.json");

function Humidity() {
  return <HistoryChart build={HumidityBuild} name="Humidity" unit="%" />;
}
export default Humidity;
