import React, { useState } from "react";
import { Jumbotron, Container, Tabs, Tab, Card } from "react-bootstrap";

import { useGlobalContext } from "../../context";

import HistoryGraph from "../Core_components/HistoryGraph";
import HistoryTable from "../Core_components/HistoryTable";
import AlarmBanner from "../Core_components/CertificateBanner";

function Temperature() {
  const {
    temperatureLoading,
    temperatureEventsChart,
    temperatureEventsTable,
    temperatureEventdb,
  } = useGlobalContext();

  const [key, setKey] = useState("about");

  const lowerEmissionLimit = 20;
  const higherEmissionLimit = 30;

  return (
    <>
      <Jumbotron fluid className="jumbo-temperature">
        <div className="overlay "> </div>
        <Container className="d-none d-lg-block">
          <h1>Temperature</h1>
          <p>Find information about all verified temperature measurements!</p>
        </Container>
      </Jumbotron>
      <AlarmBanner
        data={temperatureEventsChart}
        limit={higherEmissionLimit}
        loading={temperatureLoading}
      />
      <hr />
      <HistoryGraph
        blockchainData={temperatureEventsChart}
        databaseData={temperatureEventdb}
        loading={temperatureLoading}
        name="Temperature"
        unit="°C"
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
          <Tab eventKey="about" title="About Temperature">
            <Card>
              <Card.Body>
                <Card.Title>Getting Hot</Card.Title>
                <Card.Text>
                  Population exposure to heat is increasing due to climate
                  change, and this trend will continue. Globally, extreme
                  temperature events are observed to be increasing in their
                  frequency, duration, and magnitude.Exposure to excessive heat
                  has wide ranging physiological impacts for all humans, often
                  amplifying existing conditions and resulting in premature
                  death and disability.
                </Card.Text>
              </Card.Body>
            </Card>
          </Tab>
          <Tab eventKey="limits" title="Limits">
            <Card>
              <Card.Body>
                <Card.Text>
                  Above <b>26 °C: </b>Productivity decreases noticeably Above{" "}
                  <br />
                  <b>30 °C: </b>Cooling measures must be taken (drinks,
                  ventilation, light clothing)
                </Card.Text>
              </Card.Body>
            </Card>
          </Tab>
          <Tab eventKey="health" title="Health-Impact">
            <Card>
              <Card.Body>
                <Card.Title>Risks (not only) for certain groups</Card.Title>
                <Card.Text>
                  High temperatures are affecting everyone. However, certain
                  populations are prone to risks. These include the elderly,
                  infants and children, pregnant women, outdoor and manual
                  workers and athletes. Health impacts caused by a higher
                  temperature can happen immediately or lagged and include heat
                  strokes, heat cramps, hyperthermia and heat exhaustion.
                </Card.Text>
              </Card.Body>
            </Card>
          </Tab>
        </Tabs>
      </Container>
      <hr />
      <HistoryTable
        blockchainData={temperatureEventsTable}
        databaseData={temperatureEventdb}
        loading={temperatureLoading}
        lowerLimit={lowerEmissionLimit}
        higherLimit={higherEmissionLimit}
      />
    </>
  );
}
export default Temperature;
