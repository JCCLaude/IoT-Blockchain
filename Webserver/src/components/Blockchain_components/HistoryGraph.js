import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import { Container, Button } from "react-bootstrap";

function HistoryGraph({ data, unit, name }) {
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
            value: 10,
            color: "#00ff00",
          },
          {
            value: 15,
            color: "#ffff00",
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
      <br />
    </Container>
  );
}

export default HistoryGraph;
