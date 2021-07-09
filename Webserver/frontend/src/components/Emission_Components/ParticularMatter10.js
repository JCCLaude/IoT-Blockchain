import React, { useState } from "react";
import { Jumbotron, Container, Tabs, Tab, Card } from "react-bootstrap";

import { useGlobalContext } from "../../context";
import "./emissions.css";

import HistoryTable from "../Core_components/HistoryTable";
import HistoryGraph from "../Core_components/HistoryGraph";
import CertificateBanner from "../Core_components/CertificateBanner";

function ParticularMatter10() {
  const { particularmatter10Loadingdb, particularmatter10Eventdb } =
    useGlobalContext();
  const [key, setKey] = useState("about");

  const lowerEmissionLimit = 25;
  const higherEmissionLimit = 50;

  return (
    <>
      <Jumbotron fluid className="jumbopm10">
        <div className="overlay "> </div>
        <Container className="d-none d-lg-block">
          <h1>Particular Matter 10 (PM 10)</h1>
          <p>Find verified information about all measured PM 10 emissions!</p>
        </Container>
      </Jumbotron>
      <CertificateBanner
        data={[0,0]}
        limit={higherEmissionLimit}
        loading={particularmatter10Loadingdb}
      />
      <hr />
      <HistoryGraph
        blockchainData={[]}
        databaseData={particularmatter10Eventdb}
        loading={particularmatter10Loadingdb}
        name="PM 10"
        unit="μg/m3"
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
          <Tab eventKey="about" title="About PM 10">
            <Card>
              <Card.Body>
                <Card.Title>The Big Particular Matter</Card.Title>
                <Card.Text>
                Dusts are solid particles of outdoor air that do not immediately 
                sink to the ground, but remain in the atmosphere for a certain time. 
                Dust particles are divided into different classes according to their 
                size. Particulate matter (PM10) is defined as particles with an 
                aerodynamic diameter of less than 10 micrometers (µm). Of these particles, 
                a fraction has an aerodynamic diameter smaller than 2.5 µm (PM2.5). This 
                also includes the fraction of ultrafine particles (less than 0.1µm).
                </Card.Text>
              </Card.Body>
            </Card>
          </Tab>
          <Tab eventKey="limits" title="Limits">
            <Card>
              <Card.Body>
                <Card.Text>
                Above <b>25 μg/m3: </b>They enter the lungs through the nose and mouth, where 
                they can be transported to the main bronchi or alveoli, depending on their size.{" "}
                  <br />
                  <b>50 μg/m3: </b>Increasing amount of particulate matter can enter the lungs and cause 
                  long-term damage. Leave area immediately or protect mouth and nose.
                </Card.Text>
              </Card.Body>
            </Card>
          </Tab>
          <Tab eventKey="health" title="Health Impact">
            <Card>
              <Card.Body>
                <Card.Title>Respiratory Blockage</Card.Title>
                <Card.Text>
                Particulate matter thus consists of a complex mixture of solid and liquid 
                particles and is divided into different fractions. PM10 has a maximum 
                diameter of 10 µm and can penetrate the nasal cavity in humans.
                Depending on the size and penetration depth of the particles, the health effects 
                of particulate matter vary. They range from mucosal irritation and local inflammation 
                in the trachea and bronchi or pulmonary alveoli to increased plaque formation in the 
                blood vessels, an increased tendency to thrombosis, or changes in the regulatory 
                function of the autonomic nervous system (heart rate variability).
                </Card.Text>
              </Card.Body>
            </Card>
          </Tab>
        </Tabs>
      </Container>
      <hr />
      <HistoryTable
        blockchainData={[]}
        databaseData={particularmatter10Eventdb}
        loading={particularmatter10Loadingdb}
        lowerLimit={lowerEmissionLimit}
        higherLimit={higherEmissionLimit}
      />
    </>
  );
}

export default ParticularMatter10;
