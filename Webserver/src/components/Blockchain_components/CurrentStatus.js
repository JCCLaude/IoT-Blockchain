import React from "react";
import Col from "react-bootstrap/Col";

function CurrentStatus({ name, timestamp, measurement, geolocation }) {
  return (
    <Col md key={name}>
      <h1>Latest {name} Measurement</h1>
      <p>Time of measurement: {timestamp}</p>
      <p>Measured value: {measurement}</p>
      <p>Geolocation: {geolocation}</p>
    </Col>
  );
}

export default CurrentStatus;
