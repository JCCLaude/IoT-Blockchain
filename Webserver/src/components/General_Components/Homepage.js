import React from "react";
import { Jumbotron, Alert, Button } from "react-bootstrap";
const alarms = [
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
  "light",
  "dark",
];

function Homepage() {
  return (
    <>
      <Jumbotron>Welcome to IBES</Jumbotron>
      <div className="container">
        <h1>Wie man mit react-bootstrap arbeitet:</h1>
        {alarms.map((variant, id) => {
          return (
            <Alert key={id} variant={variant}>
              checkout{" "}
              <Button
                variant="link"
                href="https://react-bootstrap.github.io/components/alerts/"
              >
                das hier
              </Button>
              für alle Komponenten. Im Code findest du auch beispiele bezüglich
              imports, ansonsten hab ich auch einiges auf z.B. Youtube gefunden
            </Alert>
          );
        })}
      </div>
    </>
  );
}

export default Homepage;
