import React from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";

function CurrentStatus({
  name,
  unit,
  loading,
  timestamp,
  measurement,
  critical,
  demoCritical,
}) {
  return (
  <div className="card col-md-4" style={{width: 18 + 'em'}}>
      <Card.Header>Dating back to: {timestamp}</Card.Header>
      <Card.Body
        className={`${
          demoCritical === "2"
            ? "extreme"
            : demoCritical === "1"
            ? "medium"
            : "low"
        }`}
      >
        <Card.Title>Latest {name} measurement:</Card.Title>
        {loading ? (
          <Spinner animation="grow" />
        ) : (
          <h1>
            <Badge>
              {measurement} {unit}
            </Badge>
          </h1>
        )}
      </Card.Body>
    </div>
  );
}

export default CurrentStatus;





/*import React from "react";
import Col from "react-bootstrap/Col";

function CurrentStatus({ name, timestamp, measurement, geolocation }) {
  return (
    <Col md key={name}>
      <h1>Latest {name} Measurement</h1>
      <p><b>Time of measurement:</b> {timestamp}</p>
      <p><b>Measured value:</b> {measurement}</p>
      <p><b>Geolocation:</b> {geolocation}</p>
    </Col>
  );
}

export default CurrentStatus;
*/