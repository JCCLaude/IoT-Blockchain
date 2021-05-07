import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Container, Button, Row, Col, Modal, Table } from "react-bootstrap";

function HistoryTable({ data, loading, lowerLimit, higherLimit }) {
  const [show, setShow] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const filterData = (startDate, endDate) => {
    const displayData = data.filter(
      (item) => startDate.getTime() <= item[0] && item[0] <= endDate.getTime()
    );
    console.log(startDate.getTime(), endDate.getTime(), "test:", displayData);
    setTableData(displayData);
    setShow(true);
  };

  const checkValueArea = (lowerLimit, higherLimit, value) => {
    if (value >= higherLimit) {
      return "extreme";
    }
    if (value >= lowerLimit) {
      return "medium";
    }
    return "low";
  };

  const formatDate = (timestamp) => {
    var date = new Date(timestamp);
    return (
      date.getDate() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds()
    );
  };

  return (
    <Container className="text-center">
      <Container>
        <h1>Check for history data</h1>
        <p>
          To get a precise view of measured historic values, please select a
          date-range from the datepicker below. Afterwards smash the "submit"
          button to get a detailed list of all measured values
        </p>
      </Container>
      <Container className="dateselector">
        <Row>
          <Col sm={6} className="text-sm-right">
            <p>Please select a start Date:</p>
          </Col>
          <Col sm={6} className="text-sm-left">
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={6} className="text-sm-right">
            <p>Please select an end date:</p>
          </Col>
          <Col sm={6} className="text-sm-left">
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
          </Col>
        </Row>
        <Button
          variant="danger"
          onClick={() => filterData(startDate, endDate)}
          className="dateselector-button"
        >
          Check timespan
        </Button>
      </Container>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="value-modal"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Measured Values for your daterange:
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <h3>Loading...</h3>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Measured Value</th>
                  <th>Geolocation</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((item) => {
                  return (
                    <tr key={item[0]}>
                      <td>{formatDate(item[0])}</td>
                      <td
                        className={`${checkValueArea(
                          lowerLimit,
                          higherLimit,
                          item[1]
                        )}`}
                      >
                        {item[1]}
                      </td>
                      <td>{item[2]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
          <Button onClick={() => console.log(data[0][0])}>log</Button>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default HistoryTable;
