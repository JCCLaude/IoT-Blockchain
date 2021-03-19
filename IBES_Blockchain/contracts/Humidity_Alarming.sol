// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0;

/**
 * @title Humidity_Alarming
 * @dev Submit measured humidity and trigger a message for the frontend
 */

 contract Humidity_Alarming{

    uint8 measurement; // humidity in percent measured by an IoT device
    uint8 american_limit = 90; // example limit for environmental regulation
    uint8 european_limit = 87; // different example limit

    event StatusMessage(
        uint8 indexed currentValue,
        string indexed alarmMessage
    );

    /**
     * @dev function to store humidity measurement to the blockchain
     * @param _measurement the measured humidity in percent (has to be between 0 and 100)
     */
    function submit(uint8 _measurement) public {
        measurement = _measurement;
        require (measurement <= 100); 
        if( measurement >= american_limit){
            emit StatusMessage(
                measurement,
                "US + EU limit surpassed!"
            );
        } 
        else if (measurement >= european_limit){
            emit StatusMessage(
                measurement, 
                "EU limit surpassed!"
            );
        }
        else {
            emit StatusMessage(
                measurement, 
                "No limit surpassed"
            );
        }
    }

 }