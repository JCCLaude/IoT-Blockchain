import React, { useState } from "react";
import { Jumbotron, Container, Tabs, Tab, Card } from "react-bootstrap";

import { useGlobalContext } from "../../context";
import "./emissions.css";

import HistoryTable from "../Core_components/HistoryTable";
import HistoryGraph from "../Core_components/HistoryGraph";
// import CertificateBanner from "../Core_components/CertificateBanner";

function ParticularMatter2() {
  const {
    particularmatter2Loading: particularmatter2Loadingdb,
    particularmatter2Eventdb,
  } = useGlobalContext();
  const [key, setKey] = useState("about");

  const lowerEmissionLimit = 1000;
  const higherEmissionLimit = 2000;

  return (
    <>
      <Jumbotron fluid className="jumboco2">
        <div className="overlay "> </div>
        <Container className="d-none d-lg-block">
          <h1>Particular Matter 2,5 (PM 2,5)</h1>
          <p>Find verified information about all measured PM 2,5 emissions!</p>
        </Container>
      </Jumbotron>
      {/* <CertificateBanner
        data={particularmatter2EventsChart}
        limit={higherEmissionLimit}
        loading={particularmatter2Loadingdb}
      /> */}
      <hr />
      <HistoryGraph
        blockchainData={[]}
        databaseData={particularmatter2Eventdb}
        loading={particularmatter2Loadingdb}
        name="PM 2,5"
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
          <Tab eventKey="about" title="About PM 2,5">
            <Card>
              <Card.Body>
                <Card.Title>The Survivor</Card.Title>
                <Card.Text>
                  PM 2,5 is the most common greenhouse gas. Even though it
                  enters the atmosphere naturally, the concentration has been
                  massively increased by humans. Through natural biochemical
                  processes, carbon dioxide is only degraded very slowly (60-85%
                  in 1000 years)
                </Card.Text>
              </Card.Body>
            </Card>
          </Tab>
          <Tab eventKey="limits" title="Limits">
            <Card>
              <Card.Body>
                <Card.Title>Most regulated</Card.Title>
                <Card.Text>
                  Reducing PM 2,5 emissions is a high priority for many
                  countries. The Kyoto climate agreement stipulated that
                  emissions should be reduced by 5.8% compared to 1990. Many
                  countries are also implementing their own rules to reduce PM
                  2,5 emissions
                </Card.Text>
              </Card.Body>
            </Card>
          </Tab>
          <Tab eventKey="health" title="Health-Impact">
            <Card>
              <Card.Body>
                <Card.Title>Danger in closed Rooms</Card.Title>
                <Card.Text>
                  An increased concentration of PM 2,5 in the air we breathe can
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
        databaseData={particularmatter2Eventdb}
        loading={particularmatter2Loadingdb}
        lowerLimit={lowerEmissionLimit}
        higherLimit={higherEmissionLimit}
      />
    </>
  );
}

export default ParticularMatter2;