// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0;

/**
 * @title Temperature_Alarming
 * @dev Submit measured temperature and trigger a message for the frontend
 */

contract Temperature_Alarming {

    int8 measurement; // Measurement coming from an IoT Sensor

    // limits and alarm messages are set here

    int8 higher_limit = 30;
    string higher_limit_message = "Higher Temperature limit exceeded!";

    int8 lower_limit = 28;
    string lower_limit_message = "Lower Temperature limit exceeded!";

    string no_limit_message = "No Temperature limit exceeded.";

    // danger limit changes according to the surpassed limits

    uint8 danger_level = 0;

    event StatusMessage(
        int8 indexed measurement,
        uint8 indexed critical,
        string alarmMessage
    );

    /**
     * @dev safe the current measurement to the blockchain and trigger an alarm when needed
     * @param _measurement the current measurement
     */
    function submit(int8 _measurement) public{
        measurement = _measurement;
        require (measurement <= 100); 
        if (measurement >= higher_limit){
            danger_level = 2;
            emit StatusMessage(
                measurement, 
                danger_level,
                higher_limit_message
            );
        }
        else if (measurement >= lower_limit){
            danger_level = 1;
            emit StatusMessage(                
                measurement, 
                danger_level,
                lower_limit_message
            );
        }
        else{
            danger_level = 0;
            emit StatusMessage(                
                measurement, 
                danger_level,
                no_limit_message
            );
        }            
    }

}