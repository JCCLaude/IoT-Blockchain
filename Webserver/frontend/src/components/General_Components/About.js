import React from "react";
import { Container, Card, CardGroup, Jumbotron } from "react-bootstrap";
import Overview_structure from "../../assets/images/Overview_structure.png";
import columbia_logo from "../../assets/images/Columbia_logo.png";
import unibw_logo from "../../assets/images/unibw_logo.png";

function About() {
  return (
    <>
    <Jumbotron fluid className="jumbo">
        <div className="overlay "> </div>
        <Container className="d-none d-lg-block">
          <h1>About</h1>
          <p>Get an insight into the background and development of IBES!</p>
        </Container>
      </Jumbotron>
    <Container>
      <p>Here you can find a picture of the design of IBES along with the explanation of the picture below. 
        There is also a detailed explanation of the project at the very bottom. 
        This project was developed as part of two master's theses by Alexander Nußbaum and Johannes Schütte 
        from the University of the Federal Armed Forces Munich in cooperation with Columbia University in the City of New York.
      </p>
    <div className="flex-container">
          <img
            class="img-fluid"
            id="overview_structure"
            src={Overview_structure}
            alt=""
          ></img>
        </div>
        <CardGroup>
          <Card border="dark" bg="secondary" style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>
                <b>IBES</b>
              </Card.Title>
              <Card.Text>
                The <b>IBES</b> uses IoT sensors that measure emissions from{" "}
                <b>powerplant</b> or industrial sites and store this data
                securely through <b>blockchain</b> technology. This data is then
                made freely available to anyone on the Internet on a{" "}
                <b>website</b>.{" "}
              </Card.Text>
            </Card.Body>
          </Card>
          <br />

          <Card border="dark" bg="secondary" style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>
                <b>Powerplant</b>
              </Card.Title>
              <Card.Text>
                The <b>powerplant</b> emits emissions whose actual values are
                not immediately accessible to everyone. We would like to use
                IBES to check whether these emissions actually remain below the
                legal limits.
              </Card.Text>
            </Card.Body>
          </Card>
          <br />

          <Card border="dark" bg="secondary" style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>
                <b>IoT sensors</b>
              </Card.Title>
              <Card.Text>
                The <b>IoT sensors</b> measure different emissions such as
                greenhouse gases, which are harmful to our climate and health.
                The IoT sensors are placed directly at the power plant itself
                and at the surrounding <b>Villages</b> to get the most realistic
                overall impression of the emissions.
              </Card.Text>
            </Card.Body>
          </Card>
          <br />

          <Card border="dark" bg="secondary" style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>
                <b>Website</b>
              </Card.Title>
              <Card.Text>
                The data in the blockchain can be viewed by anyone at any time
                on the IBES <b>website on their computer or mobile phone</b> on
                the Internet. Here, all collected data is listed both
                graphically and in tabular form.
              </Card.Text>
            </Card.Body>
          </Card>
          <br />
        </CardGroup>
        <br></br> <br></br>
        <Card border="dark">
          <Card.Body>
            <Card.Title>
              <b>About IBES</b>
            </Card.Title>
            <Card.Text>
              This project is designed to securely and independently measure
              greenhouse gas emissions from power plants and industrial areas,
              and to ensure compliance with legally mandated emission limits
              using IoT and blockchain technology. For this purpose, IoT sensors
              will be attached 1. directly to power plants themselves and 2. to
              houses in the immediate vicinity, which will measure various
              emissions. These values are then stored in a database and
              displayed on this website here. If a value exceeds a legally
              specified emission limit, this measurement is stored in a
              blockchain, where the entry is visible to everyone at all times
              and can no longer be changed. In this way, transparency of the
              actual emission values of the power plants and a resulting trust
              in the power plant operators that the environmental regulations
              are being complied with should be established. Greenhouse gases
              are responsible for climate change and damage both our environment
              and the health of all humans and animals, which is why we as
              humans should take good care to adhere to emission limits.
            </Card.Text>
          </Card.Body>
        </Card>
        <br />
        <p>
        <b>Developer:</b><br></br>
        Alexander Nußbaum (alexander.nussbaum@unibw.de): Department of Computer Science, Universität der Bundeswehr München, Munich, Germany <br></br>
        Johannes Schütte (johannes.schuette@unibw.de): Department of Computer Science, Universität der Bundeswehr München, Munich, Germany <br></br>
        
        <br></br><br></br>

        <b>Advisor:</b><br></br>
        Luoyao Hao: Department of Computer Science, Columbia University, New York, USA<br></br>
        Michael Fröhlich: Department of Computer Science, Universität der Bundeswehr München, Munich, Germany <br></br>
        Florian Alt: Department of Computer Science, Universität der Bundeswehr München, Munich, Germany <br></br>
        Henning Schulzrinne: Department of Computer Science, Columbia University, New York, USA<br></br>
        </p>

        <br></br>

    <Container className="text-center">
          <div>
              <a href="https://www.unibw.de/" target="_blank" rel="noopener noreferrer">
                <img src={unibw_logo} width="330" height="80" alt="UniBwM" id="unibw"></img>
              </a>
              <a href="https://www.columbia.edu/" target="_blank" rel="noopener noreferrer">
                <img src={columbia_logo} width="280" height="140" alt="CU" id="cu"></img>
              </a>
          </div>
          </Container>


      </Container>
      </>
  )
}

export default About;
