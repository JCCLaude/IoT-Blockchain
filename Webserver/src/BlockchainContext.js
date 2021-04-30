import React, { useState, useContext, useEffect } from "react";

const Web3 = require("web3");
const CO2Build = require("./assets/ethereumBuilds/CO2_Alarming.json");
const TemperatureBuild = require("./assets/ethereumBuilds/Temperature_Alarming.json");
const HumidityBuild = require("./assets/ethereumBuilds/Humidity_Alarming.json");

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [error, setError] = useState(false);
  const [co2Loading, setCo2Loading] = useState(true);
  const [co2Events, setCo2Events] = useState([{ returnValues: "" }]);
  const [co2EventsTable, setCo2EventsTable] = useState([]);
  const [co2EventsChart, setCo2EventsChart] = useState([]);
  const [humidityLoading, setHumidityLoading] = useState(true);
  const [humidityEvents, setHumidityEvents] = useState([{ returnValues: "" }]);
  const [humidityEventsTable, setHumidityEventsTable] = useState([]);
  const [humidityEventsChart, setHumidityEventsChart] = useState([]);
  const [temperatureLoading, setTemperatureLoading] = useState(true);
  const [temperatureEvents, setTemperatureEvents] = useState([
    { returnValues: "" },
  ]);
  const [temperatureEventsTable, setTemperatureEventsTable] = useState([]);
  const [temperatureEventsChart, setTemperatureEventsChart] = useState([]);

  const formatEventsToChart = (events) => {
    const timeAndMeasurement = events.map((event) => {
      const timevalue =
        new Date(event.returnValues.timestamp).getTime() + 7200000;
      const value = parseInt(event.returnValues.measurement);
      const varyValue = Math.random() * value;
      return [timevalue, varyValue];
    });
    return timeAndMeasurement;
  };

  const formatEventsToTable = (events) => {
    const timeMeasurementLocation = events.map((event) => {
      const timevalue =
        new Date(event.returnValues.timestamp).getTime() + 7200000;
      const value = parseInt(event.returnValues.measurement);
      const varyValue = Math.random() * value;
      const location = event.returnValues.geolocation;
      return [timevalue, varyValue, location];
    });
    return timeMeasurementLocation;
  };

  const fetchEvents = async () => {
    try {
      const web3 = new Web3("ws://192.168.1.88:7545");
      const id = await web3.eth.net.getId();
      const co2Contract = new web3.eth.Contract(
        CO2Build.abi,
        CO2Build.networks[id].address
      );
      const humidityContract = new web3.eth.Contract(
        HumidityBuild.abi,
        HumidityBuild.networks[id].address
      );
      const temperatureContract = new web3.eth.Contract(
        TemperatureBuild.abi,
        TemperatureBuild.networks[id].address
      );
      co2Contract
        .getPastEvents("allEvents", {
          fromBlock: 30,
          toBlock: "latest",
        })
        .then((events) => {
          setCo2Events(events);
          setCo2EventsChart(formatEventsToChart(events));
          setCo2EventsTable(formatEventsToTable(events));
          setCo2Loading(false);
        });
      humidityContract
        .getPastEvents("allEvents", {
          fromBlock: 30,
          toBlock: "latest",
        })
        .then((events) => {
          setHumidityEvents(events);
          setHumidityEventsChart(formatEventsToChart(events));
          setHumidityEventsTable(formatEventsToTable(events));
          setHumidityLoading(false);
        });
      temperatureContract
        .getPastEvents("allEvents", {
          fromBlock: 30,
          toBlock: "latest",
        })
        .then((events) => {
          setTemperatureEvents(events);
          setTemperatureEventsChart(formatEventsToChart(events));
          setTemperatureEventsTable(formatEventsToTable(events));
          setTemperatureLoading(false);
        });
    } catch (error) {
      console.log("No blockchain connection possible", error);
      setError(true);
    }
  };

  useEffect(() => {
    fetchEvents();
    return () => {
      //cleanup
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        error: error,
        co2Loading: co2Loading,
        co2Events: co2Events,
        co2EventsChart: co2EventsChart,
        co2EventsTable: co2EventsTable,
        humidityLoading: humidityLoading,
        humidityEvents: humidityEvents,
        humidityEventsChart: humidityEventsChart,
        humidityEventsTable: humidityEventsTable,
        temperatureLoading: temperatureLoading,
        temperatureEvents: temperatureEvents,
        temperatureEventsChart: temperatureEventsChart,
        temperatureEventsTable: temperatureEventsTable,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
