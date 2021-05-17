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
      <Jumbotron fluid className="jumbopm2">
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
                <Card.Title>The Small Particular Matter</Card.Title>
                <Card.Text>
                Dusts are solid particles of outdoor air that do not immediately 
                sink to the ground, but remain in the atmosphere for a certain time. 
                Dust particles are divided into different classes according to their 
                size. Particulate matter (PM10) is defined as particles with an 
                aerodynamic diameter of less than 10 micrometers (µm). Of these particles, 
                a fraction has an aerodynamic diameter smaller than 2.5 µm (PM2.5). This 
                also includes the fraction of ultrafine particles (less than 0.1 µm).
                </Card.Text>
              </Card.Body>
            </Card>
          </Tab>
          <Tab eventKey="limits" title="Limits">
            <Card>
              <Card.Body>
                <Card.Title>M</Card.Title>
                <Card.Text>
                The World Health Organization (WHO) has set a limit of 20 μg/m3 
                annual mean and a 24-hour mean of <b>50 μg/m3</b>.  
                </Card.Text>
              </Card.Body>
            </Card>
          </Tab>
          <Tab eventKey="health" title="Health-Impact">
            <Card>
              <Card.Body>
                <Card.Title>D</Card.Title>
                <Card.Text>
                PM2.5 has a maximum diameter of 2.5 µm and can penetrate into 
                the bronchi and alveoli. Ultrafine particles with a diameter of less than 0.1 µm 
                can penetrate as far as the lung tissue and even the bloodstream.
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
        databaseData={particularmatter2Eventdb}
        loading={particularmatter2Loadingdb}
        lowerLimit={lowerEmissionLimit}
        higherLimit={higherEmissionLimit}
      />
    </>
  );
}

export default ParticularMatter2;
