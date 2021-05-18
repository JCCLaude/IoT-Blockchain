import React, { useState } from "react";
import { Jumbotron, Container, Tabs, Tab, Card } from "react-bootstrap";

import { useGlobalContext } from "../../context";
import "./emissions.css";

import HistoryTable from "../Core_components/HistoryTable";
import HistoryGraph from "../Core_components/HistoryGraph";
import CertificateBanner from "../Core_components/CertificateBanner";

function Carbondioxide() {
  const {
    co2Loading,
    co2EventsTable,
    co2EventsChart,
    co2Eventdb,
  } = useGlobalContext();
  const [key, setKey] = useState("about");

  const lowerEmissionLimit = 1000;
  const higherEmissionLimit = 2000;

  return (
    <>
      <Jumbotron fluid className="jumboco2">
        <div className="overlay "> </div>
        <Container className="d-none d-lg-block">
          <h1>Carbon Dioxide (CO2)</h1>
          <p>Find verified information about all measured CO2 emissions!</p>
        </Container>
      </Jumbotron>
      <CertificateBanner
        data={co2EventsChart}
        limit={higherEmissionLimit}
        loading={co2Loading}
      />
      <hr />
      <HistoryGraph
        blockchainData={co2EventsChart}
        databaseData={co2Eventdb}
        loading={co2Loading}
        name="CO2"
        unit="ppm"
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
          <Tab eventKey="about" title="About CO2">
            <Card>
              <Card.Body>
                <Card.Title>The Survivor</Card.Title>
                <Card.Text>
                  CO2 is the most common greenhouse gas. Even though it enters
                  the atmosphere naturally, the concentration has been massively
                  increased by humans. Through natural biochemical processes,
                  carbon dioxide is only degraded very slowly (60-85% in 1000
                  years)
                </Card.Text>
              </Card.Body>
            </Card>
          </Tab>
          <Tab eventKey="limits" title="Limits">
            <Card>
              <Card.Body>
                <Card.Title>Most Regulated</Card.Title>
                <Card.Text>
                  Reducing CO2 emissions is a high priority for many countries.
                  The Kyoto climate agreement stipulated that emissions should
                  be reduced by 5.8% compared to 1990. Many countries are also
                  implementing their own rules to reduce CO2 emissions
                </Card.Text>
              </Card.Body>
            </Card>
          </Tab>
          <Tab eventKey="health" title="Health-Impact">
            <Card>
              <Card.Body>
                <Card.Title>Danger In Closed Rooms</Card.Title>
                <Card.Text>
                  An increased concentration of CO2 in the air we breathe can
                  lead to poor concentration, decreased performance, increased
                  risk of infection, and increased breathing rate. As the
                  concentration of carbon dioxide naturally increases in closed
                  rooms, good ventilation with clean air should be provided.
                </Card.Text>
              </Card.Body>
            </Card>
          </Tab>
        </Tabs>
      </Container>
      <hr />
      <HistoryTable
        blockchainData={co2EventsTable}
        databaseData={co2Eventdb}
        loading={co2Loading}
        lowerLimit={lowerEmissionLimit}
        higherLimit={higherEmissionLimit}
      />
    </>
  );
}

export default Carbondioxide;