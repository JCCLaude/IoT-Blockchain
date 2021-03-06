import React from "react";
import { Link } from "react-router-dom";
import "./StatusPane.css";
import { useGlobalContext } from "../../context";

function StatusPane() {
  const {
    co2Events,
    humidityEvents,
    temperatureEvents,
    co2Loading,
    humidityLoading,
    temperatureLoading,
    error,
  } = useGlobalContext();

  const latestCO2Event = co2Events[co2Events.length - 1].returnValues;
  const latestHumidityEvent =
    humidityEvents[humidityEvents.length - 1].returnValues;
  const latestTemperatureEvent =
    temperatureEvents[temperatureEvents.length - 1].returnValues;

  const totalCritical = [
    latestCO2Event,
    latestHumidityEvent,
    latestTemperatureEvent,
  ].reduce((total, event) => {
    if (parseInt(event.critical) === 2) {
      return total + 1;
    }
    return total;
  }, 0);
  return (
    <div
      className={`${
        totalCritical === 0
          ? "sticky-right non-critical"
          : "sticky-right critical"
      }`}
    >
      {error ? (
        <Link to="/">Check alarm(s)</Link>
      ) : co2Loading || humidityLoading || temperatureLoading ? (
        <Link to="/loading">Loading data</Link>
      ) : (
        <Link to="/">Currently {totalCritical} alarm(s)</Link>
      )}
    </div>
  );
}

export default StatusPane;
