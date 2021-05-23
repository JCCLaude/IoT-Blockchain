import React from "react";
import {
  Container,
  Jumbotron,
  Alert,
  Button,
  Row,
  Col,
  Accordion,
  Card,
  Image,
} from "react-bootstrap";
import {
  FaQuestionCircle,
  FaBullhorn,
  FaCheckDouble,
  FaFingerprint,
  FaQuoteLeft,
  FaQuoteRight,
  FaInfoCircle,
} from "react-icons/fa";
import "./BlockchainExplanation.css";

import singleBlockPicture from "../../assets/images/Explanation_1.jpg";
import twoBlocksPicture from "../../assets/images/Explanation_2.jpg";
import firstBlockchainPicture from "../../assets/images/Explanation_3.jpg";
import distributedLedgerPicture from "../../assets/images/Explanation_4.jpg";
import blockchainGIF from "../../assets/images/Blockchain_gif.gif";
import blockchainDialogue1 from "../../assets/images/Blockchain_Dialog.jpg";
import blockchainDialogue2 from "../../assets/images/Blockchain_Dialog2.jpg";
import blockchainDialogue3 from "../../assets/images/Blockchain_Dialog3.jpg";

function BlockchainExplanation() {
  return (
    <>
      <Jumbotron fluid className="jumbo-blockchain">
        <div className="overlay "> </div>
        <Container className="d-none d-lg-block" id="top">
          <h1>IBES and the Blockchain</h1>
          <p>
            Find out how we want to increase your trust in our data by using the
            blockchain
          </p>
        </Container>
      </Jumbotron>
      <Container>
        <h1>What is the blockchain doing here?</h1>
        <p>
          For some time now, you may have been hearing the word blockchain more
          and more often. Maybe you've heard it in connection with
          cryptocurrencies like Bitcoin. We also use a blockchain here, but not
          to make money with it. But what exactly is a blockchain and why do we
          use it at IBES? Here we explain how the blockchain works, what makes
          it so special and what advantages it brings for you here at IBES!
        </p>
        <Alert variant="info" className="text-center">
          <FaQuestionCircle /> You are no tecchie? Don´t worry, this will be
          easier than you migh think 🙃
          <h4>
            You can choose a section you are interested in or start just below
            this box:
          </h4>
          <Row>
            <Col sm>
              <Button variant="outline-dark" href="#basics">
                A simple Blockchain Explanation
              </Button>
            </Col>
            <Col sm>
              <Button variant="outline-dark" href="#advantages">
                The Advantages of using a blockchain
              </Button>
            </Col>
            <Col sm>
              <Button variant="outline-dark" href="#usage">
                How IBES uses the Blockchain
              </Button>
            </Col>
          </Row>
        </Alert>
      </Container>
      <br />
      <hr />
      <br />
      <Container id="basics">
        <h2>A simple blockchain explanation</h2>
        <p>
          The blockchain is a special way to store data. It is made up of
          blocks, which are all linked together
        </p>
        <Accordion>
          <Card>
            <Card.Header>
              <Accordion.Toggle
                eventKey="0"
                className="accordion-header"
                as={Button}
                variant="danger"
              >
                What´s a block?
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Card.Text>
                  You can think of a block as a container. It holds data and
                  some information to distinguish it from others. By using some
                  math, each block gets its own fingerprint and thus is unique.
                  Each block is the same size and can only hold a certain amount
                  of data. If there is a lot to store, you have to divide the
                  data into several blocks. What data you store is the same to
                  begin with... so why don't we use cute kittens for explanation
                  purposes?!
                </Card.Text>
                <Card.Img variant="bottom" src={singleBlockPicture} />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle
                eventKey="1"
                className="accordion-header"
                as={Button}
                variant="danger"
              >
                Making the chain
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <Card.Text>
                  After the first block has been created, further blocks can be
                  appended one after the other. Each new block contains the
                  unique fingerprint of its predecessor in addition to its own
                  data. Thus the individual blocks chain together to form a long
                  series. We have a Blockchain!
                </Card.Text>
                <Card.Img variant="bottom" src={twoBlocksPicture} />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle
                eventKey="2"
                className="accordion-header"
                as={Button}
                variant="danger"
              >
                No gaps in the chain
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="2">
              <Card.Body>
                <Card.Text>
                  Because each block indicates which block is its predecessor,
                  the correct sequence always can be found. But there is also
                  another point that will be important soon: If a block in the
                  chain is changed or deleted, the fact is noticed because the
                  stored fingerprint is no longer correct in the following
                  block.
                </Card.Text>
                <Card.Img variant="bottom" src={firstBlockchainPicture} />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Container>
      <br />
      <Container>
        <h4>Understood...</h4>
        <p>
          Okay, so in the blockchain there are blocks that are connected in a
          fixed order, but what is special now? I can attach data to the
          blockchain and if i change or delete something it will mess things up.
          But maybe I do not mind. I could life with some blocks not fitting to
          each other... Maybe you could! But this is where the next big part
          comes into play: the internet.
        </p>
        <Accordion>
          <Card>
            <Card.Header>
              <Accordion.Toggle
                eventKey="4"
                className="accordion-header"
                as={Button}
                variant="danger"
              >
                Sharing is caring
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="4">
              <Card.Body>
                <Card.Text>
                  With a blockchain, there is not just one owner, but many. They
                  all share the same blockchain and have it stored locally. This
                  is also called a "distributed ledger" because it contains
                  entries in the blocks like a ledger, but it is not in a single
                  place, but distributed among many.
                </Card.Text>
                <Card.Img variant="bottom" src={distributedLedgerPicture} />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle
                eventKey="5"
                className="accordion-header"
                as={Button}
                variant="danger"
              >
                Alice wants to add
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="5">
              <Card.Body>
                <Card.Text>
                  If someone, let's call her Alice, wants to make a change, she
                  must first inform everyone else. Everyone then checks that
                  Alice follows the two elementary rules: <br />
                  <b>
                    - She may only add new things to the end of the blockchain.
                    Not delete anything and not change anything that is already
                    in the blockchain. <br /> - Her block must correctly contain
                    which block is the predecessor and what is in it. <br />
                  </b>
                  Only then everybody agrees together and adds Alice's new block
                  to their stored version of the blockchain at the same time. If
                  Alice does not follow the rules, her block is not included and
                  the blockchain does not change at all.
                </Card.Text>
                <Card.Img variant="bottom" src={blockchainGIF} />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <br />
        Now we have a simple working blockchain. In reality, there is a bit more
        technology involved, but the take-away is this: <br />
        <b>
          - No blocks can be deleted or changed from the blockchain, only blocks
          can be added to the back of it <br /> - Because the blockchain is
          controlled and operated by many people at the same time, individuals
          cannot break the rules. <br />
        </b>
      </Container>
      <br />
      <hr />
      <br />
      <Container id="advantages">
        <h2>The Advantages of using a blockchain</h2>
        <p>
          All right, so the blockchain is a distributed specification, but what
          are the advantages of it now, and how does it all work at IBES? <br />{" "}
          In a blockchain, data is stored transparently and immutably. To
          understand why this is so revolutionary now, you have to understand
          how data is normally stored: in a central database. This means that
          the person who manages the database can also determine who stores what
          information in it and what data stays in it. He/she can change and
          delete data without consequences and if not controlled, it is not even
          noticed. Even if most operators probably do not have bad intentions,
          this problem can be completely eliminated with the blockchain,
          because:
        </p>
        <Row className="text-center">
          <Col sm>
            <h4 className="icon-header">
              ___
              <FaCheckDouble className="explanation-icon" />
              ___
            </h4>
            <h4>The blockchain is immutable</h4>
            <p>
              We remember: only data can be appended at the back. So once
              something is in the blockchain, it cannot be deleted. If someone
              wants to make changes to older blocks, they are prevented from
              doing so by the other participants in the blockchain.
            </p>
          </Col>
          <Col sm>
            <h4 className="icon-header">
              ___
              <FaFingerprint className="explanation-icon" />
              ___
            </h4>
            <h4>The blockchain is transparent</h4>
            <p>
              Anyone who wants can view the data of a public blockchain. Every
              single block. No one can prevent it
            </p>
          </Col>
          <Col sm>
            <h4 className="icon-header">
              ___
              <FaBullhorn className="explanation-icon" />
              ___
            </h4>
            <h4>The blockchain is extensive</h4>
            <p>
              While a database often only contains current values, the
              blockchain contains all the data that has ever been sent. So if
              there is current data, there is also the predecessor somewhere.
              And the predecessor.
            </p>
          </Col>
        </Row>
        <br />
        <h4>Understood...</h4>
        <p>
          There are also a few other advantages. For some things you have to go
          a bit deeper, and you won't become a crypto millionaire by any means,
          but for now you know the basics and your heads may already be smoking.
          If not, and you want to go even deeper, check out{" "}
          <a href="https://www.investopedia.com/terms/b/blockchain.asp">
            this article
          </a>{" "}
          . Otherwise, you can find out below how we use the advantages of the
          blockchain, and perhaps also a small catch in the whole thing... 😬{" "}
        </p>
      </Container>
      <br />
      <hr />
      <br />
      <Container id="usage">
        <h2>How IBES uses the Blockchain</h2>
        <p>
          At IBES, we take advantage of the blockchain to guarantee that the
          data we show you is actually true. However, we don't store cat
          pictures, but the measured values of environmental sensors. These
          sensors are connected to the internet and send their data to a
          database and to a publicly accessible database.
        </p>
        <FaQuoteLeft className="quote-icon" />
        <h5>Wait, the database can be changed by the operator, can't it?</h5>
        <FaQuoteRight className="quote-icon" /> <br /> <br />
        <p>
          That's right, that's why we compare the content of the central
          database with the content of the public blockchain. If it contains the
          same data, we show it to you on our website (e.g. in the graphs or
          tables).
        </p>
        <Row className="text-center dialogue-box">
          <Col sm className="dialogue-description">
            <Image src={blockchainDialogue1} fluid />
            <Image src={blockchainDialogue2} fluid />
            <p>
              <FaInfoCircle className="dialogue-box-icon" />
              In graphs you will find an entry when a value is shared by the
              blockchain or when not
            </p>
          </Col>
          <Col sm className="dialogue-description">
            <Image src={blockchainDialogue3} fluid />
            <p>
              <FaInfoCircle className="dialogue-box-icon" />
              In tables you will find a collumn with a checkmark, when a value
              can be found in the blockchain
            </p>
          </Col>
        </Row>
        <br />
        <h4>IBES hybrid setup</h4>
        <p>
          But then why don't we just use the blockchain and save on a database?
          Good question, the answer is now the big catch with the blockchain: it
          costs money and is slow. Each addition of a block costs a small amount
          of money, and because all the other participants in the blockchain
          have to agree to a new block being added, it can take a few seconds.
          Compared to a database, where sending data is free and takes fractions
          of a second, this is a real disadvantage. <br /> <br /> However, since
          we want to present you with a lot of data at IBES and also want to
          show that the data is really correct, we use the best of both worlds:
          the devices send all the data to the database and at irregular
          intervals to the blockchain. At IBES, you can then check whether the
          entries from the database match the blockchain to convince yourself
          that the values are correct.
        </p>
      </Container>
    </>
  );
}

export default BlockchainExplanation;
