import React, { useState, useContext, useEffect } from "react";
import axios from 'axios';

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

  const [errordb, setErrordb] = useState(false);
  const [co2Eventdb, setCo2Eventdb] = useState({
    timestamp: "loading...",
    measurement: "loading...",
    geolocation: "loading...",
  });
  const [airhumidityEventdb, setAirHumidityEventdb] = useState({
    timestamp: "loading...",
    measurement: "loading...",
    geolocation: "loading...",
  });
  const [temperatureEventdb, setTemperatureEventdb] = useState({
    timestamp: "loading...",
    measurement: "loading...",
    geolocation: "loading...",
  });
  const [nitrogendioxideEventdb, setNitrogenDioxideEventdb] = useState({
    timestamp: "loading...",
    measurement: "loading...",
    geolocation: "loading...",
  });
  const [particularmatter2Eventdb, setParticularMatter2Eventdb] = useState({
    timestamp: "loading...",
    measurement: "loading...",
    geolocation: "loading...",
  });
  const [particularmatter10Eventdb, setParticularMatter10Eventdb] = useState({
    timestamp: "loading...",
    measurement: "loading...",
    geolocation: "loading...",
  });
  const [sulfurdioxideEventdb, setSulfurDioxideEventdb] = useState({
    timestamp: "loading...",
    measurement: "loading...",
    geolocation: "loading...",
  });

  const [co2Eventdb7, setCo2Eventdb7] = useState({
    timestamp: "loading...",
    measurement: "loading...",
  });
  const [airhumidityEventdb7, setAirHumidityEventdb7] = useState({
    measurement: "loading...",
  });
  const [temperatureEventdb7, setTemperatureEventdb7] = useState({
    measurement: "loading...",
  });
  const [nitrogendioxideEventdb7, setNitrogenDioxideEventdb7] = useState({
    measurement: "loading...",
  });
  const [particularmatter2Eventdb7, setParticularMatter2Eventdb7] = useState({
    measurement: "loading...",
  });
  const [particularmatter10Eventdb7, setParticularMatter10Eventdb7] = useState({
    measurement: "loading...",
  });
  const [sulfurdioxideEventdb7, setSulfurDioxideEventdb7] = useState({
    measurement: "loading...",
  });


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
    try{    
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
          timestamp: new Date(new Date(codates[codates.length - 1]).getTime() + 3600000).toUTCString(),
          measurement: covals[covals.length - 1],
          geolocation: (<a href={"https://maps.google.com/?q=" + cogeos[cogeos.length - 1]} target="_blank" rel="noopener noreferrer" > {cogeos[cogeos.length - 1]} </a> ),
        };
        
        var i=0;
        var codatesStr="";
        var covalsStr="";
        //604800000 = 1 week
        // replace v with time range like 1 week (7 days)
        var v = new Date().getTime() - new Date('March 21, 2021 01:00:00').getTime();
          for(i=0; i < codates.length-1; i++){ 
            if(new Date(codates[i]).getTime() > new Date().getTime()-v){
            codatesStr += new Date(codates[i]).toString() + "|"
            covalsStr += covals[i] +"|"
            }
          }
        var CO2message7 = {
          timestamp: codatesStr,
          measurement: covalsStr,
        }
        setCo2Eventdb(CO2message);
        setCo2Eventdb7(CO2message7);
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
          timestamp: new Date(new Date(ahdates[ahdates.length - 1]).getTime() + 3600000).toUTCString(),
          measurement: ahvals[ahvals.length - 1],
          geolocation: (<a href={"https://maps.google.com/?q=" + ahgeos[ahgeos.length - 1]} target="_blank" rel="noopener noreferrer" > {ahgeos[ahgeos.length - 1]} </a> ),
        };

        var i=0;
        var ahvalsStr="";
          for(i=0; i < ahdates.length-1; i++){ 
            if(new Date(ahdates[i]).getTime() > new Date().getTime()-604800000){
            ahvalsStr += ahvals[i] +"|"
              }
          }
        var AHmessage7 = {
          measurement: ahvalsStr,
        }
        setAirHumidityEventdb(AHmessage);
        setAirHumidityEventdb7(AHmessage7);
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
          timestamp: new Date(new Date(tempdates[tempdates.length - 1]).getTime() + 3600000).toUTCString(),
          measurement: tempvals[tempvals.length - 1],
          geolocation: (<a href={"https://maps.google.com/?q=" + tempgeos[tempgeos.length - 1]} target="_blank" rel="noopener noreferrer">{tempgeos[tempgeos.length - 1]}</a>),
        };

        var i=0;
        var tempvalsStr="";
          for(i=0; i < tempdates.length-1; i++){ 
            if(new Date(tempdates[i]).getTime() > new Date().getTime()-604800000){
              tempvalsStr += tempvals[i] +"|"
              }
          }
        var TEMPmessage7 = {
          measurement: tempvalsStr,
        }
        setTemperatureEventdb(TEMPmessage);
        setTemperatureEventdb7(TEMPmessage7);
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
          timestamp: new Date(new Date(nodates[nodates.length - 1]).getTime() + 3600000).toUTCString(),
          measurement: novals[novals.length - 1],
          geolocation: (<a href={"https://maps.google.com/?q=" + nogeos[nogeos.length - 1]} target="_blank" rel="noopener noreferrer">{nogeos[nogeos.length - 1]}</a>),
        };

        var i=0;
        var novalsStr="";
          for(i=0; i < nodates.length-1; i++){ 
            if(new Date(nodates[i]).getTime() > new Date().getTime()-604800000){
              novalsStr += novals[i] +"|"
              }
          }
        var NOmessage7 = {
          measurement: novalsStr,
        }
        setNitrogenDioxideEventdb(NOmessage);
        setNitrogenDioxideEventdb7(NOmessage7);
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
          timestamp: new Date(new Date(pm2dates[pm2dates.length - 1]).getTime() + 3600000).toUTCString(),
          measurement: pm2vals[pm2vals.length - 1],
          geolocation: (<a href={"https://maps.google.com/?q=" + pm2geos[pm2geos.length - 1]} target="_blank" rel="noopener noreferrer">{pm2geos[pm2geos.length - 1]}</a>),
        };

        var i=0;
        var pm2valsStr="";
          for(i=0; i < pm2dates.length-1; i++){ 
            if(new Date(pm2dates[i]).getTime() > new Date().getTime()-604800000){
              pm2valsStr += pm2vals[i] +"|"
              }
          }
        var PM2message7 = {
          measurement: pm2valsStr,
        }
        setParticularMatter2Eventdb(PM2message);
        setParticularMatter2Eventdb7(PM2message7);
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
          timestamp: new Date(new Date(pm10dates[pm10dates.length - 1]).getTime() + 3600000).toUTCString(),
          measurement: pm10vals[pm10vals.length - 1],
          geolocation: (<a href={"https://maps.google.com/?q=" + pm10geos[pm10geos.length - 1]} target="_blank" rel="noopener noreferrer">{pm10geos[pm10geos.length - 1]}</a>),
        };

        var i=0;
        var pm10valsStr="";
          for(i=0; i < pm10dates.length-1; i++){ 
            if(new Date(pm10dates[i]).getTime() > new Date().getTime()-604800000){
              pm10valsStr += pm10vals[i] +"|"
              }
          }
        var PM10message7 = {
          measurement: pm10valsStr,
        }
        setParticularMatter10Eventdb(PM10message);
        setParticularMatter10Eventdb7(PM10message7);
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
          timestamp: new Date(new Date(sodates[sodates.length - 1]).getTime() + 3600000).toUTCString(),
          measurement: sovals[sovals.length - 1],
          geolocation: (<a href={"https://maps.google.com/?q=" + sogeos[sogeos.length - 1]} target="_blank" rel="noopener noreferrer">{sogeos[sogeos.length - 1]}</a>),
        };

        var i=0;
        var sovalsStr="";
          for(i=0; i < sodates.length-1; i++){ 
            if(new Date(sodates[i]).getTime() > new Date().getTime()-604800000){
              sovalsStr += sovals[i] +"|"
              }
          }
        var SOmessage7 = {
          measurement: sovalsStr,
        }
        setSulfurDioxideEventdb(SOmessage);
        setSulfurDioxideEventdb7(SOmessage7);
      })
      .catch((error) => {
        console.log(error);
      });


      
    } catch (error) {
      console.log("No database connection possible", error);
      setErrordb(true);
    }


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
        co2Eventdb, airhumidityEventdb, temperatureEventdb, nitrogendioxideEventdb, particularmatter2Eventdb, particularmatter10Eventdb, sulfurdioxideEventdb, 
        co2Eventdb7, airhumidityEventdb7, temperatureEventdb7, nitrogendioxideEventdb7, particularmatter2Eventdb7, particularmatter10Eventdb7, sulfurdioxideEventdb7, 
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
