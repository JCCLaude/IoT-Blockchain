import React, { useState, useContext, useEffect } from "react";
import axios from 'axios';

const Web3 = require("web3");
const CO2Build = require("./assets/ethereumBuilds/CO2_Alarming.json");
const TemperatureBuild = require("./assets/ethereumBuilds/Temperature_Alarming.json");
const HumidityBuild = require("./assets/ethereumBuilds/Humidity_Alarming.json");

const colimitred = 1000;

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [error, setError] = useState(false);
  const [co2Event, setCo2Event] = useState({
    timestamp: "loading...",
    measurement: "loading...",
    geolocation: "loading...",
    critical: "0",
  });
  const [humidityEvent, setHumidityEvent] = useState({
    timestamp: "loading...",
    measurement: "loading...",
    geolocation: "loading...",
    critical: "0",
  });
  const [temperatureEvent, setTemperatureEvent] = useState({
    timestamp: "loading...",
    measurement: "loading...",
    geolocation: "loading...",
    critical: "0",
  });
  
  const [errordb, setErrordb] = useState(false);

  const [co2Eventdb, setCo2Eventdb] = useState({
    timestamp: "loading...",
    measurement: "loading...",
    geolocation: "loading...",
    critical: "0",
  });
  const [airhumidityEventdb, setAirHumidityEventdb] = useState({
    timestamp: "loading...",
    measurement: "loading...",
    geolocation: "loading...",
    critical: "0",
  });
  const [temperatureEventdb, setTemperatureEventdb] = useState({
    timestamp: "loading...",
    measurement: "loading...",
    geolocation: "loading...",
    critical: "0",
  });
  const [nitrogendioxideEventdb, setNitrogendioxideEventdb] = useState({
    timestamp: "loading...",
    measurement: "loading...",
    geolocation: "loading...",
    critical: "loading...",
  });
  const [particularmatter2Eventdb, setParticularmatter2Eventdb] = useState({
    timestamp: "loading...",
    measurement: "loading...",
    geolocation: "loading...",
    critical: "loading...",
  });
  const [particularmatter10Eventdb, setParticularmatter10Eventdb] = useState({
    timestamp: "loading...",
    measurement: "loading...",
    geolocation: "loading...",
    critical: "loading...",
  });
  const [sulfurdioxideEventdb, setSulfurdioxideEventdb] = useState({
    timestamp: "loading...",
    measurement: "loading...",
    geolocation: "loading...",
    critical: "loading...",
  });

  const [co2Eventdb7, setCo2Eventdb7] = useState({
    timestamp: "loading...",
    measurement: "loading...",
    geolocation: "loading...",
    critical: "0",
  });

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
        var test;
        var j = 0;
        for (j = 0; j < covals.length - 1; j++) {
          if (parseInt(covals[j]) > colimitred) {
            console.log("danger!! " + covals[j]);
          }
        }
        var CO2message = {
          timestamp: new Date(codates[codates.length - 1]).toString(),
          measurement: covals[covals.length - 1] + " ppm",
          geolocation: (<a href={"https://maps.google.com/?q=" + cogeos[cogeos.length - 1]} target="_blank" rel="noopener noreferrer" > {cogeos[cogeos.length - 1]} </a> ),
        };
        var i=0;
        var codatesStr="";
        var covalsStr="";
          for(i=0; i < codates.length-1; i++){
            codatesStr += new Date(codates[i]).toString() + "|"
            covalsStr += covals[i] + " ppm" +"|"
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
          timestamp: new Date(ahdates[ahdates.length - 1]).toString(),
          measurement: ahvals[ahvals.length - 1] + " %",
          geolocation: (<a href={"https://maps.google.com/?q=" + ahgeos[ahgeos.length - 1]} target="_blank" rel="noopener noreferrer" > {ahgeos[ahgeos.length - 1]} </a> ),
        };
        setAirHumidityEventdb(AHmessage);
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
          timestamp: new Date(tempdates[tempdates.length - 1]).toString(),
          measurement: tempvals[tempvals.length - 1] + " °C",
          geolocation: (<a href={"https://maps.google.com/?q=" + tempgeos[tempgeos.length - 1]} target="_blank" rel="noopener noreferrer">{tempgeos[tempgeos.length - 1]}</a>),};
        setTemperatureEventdb(TEMPmessage);
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
          const message = events[events.length - 1].returnValues;
          setCo2Event(message);
        });
      humidityContract
        .getPastEvents("allEvents", {
          fromBlock: 30,
          toBlock: "latest",
        })
        .then((events) => {
          const message = events[events.length - 1].returnValues;
          setHumidityEvent(message);
        });
      temperatureContract
        .getPastEvents("allEvents", {
          fromBlock: 30,
          toBlock: "latest",
        })
        .then((events) => {
          const message = events[events.length - 1].returnValues;
          setTemperatureEvent(message);
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
      value={{ co2Event, humidityEvent, temperatureEvent, error, co2Eventdb, airhumidityEventdb, temperatureEventdb, errordb, nitrogendioxideEventdb, particularmatter2Eventdb, particularmatter10Eventdb, sulfurdioxideEventdb, co2Eventdb7 }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
