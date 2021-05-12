import React, { useState } from "react";
import { Jumbotron, Container, Tabs, Tab, Card } from "react-bootstrap";

import { useGlobalContext } from "../../context";
import "./emissions.css";

import HistoryTable from "../Core_components/HistoryTable";
import HistoryGraph from "../Core_components/HistoryGraph";
// import CertificateBanner from "../Core_components/CertificateBanner";

function NitrogenDioxide() {
  const { nitrogendioxideLoading, nitrogendioxideEventdb } = useGlobalContext();
  const [key, setKey] = useState("about");

  //blockchain gleiches wie db oder leeres array (besser)

  const lowerEmissionLimit = 1000;
  const higherEmissionLimit = 2000;

  return (
    <>
      <Jumbotron fluid className="jumbono2">
        <div className="overlay "> </div>
        <Container className="d-none d-lg-block">
          <h1>Nitrogen Dioxide (NO2)</h1>
          <p>Find verified information about all measured NO2 emissions!</p>
        </Container>
      </Jumbotron>
      {/* <CertificateBanner
        data={nitrogendioxideEventsChart}
        limit={higherEmissionLimit}
        loading={nitrogendioxideLoading}
      /> */}
      <hr />
      <HistoryGraph
        blockchainData={[]}
        databaseData={nitrogendioxideEventdb}
        loading={nitrogendioxideLoading}
        name="NO2"
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
          <Tab eventKey="about" title="About NO2">
            <Card>
              <Card.Body>
                <Card.Title>The Survivor</Card.Title>
                <Card.Text>
                  NO2 is the most common greenhouse gas. Even though it enters
                  the atmosphere naturally, the concentration has been massively
                  increased by humans. Through natural biochemical processes,
                  nitrogen dioxide is only degraded very slowly (60-85% in 1000
                  years)
                </Card.Text>
              </Card.Body>
            </Card>
          </Tab>
          <Tab eventKey="limits" title="Limits">
            <Card>
              <Card.Body>
                <Card.Title>Most regulated</Card.Title>
                <Card.Text>
                  Reducing NO2 emissions is a high priority for many countries.
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
                <Card.Title>Danger in closed Rooms</Card.Title>
                <Card.Text>
                  An increased concentration of NO2 in the air we breathe can
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
        blockchainData={[]}
        databaseData={nitrogendioxideEventdb}
        loading={nitrogendioxideLoading}
        lowerLimit={lowerEmissionLimit}
        higherLimit={higherEmissionLimit}
      />
    </>
  );
}

export default NitrogenDioxide;
