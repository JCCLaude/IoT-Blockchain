import React, { useState } from "react";
import { Jumbotron, Container, Tabs, Tab, Card } from "react-bootstrap";

import { useGlobalContext } from "../../context";

import HistoryGraph from "../Core_components/HistoryGraph";
import HistoryTable from "../Core_components/HistoryTable";
import AlarmBanner from "../Core_components/CertificateBanner";

function Humidity() {
  const {
    humidityLoading,
    humidityEventsChart,
    humidityEventsTable,
    airhumidityEventdb,
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
      <AlarmBanner
        data={humidityEventsChart}
        limit={lowerEmissionLimit}
        loading={humidityLoading}
      />
      <hr />
      <HistoryGraph
        blockchainData={humidityEventsChart}
        databaseData={airhumidityEventdb}
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
        blockchainData={humidityEventsTable}
        databaseData={airhumidityEventdb}
        loading={humidityLoading}
        lowerLimit={lowerEmissionLimit}
        higherLimit={higherEmissionLimit}
      />
    </>
  );
}
export default Humidity;
