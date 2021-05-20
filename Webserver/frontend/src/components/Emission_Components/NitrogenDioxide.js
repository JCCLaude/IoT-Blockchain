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

  const lowerEmissionLimit = 100;
  const higherEmissionLimit = 200;

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
          <Tab eventKey="about" title="About NO2">
            <Card>
              <Card.Body>
                <Card.Title>The Highly Toxic Gas</Card.Title>
                <Card.Text>
                Nitrogen  dioxide  is  an  important  atmospheric  trace  gas,  not  only  because  
                of  its  health  effects  but  also  because it  absorbs  visible  solar  radiation  
                and  contributes  to  impaired  atmospheric  visibility and because as an absorber 
                of visible radiation it could have a potential direct role in global climate change 
                if its  concentrations  were  to  become  high  enough.
                </Card.Text>
              </Card.Body>
            </Card>
          </Tab>
          <Tab eventKey="limits" title="Limits">
            <Card>
              <Card.Body>
                <Card.Text>
                Above <b>100 μg/m3: </b>Shortness of breath, cough{" "}
                  <br />
                  <b>200 μg/m3: </b>At high NO2 concentrations, more people are hospitalized 
                  with respiratory and lung diseases, as well as cardiovascular diseases 
                  (for example, asthma, heart attacks and strokes). An increase in mortality 
                  can also be observed.
                </Card.Text>
              </Card.Body>
            </Card>
          </Tab>
          <Tab eventKey="health" title="Health Impact">
            <Card>
              <Card.Body>
                <Card.Title>A Gas With Significant Health Risk </Card.Title>
                <Card.Text>
                Air pollutants are absorbed with the air we breathe and develop 
                their adverse effects in the respiratory tract. NO2 hardly reacts 
                with the mucous membrane of the upper respiratory tract, but rather 
                damages the tissues in the bronchi and alveoli. This is particularly 
                problematic in pre-damaged airways, as bronchial constriction or inflammation 
                can occur.
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
