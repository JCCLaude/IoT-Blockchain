import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

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
  const [temperatureEvents, setTemperatureEvents] = useState([{ returnValues: "" },]);
  const [temperatureEventsTable, setTemperatureEventsTable] = useState([]);
  const [temperatureEventsChart, setTemperatureEventsChart] = useState([]);

  const [nitrogendioxideEventsTable, setnitrogendioxideTable] = useState([]);
  const [nitrogendioxideEventsChart, setnitrogendioxideEventsChart] = useState([]);
  const [particularmatter2EventsTable, setparticularmatter2Table] = useState([]);
  const [particularmatter2EventsChart, setparticularmatter2EventsChart] = useState([]);
  const [particularmatter10EventsTable, setparticularmatter10Table] = useState([]);
  const [particularmatter10EventsChart, setparticularmatter10EventsChart] = useState([]);
  const [sulfurdioxideEventsTable, setsulfurdioxideTable] = useState([]);
  const [sulfurdioxideEventsChart, setsulfurdioxideEventsChart] = useState([]);

  const [errordb, setErrordb] = useState(false);
  const [co2Eventdb, setCo2Eventdb] = useState();
  const [co2Loadingdb, setCo2Loadingdb] = useState(true);
  const [airhumidityEventdb, setAirHumidityEventdb] = useState();
  const [airhumidityLoadingdb, setAirHumidityLoadingdb] = useState(true);
  const [temperatureEventdb, setTemperatureEventdb] = useState();
  const [temperatureLoadingdb, setTemperatureLoadingdb] = useState(true);
  const [nitrogendioxideEventdb, setNitrogenDioxideEventdb] = useState();
  const [nitrogendioxideLoadingdb, setNitrogenDioxideLoadingdb] = useState(true);
  const [particularmatter2Eventdb, setParticularMatter2Eventdb] = useState();
  const [particularmatter2Loadingdb, setParticularMatter2Loadingdb] = useState(true);
  const [particularmatter10Eventdb, setParticularMatter10Eventdb] = useState();
  const [particularmatter10Loadingdb, setParticularMatter10Loadingdb] = useState(true);
  const [sulfurdioxideEventdb, setSulfurDioxideEventdb] = useState();
  const [sulfurdioxideLoadingdb, setSulfurDioxideLoadingdb] = useState(true);

  const formatEventsToChart = (events) => {
    const timeAndMeasurement = events.map((event) => {
      const timevalue =
        new Date(event.returnValues.timestamp).getTime() + 7200000;
      const value = parseInt(event.returnValues.measurement);
      return [timevalue, value];
    });
    return timeAndMeasurement;
  };

  const formatEventsToTable = (events) => {
    const timeMeasurementLocation = events.map((event) => {
      const timevalue =
        new Date(event.returnValues.timestamp).getTime() + 7200000;
      const value = parseInt(event.returnValues.measurement);
      const location = event.returnValues.geolocation;
      return [timevalue, value, location];
    });
    return timeMeasurementLocation;
  };

  const fetchEvents = async () => {
    try {
      axios
        .get("http://localhost:5000/co/")
        .then((response) => {
          var co = response.data;
          var covals = co.map(function (item) {
            return item["coval"];
          });
          var codates = co.map(function (item) {
            return item["codate"];
          });
          var cogeos = co.map(function (item) {
            return item["cogeo"];
          });
          var CO2message = {
            timestamp: codates,
            measurement: covals,
            geolocation: cogeos,
          };
          setCo2Eventdb(CO2message);
          setCo2Loadingdb(false);
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .get("http://localhost:5000/ah/")
        .then((response) => {
          var ah = response.data;
          var ahvals = ah.map(function (item) {
            return item["ahval"];
          });
          var ahdates = ah.map(function (item) {
            return item["ahdate"];
          });
          var ahgeos = ah.map(function (item) {
            return item["ahgeo"];
          });
          var AHmessage = {
            timestamp: ahdates,
            measurement: ahvals,
            geolocation: ahgeos,
          };

          setAirHumidityEventdb(AHmessage);
          setAirHumidityLoadingdb(false);
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .get("http://localhost:5000/temp/")
        .then((response) => {
          var temp = response.data;
          var tempvals = temp.map(function (item) {
            return item["tempval"];
          });
          var tempdates = temp.map(function (item) {
            return item["tempdate"];
          });
          var tempgeos = temp.map(function (item) {
            return item["tempgeo"];
          });
          var TEMPmessage = {
            timestamp: tempdates,
            measurement: tempvals,
            geolocation: tempgeos,
          };
          setTemperatureEventdb(TEMPmessage);
          setTemperatureLoadingdb(false);
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .get("http://localhost:5000/no/")
        .then((response) => {
          var no = response.data;
          var novals = no.map(function (item) {
            return item["noval"];
          });
          var nodates = no.map(function (item) {
            return item["nodate"];
          });
          var nogeos = no.map(function (item) {
            return item["nogeo"];
          });
          var NOmessage = {
            timestamp: nodates,
            measurement: novals,
            geolocation: nogeos,
          };
          setNitrogenDioxideEventdb(NOmessage);
          setNitrogenDioxideLoadingdb(false);
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .get("http://localhost:5000/pm2/")
        .then((response) => {
          var pm2 = response.data;
          var pm2vals = pm2.map(function (item) {
            return item["pm2val"];
          });
          var pm2dates = pm2.map(function (item) {
            return item["pm2date"];
          });
          var pm2geos = pm2.map(function (item) {
            return item["pm2geo"];
          });
          var PM2message = {
            timestamp: pm2dates,
            measurement: pm2vals,
            geolocation: pm2geos,
          };
          setParticularMatter2Eventdb(PM2message);
          setParticularMatter2Loadingdb(false);
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .get("http://localhost:5000/pm10/")
        .then((response) => {
          var pm10 = response.data;
          var pm10vals = pm10.map(function (item) {
            return item["pm10val"];
          });
          var pm10dates = pm10.map(function (item) {
            return item["pm10date"];
          });
          var pm10geos = pm10.map(function (item) {
            return item["pm10geo"];
          });
          var PM10message = {
            timestamp: pm10dates,
            measurement: pm10vals,
            geolocation: pm10geos,
          };
          setParticularMatter10Eventdb(PM10message);
          setParticularMatter10Loadingdb(false);
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .get("http://localhost:5000/so/")
        .then((response) => {
          var so = response.data;
          var sovals = so.map(function (item) {
            return item["soval"];
          });
          var sodates = so.map(function (item) {
            return item["sodate"];
          });
          var sogeos = so.map(function (item) {
            return item["sogeo"];
          });
          var SOmessage = {
            timestamp: sodates,
            measurement: sovals,
            geolocation: sogeos,
          };
          setSulfurDioxideEventdb(SOmessage);
          setSulfurDioxideLoadingdb(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log("No database connection possible", error);
      setErrordb(true);
    }

    try {
      const web3 = new Web3("ws://81.169.221.233:8545");
      const co2Contract = new web3.eth.Contract(
        CO2Build.abi,
        "0xBc6Ee8d2e83e2407A24c6daFCccE72fdc16b9416"
      );
      const humidityContract = new web3.eth.Contract(
        HumidityBuild.abi,
        "0x8dE8A9677E4890f36bE037D0BaB5a6c5e614Fd6F"
      );
      const temperatureContract = new web3.eth.Contract(
        TemperatureBuild.abi,
        "0x58d754AcdA19075097b40F926c22A870Aaa8e4Ee"
      );
      co2Contract
        .getPastEvents("allEvents", {
          fromBlock: 0,
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
          fromBlock: 0,
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
          fromBlock: 0,
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
        co2Loading: co2Loading, co2Events: co2Events, co2EventsChart: co2EventsChart, co2EventsTable: co2EventsTable,
        humidityLoading: humidityLoading, humidityEvents: humidityEvents, humidityEventsChart: humidityEventsChart, humidityEventsTable: humidityEventsTable,
        temperatureLoading: temperatureLoading, temperatureEvents: temperatureEvents, temperatureEventsChart: temperatureEventsChart, temperatureEventsTable: temperatureEventsTable,
        
        nitrogendioxideLoadingdb: nitrogendioxideLoadingdb, nitrogendioxideEventdb: nitrogendioxideEventdb, nitrogendioxideEventsChart: nitrogendioxideEventsChart, nitrogendioxideEventsTable: nitrogendioxideEventsTable,
        particularmatter2Loadingdb: particularmatter2Loadingdb, particularmatter2Eventdb: particularmatter2Eventdb, particularmatter2EventsChart: particularmatter2EventsChart, particularmatter2EventsTable: particularmatter2EventsTable,
        particularmatter10Loadingdb: particularmatter10Loadingdb, particularmatter10Eventdb: particularmatter10Eventdb, particularmatter10EventsChart: particularmatter10EventsChart, particularmatter10EventsTable: particularmatter10EventsTable,
        sulfurdioxideLoadingdb: sulfurdioxideLoadingdb, sulfurdioxideEventdb: sulfurdioxideEventdb, sulfurdioxideEventsChart: sulfurdioxideEventsChart, sulfurdioxideEventsTable: sulfurdioxideEventsTable,

        co2Eventdb, airhumidityEventdb, temperatureEventdb, nitrogendioxideEventdb, 
        particularmatter2Eventdb, particularmatter10Eventdb, sulfurdioxideEventdb,
        errordb,
        co2Loadingdb: co2Loadingdb, airhumidityLoadingdb: airhumidityLoadingdb, temperatureLoadingdb: temperatureLoadingdb,
        nitrogendioxideLoadingdb: nitrogendioxideLoadingdb, particularmatter2Loadingdb: particularmatter2Loadingdb,
        particularmatter10Loadingdb: particularmatter10Loadingdb, sulfurdioxideLoadingdb: sulfurdioxideLoadingdb,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
