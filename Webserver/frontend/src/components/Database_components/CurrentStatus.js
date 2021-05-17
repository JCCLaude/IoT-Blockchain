import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";
import React, { useState, useEffect, useCallback } from "react";

function CurrentStatus({
  name,
  unit,
  loading,
  timestamp,
  measurement,
  critical,
  demoCritical,
  data,
  limitred,
  limitorange,
}) {
  const [LastEvent, setLastEvent] = useState([0, 0, 0]);

  const [formatLoading, setFormatLoading] = useState(true);

  const formatDatabase = useCallback((dbEvents) => {
    let newCritical = 0;
    if (typeof dbEvents !== "undefined") {
      const timestamp = new Date(
        new Date(dbEvents.timestamp[dbEvents.timestamp.length - 1]).getTime() +
          3600000
      ).toUTCString();
      const measurement = dbEvents.measurement[dbEvents.measurement.length - 1];
      const limitred = dbEvents.limitred;
      const limitorange = dbEvents.limitorange;
      if (measurement >= limitred) {
        newCritical = 2;
      }
      if (measurement < limitred && measurement >= limitorange) {
        newCritical = 1;
      }
      setLastEvent([timestamp, measurement, newCritical]);

      setFormatLoading(false);
    }
  }, []);

  useEffect(() => {
    formatDatabase(data);
  }, [data, formatDatabase]);

  return (
    <div className="card col-md-4 mx-auto" style={{ width: 18 + "em" }}>
      <Card.Header>Dating back to: {LastEvent[0]}</Card.Header>
      <Card.Body
        className={`${
          LastEvent[2] === 2 ? "extreme" : LastEvent[2] === 1 ? "medium" : "low"
        }`}
      >
        <Card.Title>Latest {name} measurement:</Card.Title>
        {formatLoading ? (
          <Spinner animation="grow" />
        ) : (
          <h1>
            <Badge>
              {LastEvent[1]} {unit}
            </Badge>
          </h1>
        )}
      </Card.Body>
    </div>
  );
}

export default CurrentStatus;
