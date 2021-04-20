import React, { Component } from "react";
import { Card, Accordion, Button, Jumbotron } from "react-bootstrap";
import { Link } from "react-router-dom";

export class LandingPage extends Component {
  render() {
    return (
      <>
        <Jumbotron>
          Here you can find lots of datasets and history data presented as
          links. Enjoy
        </Jumbotron>
        <div className="container">
          <article>
            <h1>Why detailed Information?</h1>
            <p>
              What can I expect? Which other information is available? How does
              this work? Which values can I check?
            </p>
            <h2>We got you!</h2>
            <p>Take for example this one to check carbondioxide</p>
            <Link to="/detail/carbondioxide">
              <Button variant="info">CO2</Button>
            </Link>
          </article>
        </div>
        <br />
        <div className="container">
          <Accordion>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  Click me!
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>Hello! I'm the body</Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                  Click me!
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body>Hello! I'm another body</Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
      </>
    );
  }
}

export default LandingPage;
