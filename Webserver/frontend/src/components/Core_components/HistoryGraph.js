import React, { useState, useEffect } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import { Container, Spinner, Alert } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

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
        const formatedDate = dbEvents.timestamp[i];
        var a = formatedDate.split(/[^0-9]/);
        var d = new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
        console.log(a, d, formatedDate);
        newData.push([d.getTime(), dbEvents.measurement[i]]);
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
      plotLines: [
        {
          value: higherLimit,
          color: "red",
          dashStyle: "shortdash",
          width: 2,
          label: {
            text: "Dangerous Limit " + higherLimit + unit,
          },
        },
        {
          value: lowerLimit,
          color: "orange",
          dashStyle: "shortdash",
          width: 2,
          label: {
            text: "Still acceptable Limit " + lowerLimit + unit,
          },
        },
      ],
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
      text: "made with ❤ by IBES",
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
        name: `Blockchain confirmed ${name} (${unit})`,
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
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
            constructorType={"stockChart"} //chart
          />
          <br />
          <Alert variant="info">
            <FaInfoCircle /> What does "verified by Blockchain" mean?{" "}
            <Link to="/blockchain">Find out more</Link>
          </Alert>
        </Container>
      )}
      <br />
    </Container>
  );
}

export default HistoryGraph;
