import { React, useState, useEffect } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import Button from "react-bootstrap/Button";

const Web3 = require("web3");
const TemperatureBuild = require("./assets/ethereumBuilds/Temperature_Alarming.json");

function Temperature() {
  const [temperatureEvents, setTemperatureEvents] = useState([]);
  const [show, setShow] = useState(false);
  useEffect(() => {
    fetchEvents();
    return () => {
      //cleanup
    };
  }, []);

  const fetchEvents = async () => {
    const allEvents = temperatureEvents;
    const web3 = new Web3("ws://192.168.1.88:7545");
    const id = await web3.eth.net.getId();
    const temperatureContract = new web3.eth.Contract(
      TemperatureBuild.abi,
      TemperatureBuild.networks[id].address
    );
    temperatureContract
      .getPastEvents("allEvents", {
        fromBlock: 20,
        toBlock: "latest",
      })
      .then((events) => {
        events.map((event) => {
          const timevalue = new Date(event.returnValues.timestamp).getTime();
          const value = parseInt(event.returnValues.measurement);
          const newValue = [timevalue + 7200000, value];
          allEvents.push(newValue);
          return 1;
        });
      })
      .then(() => {
        setTemperatureEvents(allEvents);
        console.log("loading complete");
        setShow(true);
      });
  };

  const options = {
    chart: {
      type: "spline",
      zoomType: "x",
    },
    title: {
      text: "Temperature values",
    },
    xAxis: {
      title: {
        text: "Time of measurement",
      },
      type: "datetime",
    },
    yAxis: {
      title: {
        text: "Temperature in °C",
      },
    },
    credits: {
      text: "made with ❤ by Johannes",
    },
    series: [
      {
        name: "Temperature",
        data: temperatureEvents,
        zones: [
          {
            value: 25,
            color: "#00ff00",
          },
          {
            value: 28,
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
      <h1>Temperature Page</h1>
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
        <Button variant="info" onClick={() => console.log(temperatureEvents)}>
          Log values to console
        </Button>
      </div>
    </div>
  );
}

export default Temperature;
