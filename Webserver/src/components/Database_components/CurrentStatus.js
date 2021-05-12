import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";
import React, { useState, useEffect } from "react";

function CurrentStatus({
  name,
  unit,
  loading,
  timestamp,
  measurement,
  critical,
  demoCritical,
  data
}) {

  const [LastEvent, setLastEvent] = useState([0,0]); 

  const [formatLoading, setFormatLoading] = useState(true);

  const formatDatabase = (dbEvents) => {
    if (typeof dbEvents !== "undefined") {
      const timestamp = new Date(new Date(dbEvents.timestamp[dbEvents.timestamp.length-1]).getTime() + 3600000).toUTCString();
      const measurement = dbEvents.measurement[dbEvents.measurement.length-1];
      setLastEvent([timestamp, measurement])
      
      setFormatLoading(false);
    }
  };

  useEffect(() => {
    formatDatabase(data)
  }, [data]);

  
  return (
  <div className="card col-md-4" style={{width: 18 + 'em'}}>
      <Card.Header>Dating back to: {LastEvent[0]}</Card.Header>
      <Card.Body
        className={`${demoCritical === "2" ? "extreme": demoCritical === "1" ? "medium" : "low"}`}>
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
