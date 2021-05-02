import React from "react";

import { useGlobalContext } from "../../context";

import HistoryGraph from "./HistoryGraph";
import HistoryTable from "./HistoryTable";

function Humidity() {
  const {
    humidityLoading,
    humidityEventsChart,
    humidityEventsTable,
  } = useGlobalContext();
  return (
    <>
      {humidityLoading ? (
        <div className="container">
          <h4>Loading Blockchain-data</h4>
        </div>
      ) : (
        <HistoryGraph data={humidityEventsChart} name="Humidity" unit="%" />
      )}
      <hr />
      <HistoryTable data={humidityEventsTable} loading={humidityLoading} />
    </>
  );
}
export default Humidity;
