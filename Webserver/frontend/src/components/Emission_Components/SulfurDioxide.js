import React, { useState } from "react";
import { Jumbotron, Container, Tabs, Tab, Card } from "react-bootstrap";

import { useGlobalContext } from "../../context";
import "./emissions.css";

import HistoryTable from "../Core_components/HistoryTable";
import HistoryGraph from "../Core_components/HistoryGraph";
import CertificateBanner from "../Core_components/CertificateBanner";

function SulfurDioxide() {
  const { sulfurdioxideLoadingdb, sulfurdioxideEventdb, sulfurdioxideLoading } = useGlobalContext();
  const [key, setKey] = useState("about");

  const lowerEmissionLimit = 10;
  const higherEmissionLimit = 20;

  return (
    <>
      <Jumbotron fluid className="jumboso2">
        <div className="overlay "> </div>
        <Container className="d-none d-lg-block">
          <h1>Sulfur Dioxide (SO2)</h1>
          <p>Find verified information about all measured SO2 emissions!</p>
        </Container>
      </Jumbotron>
      <CertificateBanner
        data={[0,0]}
        limit={higherEmissionLimit}
        loading={sulfurdioxideLoading}
      />
      <hr />
      <HistoryGraph
        blockchainData={[]}
        databaseData={sulfurdioxideEventdb}
        loading={sulfurdioxideLoadingdb}
        name="SO2"
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
          <Tab eventKey="about" title="About SO2">
            <Card>
              <Card.Body>
                <Card.Title>The Environment And Human Health Harmful Gas</Card.Title>
                <Card.Text>
                SO2 is a colorless gas with a pungent odor. It is produced during the combustion 
                of fossil fuels (coal and oil) and during the smelting of mineral ores containing 
                sulfur. The main anthropogenic source of SO2 is the combustion of sulfur-containing 
                fossil fuels for domestic heating, electricity generation, and motor vehicles.
                </Card.Text>
              </Card.Body>
            </Card>
          </Tab>
          <Tab eventKey="limits" title="Limits">
            <Card>
              <Card.Body>
                <Card.Text>
                Above <b>10 μg/m3: </b>Heavy coughing and irritation to the eyes{" "}
                  <br />
                  <b>20 μg/m3: </b>Painful conjunctivitis, increased nasal secretions, 
                  cough and increased expectoration (sputum). Leave area immediately or remove contaminants.
                </Card.Text>
              </Card.Body>
            </Card>
          </Tab>
          <Tab eventKey="health" title="Health Impact">
            <Card>
              <Card.Body>
                <Card.Title>The Acid Rain Creator</Card.Title>
                <Card.Text>
                SO2 can affect the respiratory tract and the functions of the lungs, 
                and causes irritation to the eyes. Inflammation of the respiratory 
                tract causes coughing, mucus secretion, aggravation of asthma and chronic 
                bronchitis, and makes people more susceptible to respiratory infections. 
                Hospitalizations for heart disease and mortality rates increase on days 
                with higher SO2 levels. When SO2 combines with water, it forms sulfuric acid; 
                this is the main component of acid rain, which is a cause of deforestation.
                </Card.Text>
              </Card.Body>
            </Card>
          </Tab>
        </Tabs>
      </Container>
      <hr />
      <HistoryTable
        blockchainData={[]}
        databaseData={sulfurdioxideEventdb}
        loading={sulfurdioxideLoadingdb}
        lowerLimit={lowerEmissionLimit}
        higherLimit={higherEmissionLimit}
      />
    </>
  );
}

export default SulfurDioxide;
