import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import { Container, Button, Spinner } from "react-bootstrap";

function HistoryGraph({ data, unit, name, loading, lowerLimit, higherLimit }) {
  const options = {
    chart: {
      type: "spline",
      zoomType: "x",
    },
    title: {
      text: `All ${name} values (${unit})`,
    },
    xAxis: {
      title: {
        text: "Time of measurement",
      },
      type: "datetime",
    },
    yAxis: {
      title: {
        text: "Measured Values",
      },
    },
    credits: {
      text: "made with ❤ by Johannes",
    },
    series: [
      {
        name: `${name} (${unit})`,
        data: data,
        zones: [
          {
            value: lowerLimit,
            color: "#008000",
          },
          {
            value: higherLimit,
            color: "#ffa500",
          },
          {
            color: "#ff0000",
          },
        ],
      },
    ],
  };

  return (
    <Container className="text-center">
      <h1>Check history data as a chart</h1>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Container>
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
            constructorType={"chart"}
          />
          <br />
          <Button variant="info" onClick={() => console.log(data)}>
            Log values to console
          </Button>
        </Container>
      )}
      <br />
    </Container>
  );
}

export default HistoryGraph;
