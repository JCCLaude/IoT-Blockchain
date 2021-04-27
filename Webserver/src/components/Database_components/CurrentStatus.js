import React from "react";
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
