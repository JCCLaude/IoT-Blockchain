import { React, useState, useEffect } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import Button from "react-bootstrap/Button";

const Web3 = require("web3");
const HumidityBuild = require("./assets/ethereumBuilds/Humidity_Alarming.json");

function Humidity() {
  const [humidityEvents, setHumidityEvent] = useState([]);
  const [show, setShow] = useState(false);
  useEffect(() => {
    fetchEvents();
    return () => {
      //cleanup
    };
  }, []);

  const fetchEvents = async () => {
    const allEvents = humidityEvents;
    const web3 = new Web3("ws://192.168.1.88:7545");
    const id = await web3.eth.net.getId();
    const humidityContract = new web3.eth.Contract(
      HumidityBuild.abi,
      HumidityBuild.networks[id].address
    );
    humidityContract
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
        setHumidityEvent(allEvents);
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
      text: "Humidity values",
    },
    xAxis: {
      title: {
        text: "Time of measurement",
      },
      type: "datetime",
    },
    yAxis: {
      title: {
        text: "Air Humidity Values in %",
      },
    },
    credits: {
      text: "made with ❤ by Johannes",
    },
    series: [
      {
        name: "Airhumidity",
        data: humidityEvents,
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
      <h1>Humidity Page</h1>
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
        <Button variant="info" onClick={() => console.log(humidityEvents)}>
          Log values to console
        </Button>
      </div>
    </div>
  );
}

export default Humidity;
