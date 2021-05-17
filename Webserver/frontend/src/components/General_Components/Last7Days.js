import React, { useCallback, useEffect, useState } from "react";
import { useGlobalContext } from "../../context";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Image from "react-bootstrap/Image";
import greenCertificate from "../../assets/images/greencert.png";
import redCertificate from "../../assets/images/redcert.png";

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
    "Air Humidity",
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
      [airhumidityEventdb, 95, "Air Humidity", setHumiditytExceeded],
      [temperatureEventdb, 30, "Temperature", setTemperatureExceeded],
      [nitrogendioxideEventdb, 200, "NO2", setNitrogenExceeded],
      [particularmatter2Eventdb, 25, "PM 2,5", setPm2Exceeded],
      [particularmatter10Eventdb, 50, "PM 10", setPm10Exceeded],
      [sulfurdioxideEventdb, 20, "SO2", setSulfurdioxideExceeded],
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
          <Image
            src={greenCertificate}
            alt="green certificate"
            width={170}
            height={160}
          />
          <div className="text-center">
            The emissions are <b>IN COMPLIANCE</b> with government emission
            limits in the last 7 days.
          </div>
          <br></br>
          <h5>The air quality is great!</h5>
        </Container>
      ) : (
        <Container>
          <Image
            src={redCertificate}
            alt="red certificate"
            width={170}
            height={160}
          />
          <div className="text-center">
            The emissions are <b>NOT IN COMPLIANCE</b> with government emission
            limits in the last 7 days.
          </div>
          <br></br>
          <p>The following emissions were exceeded the last 7 days:</p>
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
              return <h5 key={item[0]}>{item[0]} </h5>;
            })}
        </Container>
      )}
    </Container>
  );
}

export default Last7Days;
