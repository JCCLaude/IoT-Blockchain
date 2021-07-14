// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0;

/**
 * @title Humidity_Alarming
 * @dev Submit measured humidity in percent, a timestamp and a geolocation and trigger a message to the frontend
 */

contract Humidity_Alarming{

    uint8 measurement; // humidity in percent measured by an IoT device
    string timestamp; // latest timestamp
    string geolocation; // latest geolocation
    
    // limits and alarm messages are set here

    uint8 higher_limit = 90;
    string higher_limit_message = "Higher Humidity limit exceeded!";

    uint8 lower_limit = 87;
    string lower_limit_message = "Lower Humidity limit exceeded!";

    string no_limit_message = "No Humidity limit surpassed.";

    // danger limit changes according to the surpassed limits

    uint8 danger_level = 0;

    event StatusMessage(
        string timestamp,
        uint8 indexed measurement,
        string geolocation,
        uint8 indexed critical,
        string alarmMessage
    );

    /**
     * @dev function to store humidity measurement to the blockchain
     * @param _timestamp a timestamp provided as a string by the IoT device
     * @param _measurement the current measurement of humidity in percent (between 0 and 100)
     * @param _geolocation a geolocation provided as a string by the IoT device
     */
    function submit(string memory _timestamp, uint8 _measurement, string memory _geolocation) public {
        measurement = _measurement;
        timestamp = _timestamp;
        geolocation = _geolocation;
        require (measurement <= 100); 
        if (measurement >= higher_limit){
            danger_level = 2;
            emit StatusMessage(
                timestamp,
                measurement, 
                geolocation,
                danger_level,
                higher_limit_message
            );
        }
        else if (measurement >= lower_limit){
            danger_level = 1;
            emit StatusMessage(                
                timestamp,
                measurement, 
                geolocation,
                danger_level,
                lower_limit_message
            );
        }
        else{
            danger_level = 0;
            emit StatusMessage(                
                timestamp,
                measurement, 
                geolocation,
                danger_level,
                no_limit_message
            );
        }
    }

 }