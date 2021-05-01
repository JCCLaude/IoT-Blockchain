import React from "react";

import { useGlobalContext } from "../../context";

import HistoryTable from "./HistoryTable";
import HistoryGraph from "./HistoryGraph";

function Carbondioxide() {
  const { co2Loading, co2EventsTable, co2EventsChart } = useGlobalContext();
  return (
    <>
      {co2Loading ? (
        <div className="container">
          <h4>Loading Blockchain-data</h4>
        </div>
      ) : (
        <HistoryGraph data={co2EventsChart} name="CO2" unit="ppm" />
      )}
      <hr />
      <HistoryTable data={co2EventsTable} loading={co2Loading} />
    </>
  );
}

export default Carbondioxide;
