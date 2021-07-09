import React, { useState } from "react";
import { Jumbotron, Container, Tabs, Tab, Card } from "react-bootstrap";

import { useGlobalContext } from "../../context";

import HistoryGraph from "../Core_components/HistoryGraph";
import HistoryTable from "../Core_components/HistoryTable";
import CertificateBanner from "../Core_components/CertificateBanner";

function Humidity() {
  const {
    humidityLoading,
    humidityEventsChart,
    humidityEventsTable,
    humidityEventdb,
  } = useGlobalContext();

  const [key, setKey] = useState("about");
  const lowerEmissionLimit = 70;
  const higherEmissionLimit = 95;

  return (
    <>
      <Jumbotron fluid className="jumbo-humidity">
        <div className="overlay "> </div>
        <Container className="d-none d-lg-block">
          <h1>Humidity</h1>
          <p>Find verified information about humidity measurements!</p>
        </Container>
      </Jumbotron>
      <CertificateBanner
        data={humidityEventsChart}
        limit={higherEmissionLimit}
        loading={humidityLoading}
      />
      <hr />
      <HistoryGraph
        blockchainData={humidityEventsChart}
        databaseData={humidityEventdb}
        loading={humidityLoading}
        name="Humidity"
        unit="%"
        lowerLimit={lowerEmissionLimit}
        higherLimit={higherEmissionLimit}
      />
      <hr />
      <Container>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Tab eventKey="about" title="About Humidity">
            <Card>
              <Card.Body>
                <Card.Title>Getting Wet</Card.Title>
                <Card.Text>
                  Increased humidity occurs particularly often in conjunction
                  with increased temperatures. Due to global warming, more and
                  more humid, hot days occur, especially in the summer months.
                  These days present the body with great challenges
                </Card.Text>
              </Card.Body>
            </Card>
          </Tab>
          <Tab eventKey="limits" title="Limits">
            <Card>
              <Card.Body>
                <Card.Text>
                  <b>35-50%: </b> Ideal conditions in closed rooms
                  <br />
                  Above
                  <b>70 %: </b> Increased respiratory rate and heavy load on the
                  cardiovascular system <br />
                  Above <b>95 %: </b> Acute threat from lack of water and
                  nutrients leads to heat stroke, heat cramps and fainting
                </Card.Text>
              </Card.Body>
            </Card>
          </Tab>
          <Tab eventKey="health" title="Health Impact">
            <Card>
              <Card.Body>
                <Card.Title>Challenge for the body</Card.Title>
                <Card.Text>
                  The higher the humidity rises, the harder it is for the body
                  to regulate its own temperature. As soon as the cooling
                  function of perspiration is no longer effective above 70%, the
                  body starts to take care of all internal organs at full speed.
                  This leads to a massive strain on the cardiovascular system
                  and demands huge amounts of nutrients and water from the body.
                  If replenishment is lacking, the results can include symptoms
                  from exhaustion up to collapsing.
                </Card.Text>
              </Card.Body>
            </Card>
          </Tab>
        </Tabs>
      </Container>
      <hr />
      <HistoryTable
        blockchainData={humidityEventsTable}
        databaseData={humidityEventdb}
        loading={humidityLoading}
        lowerLimit={lowerEmissionLimit}
        higherLimit={higherEmissionLimit}
      />
    </>
  );
}
export default Humidity;
