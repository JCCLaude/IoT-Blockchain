import React, { useCallback, useEffect, useState } from "react";
import { useGlobalContext } from "../../context";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Image from "react-bootstrap/Image";
import greenCertificate from "../../assets/images/greencert.png";
import redThumbDown from "../../assets/images/redthumbdown.png";

function Last7Days() {
  const {
    co2Eventdb,
    airhumidityEventdb,
    temperatureEventdb,
    nitrogendioxideEventdb,
    particularmatter2Eventdb,
    particularmatter10Eventdb,
    sulfurdioxideEventdb,
  } = useGlobalContext();

  const [loading, setLoading] = useState(true);
  const [co2Exceeded, setCo2Exceeded] = useState(["CO2", false]);
  const [humidityExceeded, setHumiditytExceeded] = useState([
    "Humidity",
    false,
  ]);
  const [temperatureExceeded, setTemperatureExceeded] = useState([
    "Temperature",
    false,
  ]);
  const [nitrogenExceeded, setNitrogenExceeded] = useState(["NO2", false]);
  const [pm2Exceeded, setPm2Exceeded] = useState(["PM 2,5", false]);
  const [pm10Exceeded, setPm10Exceeded] = useState(["PM 10", false]);
  const [sulfurdioxideExceeded, setSulfurdioxideExceeded] = useState([
    "SO2",
    false,
  ]);

  const CheckValuesByTime = useCallback(
    (dbEvents, limit, name, setCertificate) => {
      // 604800000 = 1 week = 7 days
      // 259200000 = 3 days
      const aWeekAgo = Date.now() - 604800000;
      if (typeof dbEvents !== "undefined") {
        const weekIndex = dbEvents.timestamp.findIndex((item) => {
          if (new Date(item).getTime() >= aWeekAgo) {
            return true;
          }
          return false;
        });
        if (weekIndex !== -1) {
          for (
            let index = weekIndex;
            index < dbEvents.measurement.length;
            index++
          ) {
            if (dbEvents.measurement[index] >= limit) {
              console.log("exceeded", name, dbEvents.measurement[index]);
              setCertificate([name, true]);
            }
          }
        }
      }
    },
    []
  );

  const checkAllValues = useCallback(
    (ArrayToCheck) => {
      ArrayToCheck.map((DataSet) => CheckValuesByTime(...DataSet));
      setLoading(false);
    },
    [CheckValuesByTime]
  );

  useEffect(() => {
    checkAllValues([
      [co2Eventdb, 2000, "CO2", setCo2Exceeded],
      [airhumidityEventdb, 95, "Airhumidity", setHumiditytExceeded],
      [temperatureEventdb, 30, "Temperature", setTemperatureExceeded],
      [nitrogendioxideEventdb, 12345, "NO2", setNitrogenExceeded],
      [particularmatter2Eventdb, 12345, "PM 2,5", setPm2Exceeded],
      [particularmatter10Eventdb, 12345, "PM 10", setPm10Exceeded],
      [sulfurdioxideEventdb, 12345, "SO2", setSulfurdioxideExceeded],
    ]);
  }, [
    co2Eventdb,
    airhumidityEventdb,
    temperatureEventdb,
    nitrogendioxideEventdb,
    particularmatter2Eventdb,
    particularmatter10Eventdb,
    sulfurdioxideEventdb,
    checkAllValues,
  ]);

  return (
    <Container className="text-center">
      {loading ? (
        <Spinner animation="grow" />
      ) : [
          co2Exceeded,
          humidityExceeded,
          temperatureExceeded,
          nitrogenExceeded,
          pm2Exceeded,
          pm10Exceeded,
          sulfurdioxideExceeded,
        ].filter((item) => item[1] !== false).length === 0 ? (
        <Container>
          <Image src={greenCertificate} alt="green certificate" />
          <h1>no worries</h1>
        </Container>
      ) : (
        <Container>
          <Image src={redThumbDown} alt="red thumb down" />
          <p>exceeded values:</p>
          {[
            co2Exceeded,
            humidityExceeded,
            temperatureExceeded,
            nitrogenExceeded,
            pm2Exceeded,
            pm10Exceeded,
            sulfurdioxideExceeded,
          ]
            .filter((item) => item[1] !== false)
            .map((item) => {
              return <h1>{item[0]} </h1>;
            })}
        </Container>
      )}
    </Container>
  );
}

export default Last7Days;
