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
                <Card.Title>Getting hot</Card.Title>
                <Card.Text>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Labore animi distinctio libero quia repellat porro ratione
                  exercitationem, fugiat voluptatem asperiores.
                </Card.Text>
              </Card.Body>
            </Card>
          </Tab>
          <Tab eventKey="limits" title="Limits">
            <Card>
              <Card.Body>
                <Card.Title>Most regulated</Card.Title>
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
                <Card.Title>Danger in closed Rooms</Card.Title>
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
        data={temperatureEventsTable}
        loading={temperatureLoading}
        lowerLimit={lowerEmissionLimit}
        higherLimit={higherEmissionLimit}
      />
    </>
  );
}
export default Temperature;
