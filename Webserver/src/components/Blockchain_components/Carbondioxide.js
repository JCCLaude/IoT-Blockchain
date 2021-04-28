import React from "react";
import HistoryChart from "./BlockchainFetcher";

const CO2Build = require("../../assets/ethereumBuilds/CO2_Alarming.json");

function Carbondioxide() {
  return (
    <>
      <HistoryChart build={CO2Build} name="CO2" unit="ppm" />;
      <div className="container">
        <h1>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat
          quasi debitis amet voluptatem, ullam iste eligendi suscipit obcaecati
          voluptatum modi!
        </h1>
      </div>
    </>
  );
}

export default Carbondioxide;
