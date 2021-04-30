import React from "react";

import { useGlobalContext } from "../../BlockchainContext";

import HistoryGraph from "./HistoryGraph";
import HistoryTable from "./HistoryTable";

function Temperature() {
  const {
    temperatureLoading,
    temperatureEventsChart,
    temperatureEventsTable,
  } = useGlobalContext();
  return (
    <>
      {temperatureLoading ? (
        <div className="container">
          <h4>Loading Blockchain-data</h4>
        </div>
      ) : (
        <HistoryGraph
          data={temperatureEventsChart}
          name="Temperature"
          unit="°C"
        />
      )}
      <hr />
      <HistoryTable
        data={temperatureEventsTable}
        loading={temperatureLoading}
      />
    </>
  );
}

export default Temperature;
