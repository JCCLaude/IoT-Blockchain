import React from "react";
import { Container, Card, Jumbotron } from "react-bootstrap";

function OtherEmissions() {
  return (
    <>
    <Jumbotron fluid className="jumbo">
        <div className="overlay "> </div>
        <Container className="d-none d-lg-block">
          <h1>Other Emissions</h1>
          <p>Get an insight into the selection of the other emission gases!</p>
        </Container>
      </Jumbotron>
    <Container>
      <p>
      Here it is explained why which gases were selected and measured in the IBES.
      </p>
    <br></br>
      
        <Card border="dark">
          <Card.Body>
            <Card.Title>
              <b>The selection of gases</b>
            </Card.Title>
            <Card.Text>
              This project serves on the one hand to verify the emission values of 
              <b> greenhouse gases</b> from industrial areas and power plants, and on the other hand 
              the protection of <b>human health</b> by measuring air pollutants.
              <br></br><br></br>
              Carbon dioxide was chosen as a representative of the <b>greenhouse gases</b> defined by 
              the <a href={"https://unfccc.int/kyoto_protocol"} target="_blank" rel="noopener noreferrer">Kyoto Protocol</a>, 
              as it is probably the best known as well as the most widespread 
              environmentally harmful substance. Later, the other greenhouse gases could certainly 
              be added to the IBES, including methane (CH4), nitrous oxide (laughing gas, N2O), 
              hydrofluorocarbons (HFCs/HFCs), perfluorocarbons (PFCs/PFCs) and sulfur hexafluoride (SF6).
              <br></br><br></br>
              The substances most classified as harmful to <b>human health</b> by the 
              <a href={"https://www.who.int/"} target="_blank" rel="noopener noreferrer"> World Health Organization (WHO) </a>
              are the "other emissions" values described in IBES: Nitrogen Dioxdie (NO2), Particular 
              Matter 2.5 and 10, and Sulfur Dioxide (SO2). These substances have been scientifically proven 
              by the WHO to be responsible for numerous human illnesses and deaths, so regulating them should 
              be a top priority. 
              <br></br><br></br>
              For development reasons, we have also included the values of temperature and humidity in the 
              project, as we were able to measure real-time data here with a sensor. According to the WHO, these 
              values can be harmful to human health if they are too high or too low. 
              Furthermore, the measurement accuracy of emission measurement sensors such as for CO2, SO2 or 
              NO2 depends on the conditions such as humidity and temperature, which is why these values can 
              therefore also provide information about the measurement accuracy of the placed sensors. 
            </Card.Text>
          </Card.Body>
        </Card>

      </Container>
      </>
  )
}

export default OtherEmissions;
