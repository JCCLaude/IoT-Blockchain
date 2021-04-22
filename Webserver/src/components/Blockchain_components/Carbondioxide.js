import { React, useState, useEffect } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import Button from "react-bootstrap/Button";

const Web3 = require("web3");
const CO2Build = require("./assets/ethereumBuilds/CO2_Alarming.json");

function Carbondioxide() {
  const [co2Events, setCo2Event] = useState([]);
  const [show, setShow] = useState(false);
  useEffect(() => {
    fetchEvents();
    return () => {
      //cleanup
    };
  }, []);

  const fetchEvents = async () => {
    const allEvents = co2Events;
    const web3 = new Web3("ws://192.168.1.88:7545");
    const id = await web3.eth.net.getId();
    const co2Contract = new web3.eth.Contract(
      CO2Build.abi,
      CO2Build.networks[id].address
    );
    co2Contract
      .getPastEvents("allEvents", {
        fromBlock: 20,
        toBlock: "latest",
      })
      .then((events) => {
        events.map((event) => {
          const timevalue = new Date(event.returnValues.timestamp).getTime();
          const value = parseInt(event.returnValues.measurement);
          const varyValue = Math.random() * value;
          const newValue = [timevalue + 7200000, varyValue];
          allEvents.push(newValue);
          return 1;
        });
      })
      .then(() => {
        setCo2Event(allEvents);
        console.log("complete");
        setShow(true);
      });
  };

  const options = {
    chart: {
      type: "spline",
      zoomType: "x",
    },
    title: {
      text: "CO2 values",
    },
    xAxis: {
      title: {
        text: "Time of measurement",
      },
      type: "datetime",
    },
    yAxis: {
      title: {
        text: "CO2 Emissions in ppm",
      },
    },
    credits: {
      text: "made with ❤ by Johannes",
    },
    series: [
      {
        name: "CO2 Emissions",
        data: co2Events,
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
    <div className="container text-center">
      <h1>Carbondioxide Page</h1>
      <div>
        {show ? (
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
            constructorType={"chart"}
          />
        ) : (
          <div className="loading">
            <h1> Loading...</h1>
          </div>
        )}
        <br />
        <Button variant="info" onClick={() => console.log(co2Events)}>
          Log values to console
        </Button>
      </div>
    </div>
  );
}

export default Carbondioxide;
