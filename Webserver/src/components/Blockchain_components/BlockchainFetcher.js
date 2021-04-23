import { React, useState, useEffect } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import Button from "react-bootstrap/Button";

const Web3 = require("web3");

function BlockchainFetcher({ name, unit, build }) {
  const [events, setEvents] = useState([]);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);

  const fetchEvents = async (build) => {
    try {
      const web3 = new Web3("ws://192.168.1.88:7545");
      const id = await web3.eth.net.getId();
      const contractInstance = new web3.eth.Contract(
        build.abi,
        build.networks[id].address
      );
      contractInstance
        .getPastEvents("allEvents", {
          fromBlock: 20,
          toBlock: "latest",
        })
        .then((pastEvents) => {
          const formatedEvents = pastEvents.map((event) => {
            const timevalue = new Date(event.returnValues.timestamp).getTime();
            const value = parseInt(event.returnValues.measurement);
            const varyValue = Math.random() * value;
            const newValue = [timevalue + 7200000, varyValue];
            return newValue;
          });
          setEvents(formatedEvents);
          console.log("fetching completed");
          setShow(true);
        });
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    fetchEvents(build);
    return () => {
      //cleanup
    };
  }, [build]);

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
        data: events,
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
      <h1>{name} Page</h1>
      <div>
        {error ? (
          <div className="loading">
            <h1> Sorry no blockchain connection possible...</h1>
          </div>
        ) : show ? (
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
        <Button variant="info" onClick={() => console.log(events)}>
          Log values to console
        </Button>
      </div>
    </div>
  );
}

export default BlockchainFetcher;
