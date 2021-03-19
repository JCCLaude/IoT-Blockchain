// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0;

/**
 * @title Temperature_Alarming
 * @dev Submit measured temperature and trigger a message for the frontend
 */

contract Temperature_Alarming {

    int8 measurement; // Measurement coming from an IoT Sensor
    int8 american_limit = 30; // example limit for environmental regulations
    int8 european_limit = 28; // example limit for different regulations

    event StatusMessage(
        int8 indexed currentValue,
        string indexed alarmMessage
    );

    /**
     * @dev safe the current measurement to the blockchain and trigger an alarm when needed
     * @param _measurement the current measurement
     */
    function submit(int8 _measurement) public{
        measurement = _measurement;
        if(measurement >= american_limit){
            emit StatusMessage(
                measurement, 
                "US + EU limit surpassed!"
            );
        }
        else if(measurement >= european_limit){
            emit StatusMessage(
                measurement, 
                "EU limit surpassed!"
            );
        } 
        else {
            emit StatusMessage(
                measurement, 
                "No limits surpassed"
            );
        }
            
    }

}