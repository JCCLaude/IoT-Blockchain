// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0;

/**
 * @title Temperature_Alarming
 * @dev Submit measured temperature, a timestamp, a geolocation and trigger a message for the frontend
 */

contract Temperature_Alarming {

    int8 measurement; // Measurement coming from an IoT Sensor
    string timestamp; // latest timestamp
    string geolocation; // latest geolocation

    // limits and alarm messages are set here

    int8 higher_limit = 30;
    string higher_limit_message = "Higher Temperature limit exceeded!";

    int8 lower_limit = 28;
    string lower_limit_message = "Lower Temperature limit exceeded!";

    string no_limit_message = "No Temperature limit exceeded.";

    // danger limit changes according to the surpassed limits

    uint8 danger_level = 0;

    event StatusMessage(
        string timestamp,
        int8 indexed measurement,
        string geolocation,
        uint8 indexed critical,
        string alarmMessage
    );

    /**
     * @dev safe the current measurement to the blockchain and trigger an alarm when needed
     * @param _timestamp a timestamp provided as a string by the IoT device
     * @param _measurement the current measurement in °C
     * @param _geolocation a geolocation provided as a string by the IoT device
     */
    function submit(string memory _timestamp, int8 _measurement, string memory _geolocation) public{
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