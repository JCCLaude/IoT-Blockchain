import React, { useState, useEffect } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import { Container, Spinner, Alert } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";

function HistoryGraph({
  blockchainData,
  databaseData,
  unit,
  name,
  loading,
  lowerLimit,
  higherLimit,
}) {
  const [databaseDataFormated, setDatabaseDataFormated] = useState([]);
  const [formatLoading, setFormatLoading] = useState(true);
  const formatDatabase = (dbEvents) => {
    if (typeof dbEvents !== "undefined") {
      const newData = [];
      for (let i = 0; i < dbEvents.timestamp.length; i++) {
        const formatedDate = new Date(dbEvents.timestamp[i]).getTime();
        newData.push([formatedDate, dbEvents.measurement[i]]);
      }
      setDatabaseDataFormated(newData);
      setFormatLoading(false);
    }
  };

  useEffect(() => {
    formatDatabase(databaseData);
  }, [databaseData]);

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
    tooltip: {
      formatter: function () {
        return (
          "<b>" +
          new Date(this.x) +
          "</b>" +
          "</br>" +
          (this.points.length === 1
            ? `${name} (${unit}): ` +
              this.points[0].y +
              "<br /> Blockchain confirmed: " +
              "✖"
            : `${name} (${unit}): ` +
              this.points[0].y +
              "<br /> Blockchain confirmed: " +
              "✔")
        );
      },
      shared: true,
    },
    credits: {
      text: "made with ❤ by Johannes and Alex",
    },
    series: [
      {
        name: `${name} (${unit})`,
        data: databaseDataFormated,
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
        states: {
          inactive: {
            opacity: 1,
          },
        },
      },
      {
        name: "test values",
        data: blockchainData,
        type: "line",
        lineWidth: 0,
        states: {
          hover: {
            lineWidthPlus: 0,
            lineWidth: 0,
          },
        },
      },
    ],
  };

  return (
    <Container className="text-center">
      <h1>Check history data as a chart</h1>

      {formatLoading ? (
        <Spinner animation="border" />
      ) : (
        <Container>
          <Alert variant="info">
            {" "}
            <FaInfoCircle /> Select an area in the chart to zoom in
          </Alert>
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
            constructorType={"chart"}
          />
          <br />
        </Container>
      )}
      <br />
    </Container>
  );
}

export default HistoryGraph;
