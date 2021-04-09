// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0;

/**
 * @title CO2_Alarming
 * @dev Submit measured CO2 value (in ppm), a timestamp, a geolocation and trigger a message for the frontend
 */

contract CO2_Alarming{

    uint16 measurement; // latest measurement
    string timestamp; // latest timestamp
    string geolocation; // latest geolocation

    // limits and alarm messages are set here

    uint16 higher_limit = 1400;
    string higher_limit_message = "Higher limit exceeded!";

    uint16 lower_limit = 1000;
    string lower_limit_message = "Lower limit exceeded!";

    string no_limit_message = "No limit surpassed.";

    // danger limit changes according to the surpassed limits

    uint8 danger_level = 0;

    event StatusMessage(
        string timestamp,
        uint16 indexed measurement,
        string geolocation,
        uint8 indexed critical,
        string alarmMessage
    );

    /**
     * @dev store CO2 measurement to the blockchain, trigger a message
     * @param _timestamp a timestamp provided as a string by the IoT device
     * @param _measurement the measrued C02 value in ppm
     * @param _geolocation a geolocation provided as a string by the IoT device
     */
    function submit(string memory _timestamp, uint16 _measurement, string memory _geolocation) public {
        measurement = _measurement;
        timestamp = _timestamp;
        geolocation = _geolocation;
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