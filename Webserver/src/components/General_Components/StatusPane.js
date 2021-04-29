import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./StatusPane.css";
import { useGlobalContext } from "../../context";

function StatusPane() {
  const { co2Event, humidityEvent, temperatureEvent } = useGlobalContext();
  const totalCritical = [co2Event, humidityEvent, temperatureEvent].reduce(
    (total, event) => {
      const critical = parseInt(event.critical) === 0 ? 0 : 1;
      return total + critical;
    },
    0
  );

  return (
    <div
      className={`${
        totalCritical === 0
          ? "sticky-right non-critical"
          : "sticky-right critical"
      }`}
    >
      <Link to="/">Currently {totalCritical} alarm(s)</Link>
    </div>
  );
}

export default StatusPane;
