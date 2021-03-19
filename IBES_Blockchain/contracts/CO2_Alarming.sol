// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0;

/**
 * @title CO2_Alarming
 * @dev Submit measured CO2 value (in ppm) and trigger a message for the frontend
 */

contract CO2_Alarming{

    uint16 measurement;
    uint16 american_limit = 1400;
    uint16 european_limit = 1000;

    event StatusMessage(
        uint16 indexed measurement,
        string indexed alarmMessage
    );

    /**
     * @dev store CO2 measurement to the blockchain
     * @param _measurement CO2 value measured in ppm
     */
    function submit(uint16 _measurement) public {
        measurement = _measurement;
        if (measurement >= american_limit){
            emit StatusMessage(
                measurement, 
                "US + EU limits surpassed!"
            );
        }
        else if (measurement >= european_limit){
            emit StatusMessage(
                measurement, 
                "EU limit surpassed!"
            );
        }
        else{
            emit StatusMessage(
                measurement, 
                "No limit surpassed"
            );
        }
        
    }

}