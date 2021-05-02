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
    <Card>
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
      <Card.Footer>
        <small className="text-muted">
          <Link to={`/verified/${name}`}>More {name} Data</Link>
        </small>
      </Card.Footer>
    </Card>
  );
}

export default CurrentStatus;
